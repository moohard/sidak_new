import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import Breadcrumbs from "../../../../CommonElements/Breadcrumbs";
import { useAppSelector } from "../../../redux/hooks";
import { toast } from "react-toastify";
import * as riwayatApi from "../../../api/riwayatService";

const HistoryProposalForm = () => {
  const router = useRouter();
  const { type } = router.query; // 'jabatan', 'pangkat', 'pendidikan', etc.
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { user } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const payload = { ...data, nip: user?.nip };
      
      // Handle file upload if any (simplified for now)
      // In a real scenario, we would upload to pegawai_arsip first and get an ID
      
      let response;
      switch (type) {
        case "jabatan":
          response = await riwayatApi.createRwJabatan(payload);
          break;
        case "pangkat":
          response = await riwayatApi.createRwPangkat(payload);
          break;
        case "pendidikan":
          response = await riwayatApi.createRwPendidikan(payload);
          break;
        case "diklat":
          response = await riwayatApi.createRwDiklat(payload);
          break;
        case "tandaJasa":
          response = await riwayatApi.createRwTandaJasa(payload);
          break;
        default:
          throw new Error("Tipe riwayat tidak valid");
      }

      toast.success("Usulan riwayat berhasil dikirim dan menunggu verifikasi.");
      router.push("/dashboard/default"); // Or back to profile
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal mengirim usulan.");
    } finally {
      setLoading(false);
    }
  };

  const renderFormFields = () => {
    switch (type) {
      case "jabatan":
        return (
          <>
            <FormGroup>
              <Label>Nama Jabatan</Label>
              <Input type="text" {...register("jabatan", { required: true })} invalid={!!errors.jabatan} />
            </FormGroup>
            <FormGroup>
              <Label>Unit Kerja</Label>
              <Input type="text" {...register("unit_kerja", { required: true })} />
            </FormGroup>
            <FormGroup>
              <Label>TMT Jabatan</Label>
              <Input type="date" {...register("tmt_jabatan", { required: true })} />
            </FormGroup>
            <FormGroup>
              <Label>Nomor SK</Label>
              <Input type="text" {...register("no_sk")} />
            </FormGroup>
          </>
        );
      case "pangkat":
        return (
          <>
            <FormGroup>
              <Label>Pangkat</Label>
              <Input type="text" {...register("pangkat", { required: true })} />
            </FormGroup>
            <FormGroup>
              <Label>Golongan</Label>
              <Input type="text" {...register("golongan", { required: true })} />
            </FormGroup>
            <FormGroup>
              <Label>TMT Pangkat</Label>
              <Input type="date" {...register("tmt_pangkat", { required: true })} />
            </FormGroup>
            <FormGroup>
              <Label>Nomor SK</Label>
              <Input type="text" {...register("no_sk")} />
            </FormGroup>
          </>
        );
      case "pendidikan":
        return (
          <>
            <FormGroup>
              <Label>Tingkat Pendidikan</Label>
              <Input type="select" {...register("tingkat_pendidikan_id", { required: true })}>
                <option value="">Pilih Tingkat</option>
                <option value="1">S1</option>
                <option value="2">S2</option>
                <option value="3">S3</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Nama Sekolah/Universitas</Label>
              <Input type="text" {...register("nama_sekolah", { required: true })} />
            </FormGroup>
            <FormGroup>
              <Label>Tahun Lulus</Label>
              <Input type="number" {...register("thn_lulus", { required: true })} />
            </FormGroup>
            <FormGroup>
              <Label>Nomor Ijazah</Label>
              <Input type="text" {...register("no_ijazah")} />
            </FormGroup>
          </>
        );
      default:
        return <p>Pilih tipe riwayat yang ingin ditambahkan.</p>;
    }
  };

  return (
    <>
      <Breadcrumbs mainTitle={`Usul Riwayat ${type}`} parent="Portal" title="Form Usulan" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  {renderFormFields()}
                  <FormGroup>
                    <Label>Dokumen Pendukung (PDF/Image)</Label>
                    <Input type="file" />
                    <small className="text-muted">Unggah bukti SK atau Ijazah.</small>
                  </FormGroup>
                  <div className="text-end">
                    <Button color="primary" type="submit" disabled={loading}>
                      {loading ? "Mengirim..." : "Kirim Usulan"}
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HistoryProposalForm;
