import React from "react";
import {
  Button,
  NavItem,
  FormGroup,
  Form,
  Label,
  Input,
  Container,
  Row,
  Col,
  Badge,
  Progress,
} from "reactstrap";
import { useParams } from "react-router-dom";
import moment from "moment";
import useSWR from "swr";
import ConfigLink from "../../../configs";
import { Parser } from "html-to-react";
const CoverLetter = () => {
  let { Id } = useParams();
  const { data, error } = useSWR(
    `${ConfigLink.pro}/api/myLetter/GetMyLetterById?id=${Id}`,
    { refreshInterval: 1500 }
  );
  if (data) {
    return (
      <Container>
        <Row className="pd-20 cover-letter">
          <div className="main-margin">
            {moment(new Date()).format("DD/MM/YYYY")}
            {Parser().parse(data.coverLetter)}
          </div>
        </Row>
        <Row style={{ height: 20 }}></Row>
      </Container>
    );
  }
  return null;
};
export default CoverLetter;
