import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Badge } from "reactstrap";
import DataTable from "react-data-table-component";
import Breadcrumbs from "../../../../CommonElements/Breadcrumbs";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchBkdSisterList } from "@/redux/slices/reportingSlice";
import { uploadLapBkdSister, deleteLapBkdSister } from "@/api/lapBkdSisterService";
import { toast } from "react-toastify";
import { Plus, Trash, Download, Upload as UploadIcon, FileText } from "react-feather";
import Swal from "sweetalert2";
import moment from "moment";

const BkdSisterManagement = () => {
  const dispatch = useAppDispatch();
  const { bkdSisterList, loading } = useAppSelector((state) => state.reporting);
  const [modal, setModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [keterangan, setKeterangan] = useState("");

  useEffect(() => {
    dispatch(fetchBkdSisterList({}));
  }, [dispatch]);

  const toggleModal = () => {
    setModal(!modal);
    setFile(null);
    setKeterangan("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const onUpload = async () => {
    if (!file) return toast.error("Pilih file terlebih dahulu");
    
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("keterangan", keterangan);
      
      await uploadLapBkdSister(formData);
      toast.success("Laporan berhasil diunggah");
      toggleModal();
      dispatch(fetchBkdSisterList({}));
    } catch (error) {
      toast.error("Gagal mengunggah laporan");
    } finally {
      setUploading(false);
    }
  };

  const onDelete = (id: number) => {
    Swal.fire({
      title: "Hapus Laporan?",
      text: "Data yang dihapus tidak dapat dikembalikan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteLapBkdSister(id);
          toast.success("Laporan dihapus");
          dispatch(fetchBkdSisterList({}));
        } catch (error) {
          toast.error("Gagal menghapus laporan");
        }
      }
    });
  };

  const columns = [
    { name: "TANGGAL", selector: (row: any) => moment(row.created_at).format("DD-MM-YYYY HH:mm"), sortable: true },
    { name: "FILE", selector: (row: any) => row.filename, sortable: true, wrap: true },
    { name: "KETERANGAN", selector: (row: any) => row.keterangan, sortable: true, wrap: true },
    { 
      name: "STATUS SYNC", 
      cell: (row: any) => (
        <Badge color={row.sync_status === "success" ? "success" : "warning"}>
          {row.sync_status?.toUpperCase() || "PENDING"}
        </Badge>
      )
    },
    {
      name: "AKSI",
      cell: (row: any) => (
        <div className="d-flex gap-2">
          <Button color="info" size="sm" onClick={() => window.open(row.file_url)}><Download size={14} /></Button>
          <Button color="danger" size="sm" onClick={() => onDelete(row.id)}><Trash size={14} /></Button>
        </div>
      )
    }
  ];

  return (
    <>
      <Breadcrumbs mainTitle="Laporan BKD Sister" parent="Laporan" title="Integrasi" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5>Daftar Laporan Terunggah</h5>
                  <Button color="primary" onClick={toggleModal}>
                    <Plus size={18} className="me-2" /> Unggah Laporan Baru
                  </Button>
                </div>
                <DataTable
                  columns={columns}
                  data={bkdSisterList}
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

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Unggah Laporan BKD Sister</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>File Laporan (PDF/Excel)</Label>
              <Input type="file" onChange={handleFileChange} />
              <small className="text-muted text-info"><FileText size={12} /> Format yang didukung: .pdf, .xls, .xlsx</small>
            </FormGroup>
            <FormGroup>
              <Label>Keterangan</Label>
              <Input type="textarea" value={keterangan} onChange={(e) => setKeterangan(e.target.value)} placeholder="Tahun akademik, semester, dll..." />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>Batal</Button>
          <Button color="primary" onClick={onUpload} disabled={uploading}>
            {uploading ? "Mengunggah..." : <><UploadIcon size={14} className="me-1" /> Unggah</>}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default BkdSisterManagement;
