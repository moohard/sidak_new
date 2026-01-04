import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, Badge, Form, FormGroup, Label, Input, Button } from "reactstrap";
import DataTable from "react-data-table-component";
import Breadcrumbs from "../../../../CommonElements/Breadcrumbs/Breadcrumbs";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchMonitoringBerkala } from "@/redux/slices/reportingSlice";
import { fetchAllReferensi } from "@/redux/slices/referensiSlice";
import moment from "moment";
import { Search, Clock } from "react-feather";

const MonitoringBerkala = () => {
  const dispatch = useAppDispatch();
  const { berkalaMonitoring, loading } = useAppSelector((state) => state.reporting);
  const { unit } = useAppSelector((state) => state.referensi);
  
  const [filters, setFilters] = useState({
    unit_id: "",
    tahun: moment().format("YYYY"),
  });

  useEffect(() => {
    dispatch(fetchAllReferensi());
    dispatch(fetchMonitoringBerkala(filters));
  }, [dispatch]);

  const onSearch = () => {
    dispatch(fetchMonitoringBerkala(filters));
  };

  const columns = [
    { name: "NIP", selector: (row: any) => row.nip, sortable: true },
    { name: "NAMA", selector: (row: any) => row.nama, sortable: true, wrap: true },
    { name: "GOL", selector: (row: any) => row.golongan, sortable: true },
    { name: "GAJI LAMA", selector: (row: any) => `Rp ${new Intl.NumberFormat("id-ID").format(row.gaji_lama)}`, sortable: true },
    { name: "TGL BERKALA", selector: (row: any) => moment(row.tgl_berkala).format("DD-MM-YYYY"), sortable: true },
    { 
      name: "SISA WAKTU", 
      cell: (row: any) => {
        const monthsLeft = moment(row.tgl_berkala).diff(moment(), "months");
        if (monthsLeft < 0) return <Badge color="danger">Jatuh Tempo</Badge>;
        if (monthsLeft < 3) return <Badge color="warning"><Clock size={12} /> {monthsLeft} Bulan Lagi</Badge>;
        return <Badge color="info">{monthsLeft} Bulan Lagi</Badge>;
      }
    },
  ];

  return (
    <>
      <Breadcrumbs mainTitle="Monitoring Kenaikan Gaji Berkala" parent="Monitoring" title="Kepegawaian" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <Form className="mb-4">
                  <Row className="align-items-end">
                    <Col md="4">
                      <FormGroup className="mb-0">
                        <Label>Unit Kerja</Label>
                        <Input type="select" value={filters.unit_id} onChange={(e) => setFilters({...filters, unit_id: e.target.value})}>
                          <option value="">Semua Unit</option>
                          {unit.map((u: any) => <option key={u.id} value={u.id}>{u.unit_kerja}</option>)}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup className="mb-0">
                        <Label>Tahun</Label>
                        <Input type="select" value={filters.tahun} onChange={(e) => setFilters({...filters, tahun: e.target.value})}>
                          {[2024, 2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="auto">
                      <Button color="primary" onClick={onSearch}>
                        <Search size={14} className="me-1" /> Filter
                      </Button>
                    </Col>
                  </Row>
                </Form>
                <DataTable
                  columns={columns}
                  data={berkalaMonitoring}
                  progressPending={loading}
                  pagination
                  highlightOnHover
                  striped
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MonitoringBerkala;
