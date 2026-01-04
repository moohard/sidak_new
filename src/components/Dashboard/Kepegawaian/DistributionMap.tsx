import React from "react";
import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icon issue
const icon = L.icon({
  iconUrl: "/assets/images/marker-icon.png",
  shadowUrl: "/assets/images/marker-shadow.png",
});

const DistributionMap = () => {
  const center: [number, number] = [-0.4718, 117.1605]; // Coordinate for Samarinda/Unmul

  return (
    <Row>
      <Col sm="12">
        <Card>
          <CardHeader>
            <h5>Peta Sebaran Unit Kerja</h5>
          </CardHeader>
          <CardBody>
            <div id="map-container" style={{ height: "400px", width: "100%" }}>
              <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={center} icon={icon}>
                  <Popup>
                    Universitas Mulawarman <br /> Kampus Gunung Kelua.
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default DistributionMap;
