import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import Breadcrumbs from "../../../CommonElements/Breadcrumbs";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { fetchAllReferensi } from "../../redux/slices/referensiSlice";
import { createPegawai, updatePegawai, getPegawaiData, updateFotoPegawai } from "../../api/pegawaiService";
import { toast } from "react-toastify";

const PegawaiForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { nip: editNip } = router.query;
  const isEdit = !!editNip;

  const { agama, unit, golongan, kawin, pendidikan, pegawaiJenis } = useAppSelector((state) => state.referensi);
  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    dispatch(fetchAllReferensi());
    if (isEdit) {
      const loadData = async () => {
        try {
          const res = await getPegawaiData(editNip as string);
          const data = res.data.data;
          // Set form values
          Object.keys(data).forEach(key => {
            setValue(key, data[key]);
          });
        } catch (error) {
          toast.error("Gagal memuat data pegawai.");
        }
      };
      loadData();
    }
  }, [dispatch, editNip, isEdit, setValue]);

  const [fotoPreview, setFotoPreview] = useState<string | null>(null);

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      let nip = editNip as string;
      if (isEdit) {
        await updatePegawai(nip, data);
      } else {
        const res = await createPegawai(data);
        nip = res.data.data.nip;
      }

      // Handle foto upload if any
      const fotoFile = (document.getElementById("foto") as HTMLInputElement).files?.[0];
      if (fotoFile) {
        const formData = new FormData();
        formData.append("foto", fotoFile);
        await updateFotoPegawai(nip, formData);
      }

      toast.success("Data pegawai berhasil disimpan.");
      router.push("/pegawai");
    } catch (error) {
      toast.error("Terjadi kesalahan saat menyimpan data.");
    }
  };

  // ... Di dalam return Form ...
  <Row className="mb-4">
    <Col md="12" className="text-center">
      <div className="position-relative d-inline-block">
        <img 
          src={fotoPreview || "/assets/images/user/user.png"} 
          alt="Preview" 
          className="img-150 b-r-10 mb-2"
          style={{ objectFit: "cover" }}
        />
        <FormGroup>
          <Label for="foto" className="btn btn-sm btn-info">Ubah Foto</Label>
          <Input 
            type="file" 
            id="foto" 
            accept="image/*" 
            onChange={handleFotoChange} 
            className="d-none"
          />
        </FormGroup>
      </div>
    </Col>
  </Row>

  return (
    <>
      <Breadcrumbs mainTitle={isEdit ? "Edit Pegawai" : "Tambah Pegawai"} parent="Kepegawaian" title="Form Pegawai" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label>NIP</Label>
                        <Input 
                          type="text" 
                          {...register("nip", { required: "NIP wajib diisi" })} 
                          disabled={isEdit}
                          invalid={!!errors.nip}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>Nama Lengkap (Tanpa Gelar)</Label>
                        <Input 
                          type="text" 
                          {...register("nama", { required: "Nama wajib diisi" })} 
                          invalid={!!errors.nama}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <Label>Agama</Label>
                        <Input type="select" {...register("agama_id")}>
                          <option value="">Pilih Agama</option>
                          {agama.map(item => <option key={item.id} value={item.id}>{item.agama}</option>)}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Unit Kerja</Label>
                        <Input type="select" {...register("unit_id")}>
                          <option value="">Pilih Unit Kerja</option>
                          {unit.map(item => <option key={item.id} value={item.id}>{item.unit_kerja}</option>)}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Jenis Pegawai</Label>
                        <Input type="select" {...register("jenis_pegawai_id")}>
                          <option value="">Pilih Jenis</option>
                          {pegawaiJenis.map(item => <option key={item.id} value={item.id}>{item.jenis_pegawai}</option>)}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>

                  <div className="text-end mt-4">
                    <Button color="secondary" className="me-2" onClick={() => router.back()}>Batal</Button>
                    <Button color="primary" type="submit">Simpan Data</Button>
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

export default PegawaiForm;
