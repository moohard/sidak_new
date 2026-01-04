import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button } from "reactstrap";
import Breadcrumbs from "../../../CommonElements/Breadcrumbs";
import { useAppSelector } from "@/redux/hooks";
import { getPegawaiData, updatePegawai } from "@/api/pegawaiService";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Save, User } from "react-feather";

const UserProfileEdit = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.nip) return;
      try {
        const res = await getPegawaiData(user.nip);
        const data = res.data.data;
        reset({
          nama: data.nama,
          nip: data.nip,
          email: data.email,
          hp: data.hp,
          alamat: data.alamat,
        });
      } catch (error) {
        toast.error("Gagal memuat profil");
      } finally {
        setFetching(false);
      }
    };
    fetchProfile();
  }, [user, reset]);

  const onSubmit = async (data: any) => {
    if (!user?.nip) return;
    setLoading(true);
    try {
      // Kita hanya mengirim data yang diizinkan diubah secara mandiri
      const payload = {
          email: data.email,
          hp: data.hp,
          alamat: data.alamat
      };
      await updatePegawai(user.nip, payload);
      toast.success("Profil berhasil diperbarui");
    } catch (error) {
      toast.error("Gagal memperbarui profil");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="p-5 text-center">Memuat profil...</div>;

  return (
    <div className="page-body">
      <Breadcrumbs mainTitle="Pengaturan Profil Saya" parent="Portal" title="Profil" />
      <Container fluid={true}>
        <Row className="justify-content-center">
          <Col md="8">
            <Card className="shadow-sm">
              <CardBody>
                <div className="d-flex align-items-center mb-4">
                    <User size={24} className="me-2 text-primary" />
                    <h5 className="mb-0">Informasi Pribadi</h5>
                </div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label>Nama Lengkap (Read-only)</Label>
                        <Input type="text" {...register("nama")} disabled />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>NIP (Read-only)</Label>
                        <Input type="text" {...register("nip")} disabled />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>Email</Label>
                        <Input type="email" {...register("email", { required: "Email wajib diisi" })} />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>No. Handphone (WhatsApp)</Label>
                        <Input type="text" {...register("hp", { required: "No HP wajib diisi" })} />
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <FormGroup>
                        <Label>Alamat Tinggal</Label>
                        <Input type="textarea" rows="3" {...register("alamat")} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <div className="text-end mt-3">
                    <Button color="primary" type="submit" disabled={loading}>
                      <Save size={16} className="me-2" />
                      {loading ? "Menyimpan..." : "Simpan Perubahan"}
                    </Button>
                  </div>
                </Form>
                <div className="mt-4 p-3 bg-light rounded small text-muted">
                    <strong>Catatan:</strong> Perubahan pada data Nama, NIP, atau Jabatan harus melalui admin kepegawaian dengan melampirkan bukti pendukung.
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserProfileEdit;
