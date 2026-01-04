import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, Badge, Form, FormGroup, Label, Input, Button } from "reactstrap";
import DataTable from "react-data-table-component";
import Breadcrumbs from "../../../../CommonElements/Breadcrumbs";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchMonitoringPensiun } from "@/redux/slices/reportingSlice";
import { fetchAllReferensi } from "@/redux/slices/referensiSlice";
import moment from "moment";
import { Search, AlertTriangle } from "react-feather";

const MonitoringPensiun = () => {
  const dispatch = useAppDispatch();
  const { pensiunMonitoring, loading } = useAppSelector((state) => state.reporting);
  const { unit } = useAppSelector((state) => state.referensi);
  
  const [filters, setFilters] = useState({
    unit_id: "",
    tahun: moment().format("YYYY"),
  });

  useEffect(() => {
    dispatch(fetchAllReferensi());
    dispatch(fetchMonitoringPensiun(filters));
  }, [dispatch]);

  const onSearch = () => {
    dispatch(fetchMonitoringPensiun(filters));
  };

  const columns = [
    { name: "NIP", selector: (row: any) => row.nip, sortable: true },
    { name: "NAMA", selector: (row: any) => row.nama, sortable: true, wrap: true },
    { name: "UNIT KERJA", selector: (row: any) => row.unit_kerja, sortable: true, wrap: true },
    { name: "TGL LAHIR", selector: (row: any) => moment(row.tgl_lahir).format("DD-MM-YYYY"), sortable: true },
    { name: "TMT PENSIUN", selector: (row: any) => moment(row.tgl_pensiun).format("DD-MM-YYYY"), sortable: true },
    { 
      name: "STATUS", 
      cell: (row: any) => {
        const daysLeft = moment(row.tgl_pensiun).diff(moment(), "days");
        if (daysLeft < 0) return <Badge color="secondary">Sudah Pensiun</Badge>;
        if (daysLeft < 180) return <Badge color="danger"><AlertTriangle size={12} /> Segera Pensiun</Badge>;
        return <Badge color="warning">Mendekati</Badge>;
      }
    },
  ];

  return (
    <div className="page-body">
    <>
      <Breadcrumbs mainTitle="Monitoring Pensiun" parent="Monitoring" title="Kepegawaian" />
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
                        <Label>Tahun Pensiun</Label>
                        <Input type="select" value={filters.tahun} onChange={(e) => setFilters({...filters, tahun: e.target.value})}>
                          {[2024, 2025, 2026, 2027, 2028].map(y => <option key={y} value={y}>{y}</option>)}
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
                  data={pensiunMonitoring}
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
    </div>
  );
};

export default MonitoringPensiun;
