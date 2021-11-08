import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Container,
  Row,
} from "reactstrap";
import BaseService from "../../../services/BaseService";
import { useHistory } from "react-router";
import ConfigLink from "../../../configs";
const DetailCoverLetter = () => {
  let history = useHistory();
  const [coverLetter, setCoverLetter] = useState("");
  const [id, SetId] = useState(0);
  const sessionLogin = localStorage.getItem("id");

  useEffect(async () => {
    const result = await BaseService.get(
      `${ConfigLink.pro}/api/myLetter/GetMyLetterById?id=${sessionLogin}`
    );
    const { id, coverLetter } = result;
    SetId(id);
    setCoverLetter(coverLetter);
  }, []);
  const handleUpdate = async () => {
    const body = {
      id,
      coverLetter,
      accountId: parseInt(sessionLogin),
    };
    const result = await BaseService.put(
      `${ConfigLink.pro}/api/myLetter/EditMyLetter`,
      body
    );
    if (result) {
      history.push(`/`);
    }
  };
  return (
    <Container>
      <Row>
        <h1> Create</h1>
      </Row>
      <Row>
        <Form>
          <FormGroup>
            <Label>Cover Letter</Label>
            <Input
              style={{ height: 500 }}
              type="textarea"
              value={coverLetter}
              onChange={(value) => setCoverLetter(value.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label className="col-12"></Label>
            <Button onClick={() => handleUpdate()}>Submit</Button>
          </FormGroup>
        </Form>
      </Row>
      <Row style={{ height: 100 }}></Row>
    </Container>
  );
};
export default DetailCoverLetter;
