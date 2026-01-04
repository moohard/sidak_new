import React from "react";
import { Row, Col, Card, CardHeader, CardBody, Table, Badge } from "reactstrap";

interface AlertsAndAttendanceProps {
  pensiunData: any[];
  pendingProposals: number;
}

const AlertsAndAttendance = ({ pensiunData, pendingProposals }: AlertsAndAttendanceProps) => {
  return (
    <Row>
      <Col xl="6" className="box-col-12">
        <Card>
          <CardHeader className="d-flex justify-content-between align-items-center">
            <h5>Peringatan Pensiun (6 Bulan ke Depan)</h5>
            <Badge color="danger">{pensiunData?.length || 0} Pegawai</Badge>
          </CardHeader>
          <CardBody>
            <div className="table-responsive">
              <Table borderless size="sm">
                <thead>
                  <tr>
                    <th>Pegawai</th>
                    <th>Tgl Pensiun</th>
                    <th>Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {pensiunData && pensiunData.length > 0 ? (
                    pensiunData.slice(0, 5).map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div>
                              <span className="f-w-600">{item.nama}</span>
                              <br />
                              <small className="text-muted">{item.nip}</small>
                            </div>
                          </div>
                        </td>
                        <td>{item.tgl_pensiun}</td>
                        <td>{item.unit_kerja}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="text-center">Tidak ada data pensiun terdekat.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </Col>
      
      <Col xl="6" className="box-col-12">
        <Card className="notification-card">
          <CardHeader>
            <h5>Status Verifikasi & Kegiatan</h5>
          </CardHeader>
          <CardBody>
            <div className="d-flex align-items-center mb-4 p-3 bg-light rounded">
              <div className="activity-dot-primary"></div>
              <div className="ms-3">
                <h6 className="mb-1">Usulan Menunggu Verifikasi</h6>
                <p className="mb-0 text-muted">Ada <strong>{pendingProposals}</strong> dokumen baru yang perlu divalidasi admin.</p>
              </div>
            </div>
            
            <div className="d-flex align-items-center p-3 bg-light rounded">
              <div className="activity-dot-secondary"></div>
              <div className="ms-3">
                <h6 className="mb-1">Kalender Kegiatan</h6>
                <p className="mb-0 text-muted">Lihat jadwal rapat dan hari libur kepegawaian hari ini.</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default AlertsAndAttendance;
