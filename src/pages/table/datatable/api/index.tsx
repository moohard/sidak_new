import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import AddRows from "@/components/Table/DataTable/Api/AddRows";
import ChildRows from "@/components/Table/DataTable/Api/ChildRows";
import RowSelectionAndDeletion from "@/components/Table/DataTable/Api/RowSelectionAndDeletion";
import CustomFiltering from "@/components/Table/DataTable/Api/CustomFiltering";
import { APIHeading, DataTables } from "utils/Constant";

const Api = () => {
  return (
    <div className="page-body">
      <Breadcrumbs title={APIHeading} mainTitle={APIHeading} parent={DataTables} />
      <Container fluid={true}>
        <Row>
            <AddRows />
            <ChildRows />
            <RowSelectionAndDeletion />
            <CustomFiltering />
        </Row>
      </Container>
    </div>
  );
};

export default Api;
