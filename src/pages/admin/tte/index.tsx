import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, Table, Button, Badge, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Breadcrumbs from "../../../../CommonElements/Breadcrumbs/Breadcrumbs";
import * as tteApi from "../../../api/tteService";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toast } from "react-toastify";
import { Send, Download, Filter, Search } from "react-feather";

const AdminTTEManagement = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  
  // States for filter and search
  const [filterStatus, setFilterStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await tteApi.getRwPegawaiTTDList({ status: filterStatus, search: searchTerm });
      setRequests(res.data.data || []);
    } catch (error) {
      toast.error("Gagal memuat data permintaan TTE.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterStatus]);

  const toggleModal = () => setModal(!modal);

  const handleRequestTTE = async (formData: any) => {
    try {
      await tteApi.createRwPegawaiTTD(formData);
      toast.success("Permintaan TTE berhasil dikirim.");
      toggleModal();
      fetchData();
    } catch (error) {
      toast.error("Gagal mengirim permintaan TTE.");
    }
  };

  return (
    <>
      <Breadcrumbs mainTitle="Manajemen TTE" parent="Admin" title="Monitoring TTE" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="d-flex gap-3 align-items-end">
                    <FormGroup className="mb-0">
                      <Label>Status</Label>
                      <Input type="select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="">Semua Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Selesai</option>
                        <option value="Rejected">Ditolak</option>
                      </Input>
                    </FormGroup>
                    <div className="input-group" style={{ width: "300px" }}>
                      <Input type="text" placeholder="Cari No. Dokumen..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                      <Button color="primary" onClick={fetchData}><Search size={14}/></Button>
                    </div>
                  </div>
                  <Button color="primary" onClick={toggleModal}>
                    <Send size={14} className="me-1" /> Request TTE Baru
                  </Button>
                </div>

                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>No. Dokumen</th>
                      <th>Penandatangan</th>
                      <th>Pemohon</th>
                      <th>Status</th>
                      <th>Update Terakhir</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.length > 0 ? requests.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.no_dokumen}<br/><small className="text-muted">{item.jenis_dokumen}</small></td>
                        <td>{item.pejabat_nama}</td>
                        <td>{item.pemohon_nama}</td>
                        <td>
                          <Badge color={item.status === "Completed" ? "success" : item.status === "Pending" ? "warning" : "danger"}>
                            {item.status}
                          </Badge>
                        </td>
                        <td>{item.updated_at}</td>
                        <td>
                          {item.status === "Completed" && (
                            <Button color="success" outline size="sm">
                              <Download size={14} /> Download
                            </Button>
                          )}
                          <Button color="info" outline size="sm" className="ms-2">Detail</Button>
                        </td>
                      </tr>
                    )) : <tr><td colSpan={6} className="text-center">Tidak ada data.</td></tr>}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal for new request will be implemented here */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Buat Permintaan TTE Baru</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Pilih Dokumen (dari Arsip)</Label>
            <Input type="select">
              <option>Pilih berkas...</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>Pilih Pejabat Penandatangan</Label>
            <Input type="select">
              <option>Pilih pejabat...</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>Keterangan</Label>
            <Input type="textarea" placeholder="Instruksi tambahan..." />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>Batal</Button>
          <Button color="primary" onClick={() => handleRequestTTE({})}>Kirim Permintaan</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AdminTTEManagement;
