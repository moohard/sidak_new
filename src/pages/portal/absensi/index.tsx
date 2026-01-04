import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane, Badge, Button } from "reactstrap";
import Breadcrumbs from "../../../../CommonElements/Breadcrumbs";
import { useAppSelector } from "@/redux/hooks";
import { getAbsensiKehadiranList, getPengajuanAbsensiList } from "@/api/absensiService";
import DataTable from "react-data-table-component";
import moment from "moment";
import { toast } from "react-toastify";
import classnames from "classnames";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Plus } from "react-feather";
import { useRouter } from "next/router";

const UserAbsensi = () => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("kehadiran");
  const [kehadiranData, setKehadiranData] = useState<any[]>([]);
  const [pengajuanData, setPengajuanData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());

  const fetchKehadiran = async () => {
    if (!user?.nip) return;
    setLoading(true);
    try {
      const res = await getAbsensiKehadiranList({ 
          nip: user.nip,
          bulan: moment(date).format("MM"),
          tahun: moment(date).format("YYYY")
      });
      setKehadiranData(res.data.data || []);
    } catch (error) {
      toast.error("Gagal memuat data kehadiran");
    } finally {
      setLoading(false);
    }
  };

  const fetchPengajuan = async () => {
    if (!user?.nip) return;
    setLoading(true);
    try {
      const res = await getPengajuanAbsensiList({ nip: user.nip });
      setPengajuanData(res.data.data || []);
    } catch (error) {
      toast.error("Gagal memuat data pengajuan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "kehadiran") fetchKehadiran();
    else fetchPengajuan();
  }, [activeTab, user, date]);

  const kehadiranColumns = [
    { name: "Tanggal", selector: (row: any) => moment(row.tanggal).format("DD-MM-YYYY"), sortable: true },
    { name: "Jam Masuk", selector: (row: any) => row.jam_masuk || "-", sortable: true },
    { name: "Jam Pulang", selector: (row: any) => row.jam_pulang || "-", sortable: true },
    { name: "Status", cell: (row: any) => (
        <Badge color={row.status === "H" ? "success" : row.status === "A" ? "danger" : "warning"}>
            {row.status_name || row.status}
        </Badge>
    )},
  ];

  const pengajuanColumns = [
    { name: "Tgl Pengajuan", selector: (row: any) => moment(row.created_at).format("DD-MM-YYYY"), sortable: true },
    { name: "Jenis", selector: (row: any) => row.jenis_absensi_name, sortable: true },
    { name: "Keterangan", selector: (row: any) => row.keterangan, wrap: true },
    { name: "Status", cell: (row: any) => (
        <Badge color={row.status === "approved" ? "success" : row.status === "rejected" ? "danger" : "warning"}>
            {row.status?.toUpperCase()}
        </Badge>
    )},
  ];

  return (
    <div className="page-body">
      <Breadcrumbs mainTitle="Kehadiran & Izin Saya" parent="Portal" title="Absensi" />
      <Container fluid={true}>
        <Row>
          <Col md="4">
            <Card className="shadow-sm">
                <CardBody>
                    <h5 className="mb-3">Kalender Kerja</h5>
                    <Calendar 
                        onChange={(d: any) => setDate(d)} 
                        value={date} 
                        className="w-100 border-0 shadow-none"
                    />
                    <div className="mt-3">
                        <Button color="primary" block onClick={() => router.push("/portal/absensi/pengajuan")}>
                            <Plus size={16} className="me-2" /> Buat Pengajuan Izin
                        </Button>
                    </div>
                </CardBody>
            </Card>
          </Col>
          <Col md="8">
            <Card className="shadow-sm">
              <CardBody>
                <Nav tabs className="border-tab">
                  <NavItem>
                    <NavLink className={classnames({ active: activeTab === "kehadiran" })} onClick={() => setActiveTab("kehadiran")}>Riwayat Kehadiran</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className={classnames({ active: activeTab === "pengajuan" })} onClick={() => setActiveTab("pengajuan")}>Daftar Pengajuan</NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab} className="mt-4">
                  <TabPane tabId={activeTab}>
                    <DataTable
                      columns={activeTab === "kehadiran" ? kehadiranColumns : pengajuanColumns}
                      data={activeTab === "kehadiran" ? kehadiranData : pengajuanData}
                      progressPending={loading}
                      pagination
                      highlightOnHover
                      striped
                    />
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserAbsensi;
