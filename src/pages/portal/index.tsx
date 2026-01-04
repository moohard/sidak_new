import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import Breadcrumbs from "../../../CommonElements/Breadcrumbs/Breadcrumbs";
import ProfileWidget from "@/components/Portal/ProfileWidget";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { getPegawaiData } from "@/api/pegawaiService";
import { fetchNews } from "@/redux/slices/cmsSlice";
import { getAbsensiKehadiranList } from "@/api/absensiService";
import NewsCard from "@/components/CMS/NewsCard";
import { toast } from "react-toastify";
import { Clock, CheckCircle, XCircle, AlertCircle } from "react-feather";
import moment from "moment";

const PortalDashboard = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { news, loading: newsLoading } = useAppSelector((state) => state.cms);
  const [profileData, setProfileData] = useState<any>(null);
  const [attendanceSummary, setAttendanceSummary] = useState({
      hadir: 0,
      terlambat: 0,
      tanpaKeterangan: 0,
      izin: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortalData = async () => {
      if (user?.nip) {
        try {
          const [profileRes, attendanceRes] = await Promise.all([
            getPegawaiData(user.nip),
            getAbsensiKehadiranList({ 
                nip: user.nip, 
                bulan: moment().format("MM"), 
                tahun: moment().format("YYYY") 
            })
          ]);
          
          setProfileData(profileRes.data.data);
          
          // Simple logic to aggregate attendance from list if backend doesn't provide summary
          const attData = attendanceRes.data.data || [];
          const summary = {
              hadir: attData.filter((a: any) => a.status === "H").length,
              terlambat: attData.filter((a: any) => a.terlambat > 0).length,
              tanpaKeterangan: attData.filter((a: any) => a.status === "A").length,
              izin: attData.filter((a: any) => ["I", "S", "C"].includes(a.status)).length
          };
          setAttendanceSummary(summary);

        } catch (error) {
          toast.error("Gagal memuat data portal");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPortalData();
    dispatch(fetchNews({ limit: 3 }));
  }, [user, dispatch]);

  const stats = [
    { title: "Hadir Tepat Waktu", value: attendanceSummary.hadir, color: "success", icon: <CheckCircle /> },
    { title: "Terlambat", value: attendanceSummary.terlambat, color: "warning", icon: <Clock /> },
    { title: "Tanpa Keterangan", value: attendanceSummary.tanpaKeterangan, color: "danger", icon: <XCircle /> },
    { title: "Izin/Sakit/Cuti", value: attendanceSummary.izin, color: "info", icon: <AlertCircle /> },
  ];

  return (
    <div className="page-body">
      <Breadcrumbs mainTitle="Portal Pegawai" parent="Home" title="Dashboard" />
      <Container fluid={true}>
        <Row>
          <Col lg="8">
            <ProfileWidget data={profileData} loading={loading} />
            
            <h5 className="mt-4 mb-3">Statistik Kehadiran (Bulan Ini)</h5>
            <Row>
              {stats.map((stat, idx) => (
                <Col md="3" sm="6" key={idx} className="mb-3">
                  <Card className={`text-white bg-${stat.color} shadow-sm`}>
                    <CardBody className="p-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h4 className="mb-0">{stat.value}</h4>
                          <small>{stat.title}</small>
                        </div>
                        <div className="opacity-50">
                          {stat.icon}
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>

            <h5 className="mt-4 mb-3">Berita & Pengumuman Terbaru</h5>
            <Row>
              {news.slice(0, 2).map((item) => (
                <Col md="6" key={item.id}>
                  <NewsCard data={item} />
                </Col>
              ))}
              {news.length === 0 && !newsLoading && <Col>Tidak ada berita terbaru.</Col>}
            </Row>
          </Col>
          
          <Col lg="4">
            <Card className="shadow-sm">
                <CardBody>
                    <h5 className="mb-3">Tautan Cepat</h5>
                    <div className="d-grid gap-2">
                        <Button color="outline-primary" className="text-start">Riwayat Kepegawaian</Button>
                        <Button color="outline-primary" className="text-start">Detail Kehadiran</Button>
                        <Button color="outline-primary" className="text-start">Pengajuan Izin/Cuti</Button>
                        <Button color="outline-primary" className="text-start">Layanan TTE</Button>
                    </div>
                </CardBody>
            </Card>

            <Card className="mt-4 shadow-sm">
                <CardBody>
                    <h5 className="mb-3">Kalender Kerja</h5>
                    <div className="text-center p-4 border rounded bg-light">
                        {/* Placeholder for Mini Calendar */}
                        <p className="mb-0 text-muted">Widget Kalender Segera Hadir</p>
                    </div>
                </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

import { Button } from "reactstrap";
export default PortalDashboard;
