import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, Button, Form, FormGroup, Label, Input } from "reactstrap";
import Breadcrumbs from "../../../../CommonElements/Breadcrumbs";
import { createNews, getNewsCategories } from "../../../api/newsService";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import { ArrowLeft, Save } from "react-feather";
import { compressImage } from "../../../utils/imageCompressor";
const CKEditor = dynamic(() => import("@ckeditor/ckeditor5-react").then(mod => mod.CKEditor), { ssr: false });

const CreateNews = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [editorInstance, setEditorInstance] = useState<any>(null);

  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm({
    defaultValues: {
      title: "",
      category_id: "",
      content: "",
      status: "draft",
      tags: "",
      thumbnail: null,
    }
  });

  useEffect(() => {
    let isMounted = true;
    const fetchCats = async () => {
      try {
        const res = await getNewsCategories();
        setCategories(res.data.data || []);
      } catch (error) {
        console.error("Gagal memuat kategori");
      }
    };
    fetchCats();
    import("@ckeditor/ckeditor5-build-classic")
      .then((mod) => {
        if (isMounted) {
          setEditorInstance(mod.default);
          setEditorLoaded(true);
        }
      })
      .catch(() => {
        if (isMounted) {
          setEditorLoaded(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(compressed);
        setValue("thumbnail", compressed as any);
      } catch (error) {
        toast.error("Gagal memproses gambar");
      }
    }
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("category_id", data.category_id);
      formData.append("content", data.content);
      formData.append("status", data.status);
      formData.append("tags", data.tags);
      if (data.thumbnail) {
        formData.append("thumbnail", data.thumbnail);
      }

      await createNews(formData);
      toast.success("Berita berhasil dibuat");
      router.push("/admin/news");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal membuat berita");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-body">
    <>
      <Breadcrumbs mainTitle="Tambah Berita Baru" parent="Admin" title="Manajemen Berita" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div className="d-flex justify-content-between mb-4">
                    <Button color="light" onClick={() => router.back()}>
                        <ArrowLeft size={16} className="me-2" /> Kembali
                    </Button>
                </div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col md="8">
                      <FormGroup>
                        <Label>Judul Berita</Label>
                        <Input
                          type="text"
                          placeholder="Masukkan judul berita..."
                          {...register("title", { required: "Judul wajib diisi" })}
                          invalid={!!errors.title}
                        />
                        {errors.title && <span className="text-danger">{errors.title.message as string}</span>}
                      </FormGroup>

                      <FormGroup>
                        <Label>Konten</Label>
                        <Controller
                          name="content"
                          control={control}
                          rules={{ required: "Konten tidak boleh kosong" }}
                          render={({ field }) => (
                            editorLoaded ? (
                              <CKEditor
                                editor={editorInstance}
                                data={field.value}
                                onChange={(_event: any, editor: any) => {
                                  const data = editor.getData();
                                  field.onChange(data);
                                }}
                              />
                            ) : (
                              <div className="text-muted">Memuat editor...</div>
                            )
                          )}
                        />
                        {errors.content && <span className="text-danger">{errors.content.message as string}</span>}
                      </FormGroup>
                    </Col>

                    <Col md="4">
                      <Card className="border">
                        <CardBody>
                          <FormGroup>
                            <Label>Kategori</Label>
                            <Input
                              type="select"
                              {...register("category_id", { required: "Pilih kategori" })}
                              invalid={!!errors.category_id}
                            >
                              <option value="">Pilih Kategori</option>
                              {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                              ))}
                            </Input>
                          </FormGroup>

                          <FormGroup>
                            <Label>Status Publikasi</Label>
                            <Input type="select" {...register("status")}>
                              <option value="draft">Draft</option>
                              <option value="published">Published</option>
                              <option value="archived">Archived</option>
                            </Input>
                          </FormGroup>

                          <FormGroup>
                            <Label>Thumbnail / Cover</Label>
                            <Input type="file" accept="image/*" onChange={handleFileChange} />
                            {preview && (
                              <div className="mt-3">
                                <img src={preview} alt="preview" className="img-fluid rounded border" />
                              </div>
                            )}
                          </FormGroup>

                          <FormGroup>
                            <Label>Tags (pisahkan dengan koma)</Label>
                            <Input type="text" placeholder="politik, unmul, pendidikan" {...register("tags")} />
                          </FormGroup>

                          <div className="d-grid gap-2 mt-4">
                            <Button color="primary" type="submit" disabled={loading}>
                              {loading ? "Menyimpan..." : (
                                <><Save size={16} className="me-2" /> Simpan Berita</>
                              )}
                            </Button>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
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

export default CreateNews;
