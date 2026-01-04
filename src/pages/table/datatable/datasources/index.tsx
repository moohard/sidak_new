import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import HtmlSourcedData from "@/components/Table/DataTable/DataSources/HtmlSourcedData";
import AjaxSourcedData from "@/components/Table/DataTable/DataSources/AjaxSourcedData";
import JavaScriptSourcedData from "@/components/Table/DataTable/DataSources/JavaScriptSourcedData";
import ServerSideProcessing from "@/components/Table/DataTable/DataSources/ServerSideProcessing";
import { DATASourceDataTables, DataTables } from "utils/Constant";

const DataSources = () => {
  return (
    <div className="page-body">
      <Breadcrumbs title={DATASourceDataTables} mainTitle={DATASourceDataTables} parent={DataTables}/>
      <Container fluid={true}>
        <Row>
            <HtmlSourcedData />
            <AjaxSourcedData />
            <JavaScriptSourcedData />
            <ServerSideProcessing />
        </Row>
      </Container>
    </div>
  );
};

export default DataSources;
