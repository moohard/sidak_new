import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, Button, Badge, Input, FormGroup, Label } from "reactstrap";
import DataTable from "react-data-table-component";
import Breadcrumbs from "../../../../CommonElements/Breadcrumbs/Breadcrumbs";
import { getNewsList, deleteNews, getNewsCategories } from "../../../api/newsService";
import { toast } from "react-toastify";
import { Plus, Edit, Trash, Eye } from "react-feather";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import moment from "moment";

const NewsList = () => {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    status: "",
    search: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getNewsList(filters);
      setData(res.data.data || []);
    } catch (error) {
      toast.error("Gagal memuat data berita");
    } finally {
      setLoading(false);
    }
  };

  const fetchRefs = async () => {
    try {
      const res = await getNewsCategories();
      setCategories(res.data.data || []);
    } catch (error) {
      console.error("Gagal memuat kategori");
    }
  };

  useEffect(() => {
    fetchRefs();
  }, []);

  useEffect(() => {
    fetchData();
  }, [filters.category, filters.status]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
  };

  const onDelete = (id: number, title: string) => {
    Swal.fire({
      title: "Hapus Berita?",
      text: `Anda akan menghapus: ${title}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteNews(id);
          toast.success("Berita berhasil dihapus.");
          fetchData();
        } catch (error) {
          toast.error("Gagal menghapus berita.");
        }
      }
    });
  };

  const columns = [
    {
      name: "Cover",
      cell: (row: any) => (
        <img
          src={row.cover_url || "/assets/images/dashboard/default-news.png"}
          alt="cover"
          style={{ width: "50px", height: "30px", objectFit: "cover", borderRadius: "4px" }}
        />
      ),
      width: "80px",
    },
    {
      name: "Judul",
      selector: (row: any) => row.title,
      sortable: true,
      wrap: true,
    },
    {
      name: "Kategori",
      selector: (row: any) => row.category_name,
      sortable: true,
    },
    {
      name: "Tanggal Publish",
      selector: (row: any) => row.published_at ? moment(row.published_at).format("DD MMM YYYY") : "Draft",
      sortable: true,
    },
    {
      name: "Status",
      cell: (row: any) => (
        <Badge color={row.status === "published" ? "success" : "warning"}>
          {row.status?.toUpperCase() || "DRAFT"}
        </Badge>
      ),
    },
    {
      name: "Aksi",
      cell: (row: any) => (
        <div className="d-flex gap-2">
          <Button color="info" size="sm" onClick={() => router.push(`/admin/news/view/${row.id}`)}>
            <Eye size={14} />
          </Button>
          <Button color="warning" size="sm" onClick={() => router.push(`/admin/news/edit/${row.id}`)}>
            <Edit size={14} />
          </Button>
          <Button color="danger" size="sm" onClick={() => onDelete(row.id, row.title)}>
            <Trash size={14} />
          </Button>
        </div>
      ),
      width: "150px",
    },
  ];

  return (
    <>
      <Breadcrumbs mainTitle="Manajemen Berita" parent="Admin" title="CMS" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="d-flex gap-3 flex-grow-1 align-items-end">
                    <FormGroup className="mb-0">
                      <Label size="sm">Kategori</Label>
                      <Input
                        type="select"
                        size="sm"
                        value={filters.category}
                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                      >
                        <option value="">Semua Kategori</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </Input>
                    </FormGroup>
                    <FormGroup className="mb-0">
                      <Label size="sm">Status</Label>
                      <Input
                        type="select"
                        size="sm"
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                      >
                        <option value="">Semua Status</option>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </Input>
                    </FormGroup>
                    <FormGroup className="mb-0 d-flex gap-2 align-items-end">
                        <div>
                            <Label size="sm">Cari</Label>
                            <Input
                                type="text"
                                size="sm"
                                placeholder="Cari judul..."
                                value={filters.search}
                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                            />
                        </div>
                        <Button color="primary" size="sm" onClick={fetchData}>Filter</Button>
                    </FormGroup>
                  </div>
                  <Button color="primary" onClick={() => router.push("/admin/news/create")}>
                    <Plus size={18} className="me-2" /> Tambah Berita
                  </Button>
                </div>
                <DataTable
                  columns={columns}
                  data={data}
                  progressPending={loading}
                  pagination
                  highlightOnHover
                  striped
                  responsive
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NewsList;
