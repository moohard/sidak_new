import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, Row, Col, Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane, Table, Button } from "reactstrap";
import classnames from "classnames";
import Breadcrumbs from "../../../CommonElements/Breadcrumbs/Breadcrumbs";
import { getPegawaiDetail } from "../../api/pegawaiService";
import axiosInstance from "../../utils/axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchAllRiwayat, clearRiwayat } from "../../redux/slices/riwayatSlice";
import { fetchTTEHistory } from "../../redux/slices/tteSlice";
import CareerTimeline from "../../components/pegawai/CareerTimeline";
import { useReactToPrint } from "react-to-print";
import BiodataPDF from "../../components/pegawai/BiodataPDF";

const PegawaiDetail = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id } = router.query;
  const [activeTab, setActiveTab] = useState("1");
  const [riwayatView, setRiwayatView] = useState("table");
  const [pegawai, setPegawai] = useState<any>(null);
  const [keluarga, setKeluarga] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { jabatan, pangkat, pendidikan, diklat, tandaJasa, loading: loadingRiwayat } = useAppSelector((state) => state.riwayat);
  const { history: tteHistory } = useAppSelector((state) => state.tte);

  useEffect(() => {
    if (id) {
      const fetchAllData = async () => {
        try {
          const detailRes = await getPegawaiDetail(id as string);
          const dataPegawai = detailRes.data.data;
          setPegawai(dataPegawai);
          
          if (dataPegawai.nip) {
            dispatch(fetchAllRiwayat(dataPegawai.nip));
            dispatch(fetchTTEHistory({ nip: dataPegawai.nip }));
            const keluargaRes = await axiosInstance.get(`/kepegawaian/pegawaikeluarga/list/${dataPegawai.nip}`);
            setKeluarga(keluargaRes.data.data || []);
          }
        } catch (error) {
          console.error("Failed to fetch data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchAllData();
    }
    return () => {
      dispatch(clearRiwayat());
    };
  }, [id, dispatch]);

  if (loading) return <div className="p-5 text-center">Loading...</div>;
  if (!pegawai) return <div className="p-5 text-center">Pegawai tidak ditemukan.</div>;

  return (
    <>
      <Breadcrumbs mainTitle="Detail Pegawai" parent="Kepegawaian" title={pegawai.nama} />
      <Container fluid={true}>
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <div className="d-flex justify-content-between align-items-start mb-4">
                  <div className="d-flex align-items-center">
                    <img
                      src={pegawai.foto || "/assets/images/user/user.png"}
                      alt={pegawai.nama}
                      className="img-100 b-r-10 me-3"
                    />
                    <div>
                      <h4 className="mb-1">{pegawai.nama}</h4>
                      <p className="text-muted mb-0">{pegawai.nip} | {pegawai.unit_kerja}</p>
                    </div>
                  </div>
                  <Button color="info" outline onClick={handlePrint}>Cetak Biodata (PDF)</Button>
                </div>

                <div style={{ display: "none" }}>
                  <BiodataPDF 
                    ref={componentRef} 
                    pegawai={pegawai} 
                    jabatan={jabatan} 
                    pangkat={pangkat} 
                    pendidikan={pendidikan} 
                    keluarga={keluarga} 
                  />
                </div>

                <Nav tabs className="border-tab nav-primary">
                  <NavItem>
                    <NavLink className={classnames({ active: activeTab === "1" })} onClick={() => setActiveTab("1")} style={{ cursor: "pointer" }}>Profil Utama</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className={classnames({ active: activeTab === "2" })} onClick={() => setActiveTab("2")} style={{ cursor: "pointer" }}>Keluarga</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className={classnames({ active: activeTab === "3" })} onClick={() => setActiveTab("3")} style={{ cursor: "pointer" }}>Riwayat</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className={classnames({ active: activeTab === "4" })} onClick={() => setActiveTab("4")} style={{ cursor: "pointer" }}>Arsip Digital</NavLink>
                  </NavItem>
                </Nav>

                <TabContent activeTab={activeTab} className="mt-4">
                  <TabPane tabId="1">
                    <Row>
                      <Col sm="6">
                        <h6>Data Pribadi</h6>
                        <Table borderless size="sm">
                          <tbody>
                            <tr><td width="30%">Tempat, Tgl Lahir</td><td>: {pegawai.tempat_lahir}, {pegawai.tgl_lahir}</td></tr>
                            <tr><td>Jenis Kelamin</td><td>: {pegawai.jenis_kelamin}</td></tr>
                            <tr><td>Agama</td><td>: {pegawai.agama}</td></tr>
                            <tr><td>Status Kawin</td><td>: {pegawai.status_kawin}</td></tr>
                          </tbody>
                        </Table>
                      </Col>
                      <Col sm="6">
                        <h6>Kepegawaian</h6>
                        <Table borderless size="sm">
                          <tbody>
                            <tr><td width="30%">Pangkat/Gol</td><td>: {pegawai.pangkat} ({pegawai.golongan})</td></tr>
                            <tr><td>Jabatan</td><td>: {pegawai.jabatan}</td></tr>
                            <tr><td>TMT Pegawai</td><td>: {pegawai.tmt_pegawai}</td></tr>
                            <tr><td>Jenis Pegawai</td><td>: {pegawai.jenis_pegawai}</td></tr>
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                  </TabPane>

                  <TabPane tabId="2">
                    <h5>Data Keluarga</h5>
                    <Table responsive striped size="sm">
                      <thead>
                        <tr>
                          <th>Nama</th>
                          <th>Hubungan</th>
                          <th>Tempat, Tgl Lahir</th>
                          <th>Pekerjaan</th>
                        </tr>
                      </thead>
                      <tbody>
                        {keluarga.length > 0 ? keluarga.map((item, idx) => (
                          <tr key={idx}>
                            <td>{item.nama}</td>
                            <td>{item.hubungan_keluarga}</td>
                            <td>{item.tempat_lahir}, {item.tgl_lahir}</td>
                            <td>{item.pekerjaan}</td>
                          </tr>
                        )) : (
                          <tr><td colSpan={4} className="text-center">Tidak ada data keluarga.</td></tr>
                        )}
                      </tbody>
                    </Table>
                  </TabPane>

                  <TabPane tabId="3">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5>Riwayat Kepegawaian</h5>
                      <div className="btn-group">
                        <Button color="primary" size="sm" outline={riwayatView !== "table"} onClick={() => setRiwayatView("table")}>Tabel</Button>
                        <Button color="primary" size="sm" outline={riwayatView !== "timeline"} onClick={() => setRiwayatView("timeline")}>Timeline</Button>
                      </div>
                    </div>

                    {riwayatView === "table" ? (
                      <>
                        <div className="mb-4">
                          <h6>Riwayat Jabatan</h6>
                          <Table responsive striped size="sm">
                            <thead>
                              <tr><th>Jabatan</th><th>Unit Kerja</th><th>TMT</th><th>No. SK</th><th>Dokumen</th></tr>
                            </thead>
                            <tbody>
                              {jabatan.length > 0 ? jabatan.map((item, idx) => (
                                <tr key={idx}>
                                  <td>{item.jabatan}</td>
                                  <td>{item.unit_kerja}</td>
                                  <td>{item.tmt_jabatan}</td>
                                  <td>{item.no_sk}</td>
                                  <td>
                                    {item.arsip_id && (
                                      <Button color="link" size="sm" onClick={() => window.open(`${process.env.NEXT_PUBLIC_API_URL}/kepegawaian/pegawai_arsip/file/${item.arsip_id}`, "_blank")}>
                                        Lihat
                                      </Button>
                                    )}
                                  </td>
                                </tr>
                              )) : <tr><td colSpan={5} className="text-center">Tidak ada data.</td></tr>}
                            </tbody>
                          </Table>
                        </div>

                        <div className="mb-4">
                          <h6>Riwayat Pangkat</h6>
                          <Table responsive striped size="sm">
                            <thead>
                              <tr><th>Golongan</th><th>Pangkat</th><th>TMT</th><th>No. SK</th><th>Dokumen</th></tr>
                            </thead>
                            <tbody>
                              {pangkat.length > 0 ? pangkat.map((item, idx) => (
                                <tr key={idx}>
                                  <td>{item.golongan}</td>
                                  <td>{item.pangkat}</td>
                                  <td>{item.tmt_pangkat}</td>
                                  <td>{item.no_sk}</td>
                                  <td>
                                    {item.arsip_id && (
                                      <Button color="link" size="sm" onClick={() => window.open(`${process.env.NEXT_PUBLIC_API_URL}/kepegawaian/pegawai_arsip/file/${item.arsip_id}`, "_blank")}>
                                        Lihat
                                      </Button>
                                    )}
                                  </td>
                                </tr>
                              )) : <tr><td colSpan={5} className="text-center">Tidak ada data.</td></tr>}
                            </tbody>
                          </Table>
                        </div>

                        <div className="mb-4">
                          <h6>Riwayat Pendidikan</h6>
                          <Table responsive striped size="sm">
                            <thead>
                              <tr><th>Tingkat</th><th>Sekolah/Universitas</th><th>Tahun Lulus</th><th>No. Ijazah</th><th>Dokumen</th></tr>
                            </thead>
                            <tbody>
                              {pendidikan.length > 0 ? pendidikan.map((item, idx) => (
                                <tr key={idx}>
                                  <td>{item.tingkat_pendidikan}</td>
                                  <td>{item.nama_sekolah}</td>
                                  <td>{item.thn_lulus}</td>
                                  <td>{item.no_ijazah}</td>
                                  <td>
                                    {item.arsip_id && (
                                      <Button color="link" size="sm" onClick={() => window.open(`${process.env.NEXT_PUBLIC_API_URL}/kepegawaian/pegawai_arsip/file/${item.arsip_id}`, "_blank")}>
                                        Lihat
                                      </Button>
                                    )}
                                  </td>
                                </tr>
                              )) : <tr><td colSpan={5} className="text-center">Tidak ada data.</td></tr>}
                            </tbody>
                          </Table>
                        </div>
                      </>
                    ) : (
                      <CareerTimeline jabatan={jabatan} pangkat={pangkat} />
                    )}
                  </TabPane>

                  <TabPane tabId="4">
                    <h5>Arsip Digital Terverifikasi</h5>
                    <Table responsive striped size="sm">
                      <thead>
                        <tr>
                          <th>Nama Dokumen</th>
                          <th>No. Dokumen</th>
                          <th>Tgl TTE</th>
                          <th>Pejabat TTD</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tteHistory.length > 0 ? tteHistory.map((item, idx) => (
                          <tr key={idx}>
                            <td>{item.jenis_dokumen}</td>
                            <td>{item.no_dokumen}</td>
                            <td>{item.signed_at}</td>
                            <td>{item.pejabat_nama}</td>
                            <td>
                              <Button color="primary" size="sm" outline onClick={() => window.open(`${process.env.NEXT_PUBLIC_API_URL}/kepegawaian/rwpegawaittd/${item.id}/file`, "_blank")}>
                                Unduh / Lihat
                              </Button>
                            </td>
                          </tr>
                        )) : <tr><td colSpan={5} className="text-center">Belum ada dokumen digital terverifikasi.</td></tr>}
                      </tbody>
                    </Table>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PegawaiDetail;