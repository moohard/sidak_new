import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, Table, Button, Badge, Modal, ModalHeader, ModalBody } from "reactstrap";
import Breadcrumbs from "../../../../CommonElements/Breadcrumbs/Breadcrumbs";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchTTEQueue } from "../../redux/slices/tteSlice";
import { toast } from "react-toastify";
import { CheckCircle, Eye, FileText } from "react-feather";
import * as tteApi from "../../../api/tteService";

const TTEPortal = () => {
  const dispatch = useAppDispatch();
  const { queue, loading } = useAppSelector((state) => state.tte);
  const { user } = useAppSelector((state) => state.auth);
  
  const [previewModal, setPreviewModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [signing, setSigning] = useState(false);

  useEffect(() => {
    dispatch(fetchTTEQueue({ nip: user?.nip }));
  }, [dispatch, user]);

  const togglePreview = (doc?: any) => {
    if (doc) setSelectedDoc(doc);
    setPreviewModal(!previewModal);
  };

  const handleSign = async (id: string | number) => {
    setSigning(true);
    try {
      // Mocking the signing process via API
      // Backend should handle the Mekari integration
      await tteApi.updateRwPegawaiTTD(id, { status: "Completed", signed_at: new Date().toISOString() });
      toast.success("Dokumen berhasil ditandatangani secara digital.");
      dispatch(fetchTTEQueue({ nip: user?.nip }));
      if (previewModal) setPreviewModal(false);
    } catch (error) {
      toast.error("Gagal melakukan tanda tangan elektronik.");
    } finally {
      setSigning(false);
    }
  };

  return (
    <>
      <Breadcrumbs mainTitle="Portal TTE" parent="Portal" title="Tanda Tangan Elektronik" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <h5 className="mb-4">Antrian Tanda Tangan Masuk</h5>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>No. Dokumen</th>
                      <th>Jenis Dokumen</th>
                      <th>Tanggal Masuk</th>
                      <th>Pemohon</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {queue.length > 0 ? queue.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.no_dokumen}</td>
                        <td>{item.jenis_dokumen}</td>
                        <td>{item.created_at}</td>
                        <td>{item.pemohon_nama}<br/><small className="text-muted">{item.pemohon_nip}</small></td>
                        <td>
                          <Button color="info" size="sm" onClick={() => togglePreview(item)}>
                            <Eye size={14} className="me-1" /> Pratinjau
                          </Button>
                          <Button color="success" size="sm" className="ms-2" onClick={() => handleSign(item.id)}>
                            <CheckCircle size={14} className="me-1" /> Tandatangani
                          </Button>
                        </td>
                      </tr>
                    )) : <tr><td colSpan={5} className="text-center">Tidak ada antrian dokumen.</td></tr>}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal isOpen={previewModal} toggle={() => togglePreview()} size="xl">
        <ModalHeader toggle={() => togglePreview()}>Pratinjau Dokumen: {selectedDoc?.no_dokumen}</ModalHeader>
        <ModalBody>
          <div className="text-center p-5 bg-light rounded mb-4">
            <FileText size={48} className="text-muted mb-2" />
            <h6>Area Pratinjau PDF</h6>
            <p className="text-muted">Integrasi PDF Viewer (misal: react-pdf) akan ditambahkan di sini.</p>
            <Button color="primary" outline onClick={() => window.open(`${process.env.NEXT_PUBLIC_API_URL}/kepegawaian/rwpegawaittd/${selectedDoc?.id}/file`, "_blank")}>
              Buka File di Tab Baru
            </Button>
          </div>
          <div className="text-end">
            <Button color="secondary" onClick={() => togglePreview()} className="me-2">Tutup</Button>
            <Button color="success" onClick={() => handleSign(selectedDoc?.id)} disabled={signing}>
              {signing ? "Memproses..." : "Tanda Tangani Sekarang"}
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default TTEPortal;
