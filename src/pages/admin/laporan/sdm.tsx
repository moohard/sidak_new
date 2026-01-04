import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button } from "reactstrap";
import DataTable from "react-data-table-component";
import Breadcrumbs from "../../../../CommonElements/Breadcrumbs";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchLaporanSDM } from "@/redux/slices/reportingSlice";
import { fetchAllReferensi } from "@/redux/slices/referensiSlice";
import { toast } from "react-toastify";
import { Download, Search, Printer } from "react-feather";
import { exportJsonToXlsx } from "@/utils/excel";

const LaporanSDM = () => {
  const dispatch = useAppDispatch();
  const { sdmLaporan, loading } = useAppSelector((state) => state.reporting);
  const { unit, golongan, pegawaiJenis } = useAppSelector((state) => state.referensi);
  
  const [filters, setFilters] = useState({
    unit_id: "",
    golongan_id: "",
    jenis_pegawai_id: "",
    status_pegawai: "",
  });

  useEffect(() => {
    dispatch(fetchAllReferensi());
    dispatch(fetchLaporanSDM(filters));
  }, [dispatch]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const onSearch = () => {
    dispatch(fetchLaporanSDM(filters));
  };

  const handleExport = async () => {
    try {
      await exportJsonToXlsx({
        data: sdmLaporan,
        fileName: `Laporan_SDM_${new Date().getTime()}.xlsx`,
        sheetName: "Laporan SDM",
        columns: [
          "nip",
          "nama",
          "unit_kerja",
          "golongan",
          "jabatan",
          "jenis_pegawai",
          "status_pegawai",
        ],
      });
      toast.success("Laporan berhasil diekspor ke Excel.");
    } catch (error) {
      toast.error("Gagal mengekspor laporan.");
    }
  };

  const columns = [
    { name: "NIP", selector: (row: any) => row.nip, sortable: true, width: "150px" },
    { name: "NAMA", selector: (row: any) => row.nama, sortable: true, wrap: true },
    { name: "UNIT KERJA", selector: (row: any) => row.unit_kerja, sortable: true, wrap: true },
    { name: "GOL", selector: (row: any) => row.golongan, sortable: true, width: "80px" },
    { name: "JABATAN", selector: (row: any) => row.jabatan, sortable: true, wrap: true },
    { name: "JENIS", selector: (row: any) => row.jenis_pegawai, sortable: true },
    { name: "STATUS", selector: (row: any) => row.status_pegawai, sortable: true },
  ];

  return (
    <>
      <Breadcrumbs mainTitle="Laporan SDM" parent="Laporan" title="Data Pegawai" />
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
                        <Label>Golongan</Label>
                        <Input type="select" name="golongan_id" value={filters.golongan_id} onChange={handleFilterChange}>
                          <option value="">Semua Golongan</option>
                          {golongan.map((g: any) => <option key={g.id} value={g.id}>{g.golongan}</option>)}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup className="mb-0">
                        <Label>Jenis Pegawai</Label>
                        <Input type="select" name="jenis_pegawai_id" value={filters.jenis_pegawai_id} onChange={handleFilterChange}>
                          <option value="">Semua Jenis</option>
                          {pegawaiJenis.map((j: any) => <option key={j.id} value={j.id}>{j.pegawai_jenis}</option>)}
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
                      <Button color="info" onClick={() => window.print()}>
                        <Printer size={14} className="me-1" /> Cetak
                      </Button>
                    </Col>
                  </Row>
                </Form>
                <DataTable
                  columns={columns}
                  data={sdmLaporan}
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

export default LaporanSDM;
