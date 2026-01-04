import React from "react";
import { Card, CardBody, Row, Col, Media } from "reactstrap";
import { User, Mail, Smartphone, MapPin, Briefcase } from "react-feather";

interface ProfileWidgetProps {
  data: any;
  loading: boolean;
}

const ProfileWidget: React.FC<ProfileWidgetProps> = ({ data, loading }) => {
  if (loading) return <div>Memuat Profil...</div>;
  if (!data) return <div>Data tidak ditemukan</div>;

  return (
    <Card className="profile-widget shadow-sm">
      <CardBody>
        <div className="d-flex align-items-center mb-4">
          <div className="flex-shrink-0 me-3">
            <img 
              src={data.foto_url || "/assets/images/dashboard/user.png"} 
              alt="Profile" 
              className="rounded-circle"
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
          </div>
          <div className="flex-grow-1">
            <h4 className="mb-1">{data.nama}</h4>
            <p className="text-muted mb-0">{data.nip}</p>
            <Badge color="primary" pill>{data.jabatan_akhir || "Jabatan tidak tersedia"}</Badge>
          </div>
        </div>
        <hr />
        <Row className="text-muted g-3">
          <Col sm="6">
            <div className="d-flex align-items-center">
              <Mail size={16} className="me-2" />
              <span>{data.email || "-"}</span>
            </div>
          </Col>
          <Col sm="6">
            <div className="d-flex align-items-center">
              <Smartphone size={16} className="me-2" />
              <span>{data.hp || "-"}</span>
            </div>
          </Col>
          <Col sm="6">
            <div className="d-flex align-items-center">
              <Briefcase size={16} className="me-2" />
              <span>{data.unit_kerja_akhir || "-"}</span>
            </div>
          </Col>
          <Col sm="6">
            <div className="d-flex align-items-center">
              <MapPin size={16} className="me-2" />
              <span>{data.alamat || "-"}</span>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

import { Badge } from "reactstrap";
export default ProfileWidget;
