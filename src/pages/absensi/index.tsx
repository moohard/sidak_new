import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col, Card, CardBody, Input, Button, FormGroup, Label } from "reactstrap";
import DataTable from "react-data-table-component";
import { Search, MapPin } from "react-feather";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import dynamic from "next/dynamic";
import Breadcrumbs from "../../../CommonElements/Breadcrumbs/Breadcrumbs";

const MapComponent = dynamic(() => import("../../components/Dashboard/Kepegawaian/DistributionMap"), { ssr: false });
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchAbsensiHarian } from "../../redux/slices/absensiSlice";
import { fetchAllReferensi } from "../../redux/slices/referensiSlice";

const AttendanceMonitoring = () => {
  const dispatch = useAppDispatch();
  const { harian, loading } = useAppSelector((state) => state.absensi);
  const { unit } = useAppSelector((state) => state.referensi);
  
  const [selectedUnit, setSelectedUnit] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [mapModal, setMapModal] = useState(false);
  const [selectedCoord, setSelectedCoord] = useState<{ lat: number; lng: number } | null>(null);

  const toggleMap = (lat?: number, lng?: number) => {
    if (lat && lng) setSelectedCoord({ lat, lng });
    setMapModal(!mapModal);
  };

  useEffect(() => {
    dispatch(fetchAllReferensi());
    dispatch(fetchAbsensiHarian({ unit_id: selectedUnit }));
  }, [dispatch, selectedUnit]);

  const handleSearch = () => {
    dispatch(fetchAbsensiHarian({ unit_id: selectedUnit, search: searchTerm }));
  };

  const columns = [
    {
      name: "Pegawai",
      selector: (row: any) => row.nama,
      sortable: true,
      cell: (row: any) => (
        <div className="d-flex align-items-center py-2">
          <img src={row.foto || "/assets/images/user/user.png"} alt="" className="img-40 rounded-circle me-2" />
          <div>
            <span className="f-w-600">{row.nama}</span>
            <br />
            <small className="text-muted">{row.nip}</small>
          </div>
        </div>
      ),
    },
    {
      name: "Jam Masuk",
      selector: (row: any) => row.jam_masuk,
      sortable: true,
      cell: (row: any) => (
        <span className={row.jam_masuk ? "text-success" : "text-danger"}>
          {row.jam_masuk || "--:--"}
        </span>
      ),
    },
    {
      name: "Jam Pulang",
      selector: (row: any) => row.jam_pulang,
      sortable: true,
      cell: (row: any) => <span>{row.jam_pulang || "--:--"}</span>,
    },
    {
      name: "Status",
      selector: (row: any) => row.status,
      sortable: true,
      cell: (row: any) => (
        <span className={`badge badge-light-${row.status_color || "primary"}`}>
          {row.status_ket || "Hadir"}
        </span>
      ),
    },
    {
      name: "Lokasi",
      cell: (row: any) => (
        <Button color="link" size="sm" onClick={() => toggleMap(row.lat, row.lng)}>
          <MapPin size={14} className="me-1" /> Lihat Peta
        </Button>
      ),
    },
  ];

  return (
    <>
      <Breadcrumbs mainTitle="Monitoring Kehadiran" parent="Absensi" title="Monitoring Harian" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <Row className="mb-4">
                  <Col md="4">
                    <FormGroup>
                      <Label>Unit Kerja</Label>
                      <Input type="select" value={selectedUnit} onChange={(e) => setSelectedUnit(e.target.value)}>
                        <option value="">Semua Unit Kerja</option>
                        {unit.map((item: any) => (
                          <option key={item.id} value={item.id}>{item.unit_kerja}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Cari Pegawai</Label>
                      <div className="input-group">
                        <Input
                          type="text"
                          placeholder="Nama atau NIP..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <Button color="primary" onClick={handleSearch}>
                          <Search size={16} />
                        </Button>
                      </div>
                    </FormGroup>
                  </Col>
                </Row>

                <DataTable
                  columns={columns}
                  data={harian || []}
                  progressPending={loading}
                  pagination
                  highlightOnHover
                  striped
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal isOpen={mapModal} toggle={() => toggleMap()} size="lg">
        <ModalHeader toggle={() => toggleMap()}>Lokasi Presensi</ModalHeader>
        <ModalBody>
          <div style={{ height: "400px", width: "100%" }}>
            {selectedCoord && <MapComponent />}
          </div>
          {selectedCoord && (
            <p className="mt-3 text-muted">
              Koordinat: {selectedCoord.lat}, {selectedCoord.lng}
            </p>
          )}
        </ModalBody>
      </Modal>
    </>
  );
};

export default AttendanceMonitoring;
