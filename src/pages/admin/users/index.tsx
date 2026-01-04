import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, Button, Table, Badge } from "reactstrap";
import Breadcrumbs from "../../../../CommonElements/Breadcrumbs/Breadcrumbs";
import * as rbacApi from "../../../api/rbacService";
import { toast } from "react-toastify";
import { Lock, UserX, UserCheck, Edit } from "react-feather";

const UserManagement = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await rbacApi.getUserResetList(); // Using this as base user list for now
      setUsers(res.data.data || []);
    } catch (error) {
      toast.error("Gagal memuat data pengguna.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleResetPassword = (id: string | number) => {
    toast.info("Fitur reset password akan segera diimplementasikan.");
  };

  return (
    <>
      <Breadcrumbs mainTitle="Manajemen User" parent="Admin" title="Daftar Pengguna" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div className="text-end mb-3">
                  <Button color="primary">Tambah Akun Baru</Button>
                </div>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>Nama Pengguna</th>
                      <th>Username</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? users.map((user, idx) => (
                      <tr key={idx}>
                        <td>{user.nama}<br/><small className="text-muted">{user.nip}</small></td>
                        <td>{user.username}</td>
                        <td><Badge color="info">{user.group_name || "Pegawai"}</Badge></td>
                        <td>
                          {user.is_active ? <Badge color="success">Aktif</Badge> : <Badge color="danger">Non-aktif</Badge>}
                        </td>
                        <td>
                          <Button color="warning" size="sm" title="Reset Password" onClick={() => handleResetPassword(user.id)}>
                            <Lock size={14} />
                          </Button>
                          <Button color="info" size="sm" className="ms-2" title="Edit Akun">
                            <Edit size={14} />
                          </Button>
                          {user.is_active ? (
                            <Button color="danger" size="sm" className="ms-2" title="Nonaktifkan">
                              <UserX size={14} />
                            </Button>
                          ) : (
                            <Button color="success" size="sm" className="ms-2" title="Aktifkan">
                              <UserCheck size={14} />
                            </Button>
                          )}
                        </td>
                      </tr>
                    )) : <tr><td colSpan={5} className="text-center">Tidak ada data pengguna.</td></tr>}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserManagement;
