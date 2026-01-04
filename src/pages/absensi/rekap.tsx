import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, Table, Input, Button, FormGroup, Label } from "reactstrap";
import Breadcrumbs from "../../../CommonElements/Breadcrumbs/Breadcrumbs";
import * as absensiApi from "../../../api/absensiService";
import { toast } from "react-toastify";
import { Download } from "react-feather";

const AttendanceReporting = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState(new Date().toISOString().substring(0, 7)); // YYYY-MM

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await absensiApi.getAbsensiList({ month });
      setData(res.data.data || []);
    } catch (error) {
      toast.error("Gagal memuat rekap absensi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [month]);

  const handleExport = () => {
    // Logic for excel export
    toast.info("Memproses ekspor data ke Excel...");
  };

  return (
    <>
      <Breadcrumbs mainTitle="Rekapitulasi Absensi" parent="Absensi" title="Laporan & Uang Makan" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="d-flex align-items-center gap-3">
                    <FormGroup className="mb-0">
                      <Label className="me-2">Pilih Bulan:</Label>
                      <Input type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
                    </FormGroup>
                  </div>
                  <Button color="success" onClick={handleExport}>
                    <Download size={16} className="me-1" /> Ekspor Excel
                  </Button>
                </div>

                {loading ? <p>Loading...</p> : (
                  <Table responsive bordered striped>
                    <thead className="table-primary text-center">
                      <tr>
                        <th>Pegawai</th>
                        <th>Hadir</th>
                        <th>Izin/Sakit</th>
                        <th>Alpa</th>
                        <th>Terlambat</th>
                        <th>Uang Makan (Estimasi)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? data.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.nama}<br/><small>{item.nip}</small></td>
                          <td className="text-center">{item.jml_hadir}</td>
                          <td className="text-center">{item.jml_izin}</td>
                          <td className="text-center">{item.jml_alpa}</td>
                          <td className="text-center">{item.jml_terlambat}</td>
                          <td className="text-end">Rp {new Intl.NumberFormat("id-ID").format(item.estimasi_uang_makan)}</td>
                        </tr>
                      )) : <tr><td colSpan={6} className="text-center">Tidak ada data untuk periode ini.</td></tr>}
                    </tbody>
                  </Table>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AttendanceReporting;
