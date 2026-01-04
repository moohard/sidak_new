import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import Breadcrumbs from "../../../../CommonElements/Breadcrumbs/Breadcrumbs";
import { useAppSelector } from "@/redux/hooks";
import { getRwJabatanList, getRwPangkatList, getRwPendidikanList, getRwDiklatList } from "@/api/riwayatService";
import DataTable from "react-data-table-component";
import moment from "moment";
import { toast } from "react-toastify";
import classnames from "classnames";

const UserRiwayat = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("jabatan");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (tab: string) => {
    if (!user?.nip) return;
    setLoading(true);
    try {
      let res;
      const params = { nip: user.nip };
      switch (tab) {
        case "jabatan": res = await getRwJabatanList(params); break;
        case "pangkat": res = await getRwPangkatList(params); break;
        case "pendidikan": res = await getRwPendidikanList(params); break;
        case "diklat": res = await getRwDiklatList(params); break;
        default: return;
      }
      setData(res.data.data || []);
    } catch (error) {
      toast.error(`Gagal memuat riwayat ${tab}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab, user]);

  const columns: any = {
    jabatan: [
      { name: "Jabatan", selector: (row: any) => row.jabatan_name, sortable: true },
      { name: "Unit Kerja", selector: (row: any) => row.unit_kerja_name, sortable: true },
      { name: "TMT", selector: (row: any) => moment(row.tmt_jabatan).format("DD-MM-YYYY"), sortable: true },
    ],
    pangkat: [
      { name: "Golongan", selector: (row: any) => row.golongan_name, sortable: true },
      { name: "Pangkat", selector: (row: any) => row.pangkat_name, sortable: true },
      { name: "TMT", selector: (row: any) => moment(row.tmt_pangkat).format("DD-MM-YYYY"), sortable: true },
    ],
    pendidikan: [
      { name: "Jenjang", selector: (row: any) => row.pendidikan_name, sortable: true },
      { name: "Nama Sekolah/Univ", selector: (row: any) => row.nama_sekolah, sortable: true },
      { name: "Tahun Lulus", selector: (row: any) => row.tahun_lulus, sortable: true },
    ],
    diklat: [
      { name: "Nama Diklat", selector: (row: any) => row.nama_diklat, sortable: true },
      { name: "Penyelenggara", selector: (row: any) => row.penyelenggara, sortable: true },
      { name: "Tahun", selector: (row: any) => row.tahun, sortable: true },
    ]
  };

  return (
    <div className="page-body">
      <Breadcrumbs mainTitle="Riwayat Kepegawaian Saya" parent="Portal" title="Riwayat" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <Nav tabs className="border-tab">
                  <NavItem>
                    <NavLink className={classnames({ active: activeTab === "jabatan" })} onClick={() => setActiveTab("jabatan")}>Riwayat Jabatan</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className={classnames({ active: activeTab === "pangkat" })} onClick={() => setActiveTab("pangkat")}>Riwayat Pangkat</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className={classnames({ active: activeTab === "pendidikan" })} onClick={() => setActiveTab("pendidikan")}>Pendidikan</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className={classnames({ active: activeTab === "diklat" })} onClick={() => setActiveTab("diklat")}>Diklat</NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab} className="mt-4">
                  <TabPane tabId={activeTab}>
                    <DataTable
                      columns={columns[activeTab]}
                      data={data}
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

export default UserRiwayat;
