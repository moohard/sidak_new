import Breadcrumbs from "CommonElements/Breadcrumbs";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Input, FormGroup, Label } from "reactstrap";
import { Dashboard } from "utils/Constant";
import SummaryWidgets from "@/components/Dashboard/Kepegawaian/SummaryWidgets";
import AnalyticalCharts from "@/components/Dashboard/Kepegawaian/AnalyticalCharts";
import AlertsAndAttendance from "@/components/Dashboard/Kepegawaian/AlertsAndAttendance";
import dynamic from "next/dynamic";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const DistributionMap = dynamic(() => import("@/components/Dashboard/Kepegawaian/DistributionMap"), { ssr: false });

const Default = () => {
  const dispatch = useAppDispatch();
  const { dashboard, pangkat, pendidikan, pensiun, loading } = useAppSelector((state) => state.rekap);
  const { unit } = useAppSelector((state) => state.referensi);
  const [selectedUnit, setSelectedUnit] = useState("");

  useEffect(() => {
    dispatch(fetchAllReferensi());
    dispatch(fetchRekapDashboard({ unit_id: selectedUnit }));
    dispatch(fetchRekapGolongan({ unit_id: selectedUnit }));
    dispatch(fetchRekapPendidikan({ unit_id: selectedUnit }));
    dispatch(fetchMonitoringPensiun({ unit_id: selectedUnit }));
  }, [dispatch, selectedUnit]);

  return (
    <div className="page-body">
      <Breadcrumbs
        title="Dashboard Kepegawaian"
        mainTitle="Dashboard"
        parent={Dashboard}
      />
      <Container fluid={true}>
        <Row className="mb-4">
          <Col md="4">
            <FormGroup>
              <Label>Filter Unit Kerja (Global)</Label>
              <Input type="select" value={selectedUnit} onChange={(e) => setSelectedUnit(e.target.value)}>
                <option value="">Semua Unit Kerja</option>
                {unit.map((item: any) => (
                  <option key={item.id} value={item.id}>{item.unit_kerja}</option>
                ))}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        
        <SummaryWidgets data={dashboard} />
        
        <div className="mt-4">
          <AnalyticalCharts 
            golonganData={pangkat} 
            pendidikanData={pendidikan} 
            genderData={[]} 
          />
        </div>

        <div className="mt-4">
          <AlertsAndAttendance 
            pensiunData={pensiun} 
            pendingProposals={dashboard?.usulan_pending || 0} 
          />
        </div>

        <div className="mt-4">
          <DistributionMap />
        </div>
      </Container>
    </div>
  );
};

export default Default;
