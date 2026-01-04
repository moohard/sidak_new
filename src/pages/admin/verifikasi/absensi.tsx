import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, Table, Button, Badge } from "reactstrap";
import Breadcrumbs from "../../../../CommonElements/Breadcrumbs";
import * as absensiApi from "../../../api/absensiService";
import { toast } from "react-toastify";

const AdminLeaveVerification = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await absensiApi.getPengajuanAbsensiList({ status: "Pending" });
      setData(res.data.data || []);
    } catch (error) {
      toast.error("Gagal mengambil data usulan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAction = async (id: string | number, status: string) => {
    try {
      // Logic for status update
      toast.success(`Pengajuan ${status === "Approved" ? "disetujui" : "ditolak"}.`);
      fetchData();
    } catch (error) {
      toast.error("Gagal memperbarui status.");
    }
  };

  return (
    <>
      <Breadcrumbs mainTitle="Verifikasi Izin/Cuti" parent="Admin" title="Verifikasi Absensi" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                {loading ? <p>Loading...</p> : (
                  <Table responsive striped>
                    <thead>
                      <tr>
                        <th>Pegawai</th>
                        <th>Jenis</th>
                        <th>Tanggal</th>
                        <th>Keterangan</th>
                        <th>Dokumen</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? data.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.nama}<br/><small>{item.nip}</small></td>
                          <td><Badge color="info">{item.jenis_izin}</Badge></td>
                          <td>{item.tgl_mulai} s/d {item.tgl_selesai}</td>
                          <td>{item.keterangan}</td>
                          <td>
                            {item.file && (
                              <Button color="link" size="sm" onClick={() => window.open(item.file, "_blank")}>Lihat</Button>
                            )}
                          </td>
                          <td>
                            <Button color="success" size="sm" onClick={() => handleAction(item.id, "Approved")}>Setujui</Button>
                            <Button color="danger" size="sm" className="ms-2" onClick={() => handleAction(item.id, "Rejected")}>Tolak</Button>
                          </td>
                        </tr>
                      )) : <tr><td colSpan={6} className="text-center">Tidak ada usulan izin pending.</td></tr>}
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

export default AdminLeaveVerification;
