import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { Container, Row, Col, Card, CardBody, Input, Button, Label, FormGroup } from "reactstrap";
import DataTable from "react-data-table-component";
import { Search, Filter } from "react-feather";
import { getPegawaiList, softDeletePegawai } from "../../api/pegawaiService";
import Breadcrumbs from "../../../CommonElements/Breadcrumbs";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchAllReferensi } from "../../redux/slices/referensiSlice";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const PegawaiList = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { unit, golongan, pegawaiJenis } = useAppSelector((state) => state.referensi);
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  
  // Filter States
  const [filterUnit, setFilterUnit] = useState("");
  const [filterJenis, setFilterJenis] = useState("");
  const [filterGolongan, setFilterGolongan] = useState("");

  const fetchPegawai = useCallback(async (page: number, size: number, search: string = "", filters: any = {}) => {
    setLoading(true);
    try {
      const response = await getPegawaiList({
        page: page,
        limit: size,
        search: search,
        unit_id: filters.unit,
        jenis_id: filters.jenis,
        golongan_id: filters.golongan,
      });
      setData(response.data.data || []);
      setTotalRows(response.data.total || 0);
    } catch (error) {
      console.error("Failed to fetch pegawai:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    dispatch(fetchAllReferensi());
    fetchPegawai(1, perPage);
  }, [dispatch, fetchPegawai, perPage]);

  const handlePageChange = (page: number) => {
    fetchPegawai(page, perPage, searchTerm, { unit: filterUnit, jenis: filterJenis, golongan: filterGolongan });
  };

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setPerPage(newPerPage);
    fetchPegawai(page, newPerPage, searchTerm, { unit: filterUnit, jenis: filterJenis, golongan: filterGolongan });
  };

  const handleSearch = () => {
    fetchPegawai(1, perPage, searchTerm, { unit: filterUnit, jenis: filterJenis, golongan: filterGolongan });
  };

  const applyFilter = () => {
    fetchPegawai(1, perPage, searchTerm, { unit: filterUnit, jenis: filterJenis, golongan: filterGolongan });
  };

  const resetFilter = () => {
    setFilterUnit("");
    setFilterJenis("");
    setFilterGolongan("");
    fetchPegawai(1, perPage, searchTerm, { unit: "", jenis: "", golongan: "" });
  };

  const handleDelete = (nip: string, nama: string) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: `Menghapus data pegawai: ${nama}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await softDeletePegawai(nip);
          Swal.fire("Terhapus!", "Data pegawai telah dinonaktifkan.", "success");
          fetchPegawai(1, perPage, searchTerm, { unit: filterUnit, jenis: filterJenis, golongan: filterGolongan });
        } catch (error) {
          toast.error("Gagal menghapus data.");
        }
      }
    });
  };

  const columns = [
    // ... columns lainnya ...
    {
      name: "Aksi",
      cell: (row: any) => (
        <div className="d-flex gap-2">
          <Button color="primary" size="sm" onClick={() => router.push(`/pegawai/${row.id}`)}>Detail</Button>
          <Button color="warning" size="sm" onClick={() => router.push(`/pegawai/form?nip=${row.nip}`)}>Edit</Button>
          <Button color="danger" size="sm" onClick={() => handleDelete(row.nip, row.nama)}>Hapus</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="page-body">
    <>
      <Breadcrumbs mainTitle="Daftar Pegawai" parent="Kepegawaian" title="Daftar Pegawai" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex align-items-center gap-2">
                    <div className="input-group" style={{ width: "300px" }}>
                      <Input
                        type="text"
                        placeholder="Cari Nama atau NIP..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      />
                      <Button color="primary" onClick={handleSearch}>
                        <Search size={16} />
                      </Button>
                    </div>
                    <Button color="light" onClick={() => setShowFilter(!showFilter)}>
                      <Filter size={16} className="me-1" /> Filter
                    </Button>
                  </div>
                  <div className="d-flex gap-2">
                    <Button color="info">Ekspor Excel</Button>
                    <Button color="success">Tambah Pegawai</Button>
                  </div>
                </div>

                {showFilter && (
                  <Card className="bg-light mb-3">
                    <CardBody>
                      <Row>
                        <Col md="4">
                          <FormGroup>
                            <Label>Unit Kerja</Label>
                            <Input type="select" value={filterUnit} onChange={(e) => setFilterUnit(e.target.value)}>
                              <option value="">Semua Unit Kerja</option>
                              {unit.map((item: any) => (
                                <option key={item.id} value={item.id}>{item.unit_kerja}</option>
                              ))}
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md="3">
                          <FormGroup>
                            <Label>Jenis Pegawai</Label>
                            <Input type="select" value={filterJenis} onChange={(e) => setFilterJenis(e.target.value)}>
                              <option value="">Semua Jenis</option>
                              {pegawaiJenis.map((item: any) => (
                                <option key={item.id} value={item.id}>{item.jenis_pegawai}</option>
                              ))}
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md="3">
                          <FormGroup>
                            <Label>Golongan</Label>
                            <Input type="select" value={filterGolongan} onChange={(e) => setFilterGolongan(e.target.value)}>
                              <option value="">Semua Golongan</option>
                              {golongan.map((item: any) => (
                                <option key={item.id} value={item.id}>{item.golongan}</option>
                              ))}
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md="2" className="d-flex align-items-end mb-3">
                          <div className="d-flex gap-2 w-100">
                            <Button color="primary" className="flex-grow-1" onClick={applyFilter}>Terapkan</Button>
                            <Button color="secondary" onClick={resetFilter}>Reset</Button>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                )}
                
                <DataTable
                  columns={columns}
                  data={data}
                  progressPending={loading}
                  pagination
                  paginationServer
                  paginationTotalRows={totalRows}
                  onChangeRowsPerPage={handlePerRowsChange}
                  onChangePage={handlePageChange}
                  highlightOnHover
                  striped
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
    </div>
  );
};

export default PegawaiList;
