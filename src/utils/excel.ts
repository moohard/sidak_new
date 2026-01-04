import ExcelJS from "exceljs";

type ExportOptions = {
  data: Record<string, unknown>[];
  fileName: string;
  sheetName: string;
  columns?: string[];
};

const normalizeCellValue = (value: unknown) => {
  if (value === null || value === undefined) return "";
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "object") {
    const withText = value as { text?: string };
    if (typeof withText.text === "string") return withText.text;
    const withRichText = value as { richText?: Array<{ text?: string }> };
    if (Array.isArray(withRichText.richText)) {
      return withRichText.richText.map((item) => item.text || "").join("");
    }
  }
  return value;
};

const downloadXlsx = (buffer: ArrayBuffer | Uint8Array, fileName: string) => {
  const blob = new Blob([buffer as BlobPart], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

export const exportJsonToXlsx = async ({
  data,
  fileName,
  sheetName,
  columns,
}: ExportOptions) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);
  const headers = columns ?? (data[0] ? Object.keys(data[0]) : []);

  worksheet.columns = headers.map((header) => ({
    header,
    key: header,
  }));

  if (data.length > 0) {
    worksheet.addRows(data);
  }

  if (headers.length > 0) {
    worksheet.getRow(1).font = { bold: true };
  }

  const buffer = await workbook.xlsx.writeBuffer();
  downloadXlsx(buffer, fileName);
};

export const parseXlsxFile = async (file: File) => {
  const workbook = new ExcelJS.Workbook();
  const arrayBuffer = await file.arrayBuffer();
  await workbook.xlsx.load(arrayBuffer);

  const worksheet = workbook.worksheets[0];
  if (!worksheet) return [];

  const headerRow = worksheet.getRow(1);
  const headerValues = (headerRow.values as unknown[]).slice(1);
  const headers = headerValues.map((value, index) => {
    const normalized = normalizeCellValue(value);
    if (typeof normalized === "string" && normalized.trim() !== "") {
      return normalized.trim();
    }
    return `column_${index + 1}`;
  });

  const data: Record<string, unknown>[] = [];
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    const rowValues = row.values as unknown[];
    const item: Record<string, unknown> = {};
    headers.forEach((header, index) => {
      item[header] = normalizeCellValue(rowValues[index + 1]);
    });

    const hasValue = Object.values(item).some(
      (value) => value !== "" && value !== null && value !== undefined,
    );
    if (hasValue) {
      data.push(item);
    }
  });

  return data;
};
