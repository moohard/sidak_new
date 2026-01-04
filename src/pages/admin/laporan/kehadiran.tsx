import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button } from "reactstrap";
import DataTable from "react-data-table-component";
import Breadcrumbs from "../../../../CommonElements/Breadcrumbs";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchLaporanKehadiran } from "@/redux/slices/reportingSlice";
import { fetchAllReferensi } from "@/redux/slices/referensiSlice";
import { toast } from "react-toastify";
import { Download, Search, Printer } from "react-feather";
import { exportJsonToXlsx } from "@/utils/excel";
import moment from "moment";

const LaporanKehadiran = () => {
  const dispatch = useAppDispatch();
  const { attendanceLaporan, loading } = useAppSelector((state) => state.reporting);
  const { unit } = useAppSelector((state) => state.referensi);
  
  const [filters, setFilters] = useState({
    unit_id: "",
    bulan: moment().format("MM"),
    tahun: moment().format("YYYY"),
  });

  useEffect(() => {
    dispatch(fetchAllReferensi());
    dispatch(fetchLaporanKehadiran(filters));
  }, [dispatch]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const onSearch = () => {
    dispatch(fetchLaporanKehadiran(filters));
  };

  const handleExport = async () => {
    try {
      await exportJsonToXlsx({
        data: attendanceLaporan,
        fileName: `Rekap_Kehadiran_${filters.bulan}_${filters.tahun}.xlsx`,
        sheetName: "Rekap Kehadiran",
        columns: [
          "nip",
          "nama",
          "total_hadir",
          "total_terlambat",
          "total_ijin",
          "total_sakit",
          "total_alpa",
          "total_uang_makan",
        ],
      });
      toast.success("Laporan berhasil diekspor ke Excel.");
    } catch (error) {
      toast.error("Gagal mengekspor laporan.");
    }
  };

  const columns = [
    { name: "NIP", selector: (row: any) => row.nip, sortable: true },
    { name: "NAMA", selector: (row: any) => row.nama, sortable: true, wrap: true },
    { name: "HADIR", selector: (row: any) => row.total_hadir, sortable: true, center: true },
    { name: "TERLAMBAT", selector: (row: any) => row.total_terlambat, sortable: true, center: true },
    { name: "IJIN", selector: (row: any) => row.total_ijin, sortable: true, center: true },
    { name: "SAKIT", selector: (row: any) => row.total_sakit, sortable: true, center: true },
    { name: "ALPA", selector: (row: any) => row.total_alpa, sortable: true, center: true },
    { name: "UANG MAKAN", selector: (row: any) => `Rp ${new Intl.NumberFormat("id-ID").format(row.total_uang_makan)}`, sortable: true, right: true },
  ];

  return (
    <>
      <Breadcrumbs mainTitle="Laporan Kehadiran & Uang Makan" parent="Laporan" title="Absensi" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <Form className="mb-4">
                  <Row className="align-items-end">
                    <Col md="3">
                      <FormGroup className="mb-0">
                        <Label>Unit Kerja</Label>
                        <Input type="select" name="unit_id" value={filters.unit_id} onChange={handleFilterChange}>
                          <option value="">Semua Unit</option>
                          {unit.map((u: any) => <option key={u.id} value={u.id}>{u.unit_kerja}</option>)}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup className="mb-0">
                        <Label>Bulan</Label>
                        <Input type="select" name="bulan" value={filters.bulan} onChange={handleFilterChange}>
                          {moment.months().map((m, i) => (
                            <option key={i} value={moment().month(i).format("MM")}>{m}</option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup className="mb-0">
                        <Label>Tahun</Label>
                        <Input type="select" name="tahun" value={filters.tahun} onChange={handleFilterChange}>
                          {[2023, 2024, 2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="auto" className="d-flex gap-2">
                      <Button color="primary" onClick={onSearch}>
                        <Search size={14} className="me-1" /> Cari
                      </Button>
                      <Button color="success" onClick={handleExport}>
                        <Download size={14} className="me-1" /> Excel
                      </Button>
                    </Col>
                  </Row>
                </Form>
                <DataTable
                  columns={columns}
                  data={attendanceLaporan}
                  progressPending={loading}
                  pagination
                  highlightOnHover
                  striped
                  responsive
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LaporanKehadiran;
