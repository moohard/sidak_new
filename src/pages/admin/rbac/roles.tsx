import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, Button, Table } from "reactstrap";
import Breadcrumbs from "../../../../CommonElements/Breadcrumbs";
import * as rbacApi from "../../../api/rbacService";
import { toast } from "react-toastify";
import { Settings, Edit, Trash } from "react-feather";
import { useRouter } from "next/router";

const RoleManagement = () => {
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const res = await rbacApi.getGroupsList();
      setGroups(res.data.data || []);
    } catch (error) {
      toast.error("Gagal memuat data grup.");
    } finally {
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <div className="page-body">
    <>
      <Breadcrumbs mainTitle="Manajemen Role" parent="RBAC" title="Role & Groups" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div className="text-end mb-3">
                  <Button color="primary">Tambah Role Baru</Button>
                </div>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>Nama Role</th>
                      <th>Kode Group</th>
                      <th>Jumlah User</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groups.length > 0 ? groups.map((group, idx) => (
                      <tr key={idx}>
                        <td>{group.group_name}</td>
                        <td>{group.group_code}</td>
                        <td>{group.user_count || 0}</td>
                        <td>
                          <Button color="info" size="sm" onClick={() => router.push(`/admin/rbac/permissions/${group.id}`)}>
                            <Settings size={14} className="me-1" /> Hak Akses
                          </Button>
                          <Button color="warning" size="sm" className="ms-2">
                            <Edit size={14} />
                          </Button>
                          <Button color="danger" size="sm" className="ms-2">
                            <Trash size={14} />
                          </Button>
                        </td>
                      </tr>
                    )) : <tr><td colSpan={4} className="text-center">Tidak ada data.</td></tr>}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
    </div>
  );
};

export default RoleManagement;
