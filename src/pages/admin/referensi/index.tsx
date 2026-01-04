import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import DataTable from "react-data-table-component";
import Breadcrumbs from "../../../../CommonElements/Breadcrumbs";
import { REFERENCE_CONFIG } from "@/utils/referenceConfig";
import { getGenericList, createGeneric, updateGeneric, deleteGeneric } from "../../../api/genericService";
import { toast } from "react-toastify";
import { Plus, Edit, Trash, Download, Upload } from "react-feather";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { exportJsonToXlsx, parseXlsxFile } from "@/utils/excel";

const ReferenceAdmin = () => {
  const [selectedKey, setSelectedKey] = useState("agama");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm();
  const currentConfig = REFERENCE_CONFIG[selectedKey];

  const fetchData = async (key: string) => {
    setLoading(true);
    try {
      const res = await getGenericList(REFERENCE_CONFIG[key].endpoint);
      setData(res.data.data || []);
    } catch (error) {
      toast.error(`Gagal memuat data ${REFERENCE_CONFIG[key].title}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(selectedKey);
  }, [selectedKey]);

  const handleExport = async () => {
    try {
      await exportJsonToXlsx({
        data,
        fileName: `Referensi_${currentConfig.title}.xlsx`,
        sheetName: currentConfig.title,
      });
      toast.success("File Excel berhasil diunduh.");
    } catch (error) {
      toast.error("Gagal mengekspor data.");
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".xlsx")) {
      toast.error("Format file harus .xlsx");
      e.target.value = "";
      return;
    }

    try {
      const importedData = await parseXlsxFile(file);
      if (importedData.length === 0) {
        toast.error("File Excel kosong atau tidak valid.");
        e.target.value = "";
        return;
      }
      toast.info(`Mengimpor ${importedData.length} data...`);
      for (const item of importedData) {
        await createGeneric(currentConfig.endpoint, item);
      }
      toast.success("Data berhasil diimpor.");
      fetchData(selectedKey);
    } catch (error) {
      toast.error("Gagal mengimpor data.");
    } finally {
      e.target.value = "";
    }
  };

  const toggleModal = () => {
    setModal(!modal);
    if (modal) {
      setEditId(null);
      reset();
    }
  };

  const onEdit = (row: any) => {
    setEditId(row.id);
    currentConfig.columns.forEach((col: string) => {
      setValue(col, row[col]);
    });
    setModal(true);
  };

  const onDelete = (id: number, name: string) => {
    Swal.fire({
      title: "Hapus Data?",
      text: `Anda akan menghapus: ${name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteGeneric(currentConfig.endpoint, id);
          toast.success("Data berhasil dihapus.");
          fetchData(selectedKey);
        } catch (error) {
          toast.error("Gagal menghapus data.");
        }
      }
    });
  };

  const onSubmit = async (formData: any) => {
    try {
      if (editId) {
        await updateGeneric(currentConfig.endpoint, editId, formData);
        toast.success("Data berhasil diperbarui.");
      } else {
        await createGeneric(currentConfig.endpoint, formData);
        toast.success("Data berhasil ditambahkan.");
      }
      toggleModal();
      fetchData(selectedKey);
    } catch (error) {
      toast.error("Gagal menyimpan data.");
    }
  };

  const columns = [
    ...currentConfig.columns.map((col: string) => ({
      name: col.replace(/_/g, " ").toUpperCase(),
      selector: (row: any) => row[col],
      sortable: true,
    })),
    {
      name: "Aksi",
      cell: (row: any) => (
        <div className="d-flex gap-2">
          <Button color="warning" size="sm" onClick={() => onEdit(row)}><Edit size={14} /></Button>
          <Button color="danger" size="sm" onClick={() => onDelete(row.id, row[currentConfig.columns[0]])}><Trash size={14} /></Button>
        </div>
      ),
    }
  ];

  return (
    <>
      <Breadcrumbs mainTitle="Administrasi Referensi" parent="Admin" title="Data Master" />
      <Container fluid={true}>
        <Row>
          <Col md="3">
            <Card>
              <CardBody className="p-0">
                <ListGroup flush>
                  {Object.keys(REFERENCE_CONFIG).map((key) => (
                    <ListGroupItem
                      key={key}
                      tag="button"
                      action
                      active={selectedKey === key}
                      onClick={() => setSelectedKey(key)}
                      style={{ cursor: "pointer" }}
                    >
                      {REFERENCE_CONFIG[key].title}
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
          <Col md="9">
            <Card>
              <CardBody>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5>Daftar {currentConfig.title}</h5>
                  <div className="d-flex gap-2">
                    <Button color="success" size="sm" onClick={handleExport}>
                      <Download size={14} className="me-1" /> Ekspor
                    </Button>
                    <div className="position-relative">
                      <Button color="info" size="sm" onClick={() => document.getElementById("import-file")?.click()}>
                        <Upload size={14} className="me-1" /> Impor
                      </Button>
                      <input type="file" id="import-file" accept=".xlsx" onChange={handleImport} className="d-none" />
                    </div>
                    <Button color="primary" size="sm" onClick={toggleModal}>
                      <Plus size={14} className="me-1" /> Tambah {currentConfig.title}
                    </Button>
                  </div>
                </div>
                <DataTable columns={columns} data={data} progressPending={loading} pagination highlightOnHover striped />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{editId ? "Edit" : "Tambah"} {currentConfig.title}</ModalHeader>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            {currentConfig.columns.map((col: string) => (
              <FormGroup key={col}>
                <Label>{col.replace(/_/g, " ").toUpperCase()}</Label>
                <Input type="text" {...register(col, { required: true })} />
              </FormGroup>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>Batal</Button>
            <Button color="primary" type="submit">Simpan</Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export default ReferenceAdmin;
