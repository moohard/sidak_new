import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import Breadcrumbs from "../../../../CommonElements/Breadcrumbs";
import { toast } from "react-toastify";
import * as absensiApi from "../../../api/absensiService";
import { useRouter } from "next/router";

const LeaveProposalForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      // In real scenario, upload file first then add to payload
      await absensiApi.createPengajuanAbsensi(data);
      toast.success("Pengajuan berhasil dikirim.");
      router.push("/dashboard/default");
    } catch (error) {
      toast.error("Gagal mengirim pengajuan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-body">
    <>
      <Breadcrumbs mainTitle="Pengajuan Izin/Cuti" parent="Portal" title="Form Pengajuan" />
      <Container fluid={true}>
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <FormGroup>
                    <Label>Jenis Pengajuan</Label>
                    <Input type="select" {...register("jenis_izin", { required: true })}>
                      <option value="Sakit">Sakit</option>
                      <option value="Izin">Izin</option>
                      <option value="Cuti">Cuti</option>
                      <option value="Tugas Luar">Tugas Luar</option>
                    </Input>
                  </FormGroup>
                  
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label>Dari Tanggal</Label>
                        <Input type="date" {...register("tgl_mulai", { required: true })} />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>Sampai Tanggal</Label>
                        <Input type="date" {...register("tgl_selesai", { required: true })} />
                      </FormGroup>
                    </Col>
                  </Row>

                  <FormGroup>
                    <Label>Alasan / Keterangan</Label>
                    <Input type="textarea" rows="3" {...register("keterangan", { required: true })} />
                  </FormGroup>

                  <FormGroup>
                    <Label>Dokumen Pendukung (PDF/Image)</Label>
                    <Input type="file" />
                    <small className="text-muted">Wajib melampirkan surat keterangan atau bukti pendukung.</small>
                  </FormGroup>

                  <div className="text-end">
                    <Button color="primary" type="submit" disabled={loading}>
                      {loading ? "Mengirim..." : "Kirim Pengajuan"}
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
    </div>
  );
};

export default LeaveProposalForm;
