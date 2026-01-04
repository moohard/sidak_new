import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import RowCreateCallback from "@/components/Table/DataTable/AdvanceInit/RowCreateCallback";
import NoSsr from "utils/NoSsr";
import StockResult from "@/components/Table/DataTable/AdvanceInit/StockResult";
import { AdvanceInitHeading, DataTables } from "utils/Constant";

const AdvanceInit = () => {
  return (
    <div className="page-body">
      <Breadcrumbs title={AdvanceInitHeading} mainTitle={AdvanceInitHeading} parent={DataTables}/>
      <Container fluid={true}>
        <Row>
            <StockResult />
            <RowCreateCallback />
        </Row>
      </Container>
    </div>
  );
};

export default AdvanceInit;
