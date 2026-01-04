import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, Row, Col, Card, CardBody, Table, Input, Button } from "reactstrap";
import Breadcrumbs from "../../../../../CommonElements/Breadcrumbs/Breadcrumbs";
import * as rbacApi from "../../../../api/rbacService";
import { toast } from "react-toastify";

const PermissionMatrix = () => {
  const router = useRouter();
  const { id } = router.query;
  const [modules, setModules] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const loadData = async () => {
        setLoading(true);
        try {
          const modRes = await rbacApi.getModulList();
          setModules(modRes.data.data || []);
          
          const permRes = await rbacApi.getGroupModul(id as string);
          // Transform permission data to a map for easy checkbox handling
          const permMap: any = {};
          permRes.data.data.forEach((p: any) => {
            permMap[p.modul_id] = {
              view: p.can_view,
              create: p.can_create,
              update: p.can_update,
              delete: p.can_delete,
              verify: p.can_verify,
            };
          });
          setPermissions(permMap);
        } catch (error) {
          toast.error("Gagal memuat matriks hak akses.");
        } finally {
          setLoading(false);
        }
      };
      loadData();
    }
  }, [id]);

  const handleToggle = (modulId: number, type: string) => {
    setPermissions((prev: any) => ({
      ...prev,
      [modulId]: {
        ...prev[modulId],
        [type]: !prev[modulId]?.[type]
      }
    }));
  };

  const handleSave = async () => {
    try {
      await rbacApi.updateGroupModul(id as string, permissions);
      toast.success("Hak akses berhasil diperbarui.");
    } catch (error) {
      toast.error("Gagal menyimpan perubahan.");
    }
  };

  return (
    <>
      <Breadcrumbs mainTitle="Matriks Hak Akses" parent="RBAC" title="Set Permissions" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <Table responsive bordered>
                  <thead className="table-light">
                    <tr>
                      <th>Modul / Menu</th>
                      <th className="text-center">Lihat</th>
                      <th className="text-center">Tambah</th>
                      <th className="text-center">Ubah</th>
                      <th className="text-center">Hapus</th>
                      <th className="text-center">Verifikasi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modules.map((mod, idx) => (
                      <tr key={idx}>
                        <td>{mod.modul_name}</td>
                        {["view", "create", "update", "delete", "verify"].map((type) => (
                          <td key={type} className="text-center">
                            <Input
                              type="checkbox"
                              checked={!!permissions[mod.id]?.[type]}
                              onChange={() => handleToggle(mod.id, type)}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="text-end mt-4">
                  <Button color="secondary" className="me-2" onClick={() => router.back()}>Kembali</Button>
                  <Button color="primary" onClick={handleSave}>Simpan Perubahan</Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PermissionMatrix;
