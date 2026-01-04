import React from "react";
import { Col, Row, Card, CardBody } from "reactstrap";
import { Users, UserCheck, FileText, Calendar } from "react-feather";

interface SummaryWidgetsProps {
  data: {
    total_pegawai: number;
    pegawai_aktif: number;
    usulan_pending: number;
    hadir_hari_ini: number;
  };
}

const SummaryWidgets = ({ data }: SummaryWidgetsProps) => {
  const widgetItems = [
    {
      title: "Total Pegawai",
      value: data?.total_pegawai || 0,
      icon: <Users className="font-primary" />,
      color: "primary",
    },
    {
      title: "Pegawai Aktif",
      value: data?.pegawai_aktif || 0,
      icon: <UserCheck className="font-success" />,
      color: "success",
    },
    {
      title: "Usulan Pending",
      value: data?.usulan_pending || 0,
      icon: <FileText className="font-warning" />,
      color: "warning",
    },
    {
      title: "Hadir Hari Ini",
      value: data?.hadir_hari_ini || 0,
      icon: <Calendar className="font-info" />,
      color: "info",
    },
  ];

  return (
    <Row>
      {widgetItems.map((item, index) => (
        <Col xl={3} sm={6} key={index}>
          <Card className="widget-1">
            <CardBody>
              <div className="widget-content">
                <div className={`widget-round ${item.color}`}>
                  <div className="bg-round">
                    {item.icon}
                  </div>
                </div>
                <div>
                  <h4>{item.value}</h4>
                  <span className="f-light">{item.title}</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default SummaryWidgets;
