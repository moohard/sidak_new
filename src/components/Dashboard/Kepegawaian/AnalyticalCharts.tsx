import React from "react";
import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface AnalyticalChartsProps {
  golonganData: any[];
  pendidikanData: any[];
  genderData: any[];
}

const AnalyticalCharts = ({ golonganData, pendidikanData, genderData }: AnalyticalChartsProps) => {
  const router = useRouter();

  const handleChartClick = (category: string, value: string) => {
    // Basic drill-down: redirect to employee list with filter
    router.push({
      pathname: "/pegawai",
      query: { [category]: value },
    });
  };

  const donutOptions: any = {
    chart: {
      type: "donut",
      events: {
        dataPointSelection: (event: any, chartContext: any, config: any) => {
          const label = config.w.config.labels[config.dataPointIndex];
          handleChartClick("golongan", label);
        },
      },
    },
    labels: golonganData?.map(item => item.name) || [],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: { width: 200 },
        legend: { position: "bottom" }
      }
    }],
    colors: ["#7366ff", "#f73164", "#51bb25", "#a927f9", "#f8d62b"]
  };

  const barOptions: any = {
    chart: {
      type: "bar",
      events: {
        dataPointSelection: (event: any, chartContext: any, config: any) => {
          const label = config.w.config.xaxis.categories[config.dataPointIndex];
          handleChartClick("pendidikan", label);
        },
      },
    },
    plotOptions: {
      bar: { borderRadius: 4, horizontal: true }
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: pendidikanData?.map(item => item.name) || [],
    },
    colors: ["#7366ff"]
  };

  const seriesDonut = golonganData?.map(item => item.value) || [];
  const seriesBar = [{
    name: "Jumlah",
    data: pendidikanData?.map(item => item.value) || []
  }];

  return (
    <Row>
      <Col xl="6" className="box-col-12">
        <Card>
          <CardHeader>
            <h5>Komposisi Golongan</h5>
          </CardHeader>
          <CardBody>
            <div id="chart-golongan">
              <ReactApexChart options={donutOptions} series={seriesDonut} type="donut" height={350} />
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col xl="6" className="box-col-12">
        <Card>
          <CardHeader>
            <h5>Komposisi Pendidikan</h5>
          </CardHeader>
          <CardBody>
            <div id="chart-pendidikan">
              <ReactApexChart options={barOptions} series={seriesBar} type="bar" height={350} />
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default AnalyticalCharts;
