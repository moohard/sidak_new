import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, Button, Badge, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import DataTable from "react-data-table-component";
import Breadcrumbs from "../../../../CommonElements/Breadcrumbs";
import { getSlideList, createSlide, updateSlide, deleteSlide, updateSlideOrder } from "../../../api/slideService";
import { toast } from "react-toastify";
import { Plus, Edit, Trash, Move } from "react-feather";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import moment from "moment";
import { compressImage } from "../../../utils/imageCompressor";

const SlideManagement = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getSlideList();
      setData(res.data.data || []);
    } catch (error) {
      toast.error("Gagal memuat data slide");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleModal = () => {
    setModal(!modal);
    if (modal) {
      setEditId(null);
      setPreview(null);
      reset();
    }
  };

  const onEdit = (row: any) => {
    setEditId(row.id);
    setValue("title", row.title);
    setValue("link", row.link);
    setValue("order", row.order);
    setValue("start_date", row.start_date ? moment(row.start_date).format("YYYY-MM-DD") : "");
    setValue("end_date", row.end_date ? moment(row.end_date).format("YYYY-MM-DD") : "");
    setPreview(row.image_url);
    setModal(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImage(file, 1920, 0.8);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(compressed);
        setValue("image", compressed as any);
      } catch (error) {
        toast.error("Gagal memproses gambar");
      }
    }
  };

  const onSubmit = async (formData: any) => {
    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("link", formData.link || "");
      payload.append("order", formData.order || "0");
      payload.append("start_date", formData.start_date || "");
      payload.append("end_date", formData.end_date || "");
      if (formData.image) {
        payload.append("image", formData.image);
      }

      if (editId) {
        await updateSlide(editId, payload);
        toast.success("Slide berhasil diperbarui");
      } else {
        await createSlide(payload);
        toast.success("Slide berhasil ditambahkan");
      }
      toggleModal();
      fetchData();
    } catch (error) {
      toast.error("Gagal menyimpan slide");
    }
  };

  const onDelete = (id: number, title: string) => {
    Swal.fire({
      title: "Hapus Slide?",
      text: `Anda akan menghapus slide: ${title}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteSlide(id);
          toast.success("Slide berhasil dihapus.");
          fetchData();
        } catch (error) {
          toast.error("Gagal menghapus slide.");
        }
      }
    });
  };

  const handleReorder = async (id: number, newOrder: string) => {
      try {
          await updateSlideOrder([{ id, order: parseInt(newOrder) }]);
          toast.success("Urutan diperbarui");
          fetchData();
      } catch (error) {
          toast.error("Gagal memperbarui urutan");
      }
  }

  const columns = [
    {
      name: "Pratinjau",
      cell: (row: any) => (
        <img
          src={row.image_url}
          alt="slide"
          style={{ width: "120px", height: "60px", objectFit: "cover", borderRadius: "4px" }}
          onClick={() => window.open(row.image_url, '_blank')}
        />
      ),
      width: "150px",
    },
    {
      name: "Informasi Slide",
      cell: (row: any) => (
        <div className="py-2">
          <div className="fw-bold">{row.title}</div>
          <small className="text-muted">{row.link || "Tanpa Link"}</small>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Masa Aktif",
      cell: (row: any) => (
        <div className="small">
          {row.start_date ? moment(row.start_date).format("DD/MM/YY") : "-"} s/d {row.end_date ? moment(row.end_date).format("DD/MM/YY") : "-"}
        </div>
      ),
    },
    {
      name: "Urutan",
      cell: (row: any) => (
        <Input 
            type="number" 
            bsSize="sm" 
            defaultValue={row.order} 
            style={{ width: "60px" }} 
            onBlur={(e) => handleReorder(row.id, e.target.value)}
        />
      ),
      width: "100px",
    },
    {
      name: "Aksi",
      cell: (row: any) => (
        <div className="d-flex gap-2">
          <Button color="warning" size="sm" onClick={() => onEdit(row)}><Edit size={14} /></Button>
          <Button color="danger" size="sm" onClick={() => onDelete(row.id, row.title)}><Trash size={14} /></Button>
        </div>
      ),
      width: "120px",
    }
  ];

  return (
    <div className="page-body">
    <>
      <Breadcrumbs mainTitle="Manajemen Slide Beranda" parent="Admin" title="CMS" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5>Daftar Slide Aktif</h5>
                  <Button color="primary" onClick={toggleModal}>
                    <Plus size={18} className="me-2" /> Tambah Slide
                  </Button>
                </div>
                <DataTable
                  columns={columns}
                  data={data}
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

      <Modal isOpen={modal} toggle={toggleModal} size="lg">
        <ModalHeader toggle={toggleModal}>{editId ? "Edit" : "Tambah"} Slide</ModalHeader>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label>Judul / Alt Text</Label>
                  <Input type="text" {...register("title", { required: true })} />
                </FormGroup>
                <FormGroup>
                  <Label>Tautan (URL)</Label>
                  <Input type="text" placeholder="https://..." {...register("link")} />
                </FormGroup>
                <Row>
                    <Col md="6">
                        <FormGroup>
                            <Label>Urutan</Label>
                            <Input type="number" {...register("order")} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>Tanggal Mulai</Label>
                      <Input type="date" {...register("start_date")} />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Tanggal Berakhir</Label>
                      <Input type="date" {...register("end_date")} />
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label>Gambar Slide (Rekomendasi 1920x600)</Label>
                  <Input type="file" accept="image/*" onChange={handleFileChange} />
                  {preview && (
                    <div className="mt-3">
                      <img src={preview} alt="preview" className="img-fluid rounded border" style={{ maxHeight: "200px", width: "100%", objectFit: "cover" }} />
                    </div>
                  )}
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>Batal</Button>
            <Button color="primary" type="submit">Simpan Slide</Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
    </div>
  );
};

export default SlideManagement;
