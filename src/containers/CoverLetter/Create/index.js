import React, { useState } from "react";
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
import ConfigLink from "../../../configs";
import { useHistory } from "react-router";
const CreateCoverLetter = () => {
  const sessionLogin = localStorage.getItem("id");
  let history = useHistory();

  const [coverLetter, setCoverLetter] = useState("");
  const handleInsert = async () => {
    const body = {
      coverLetter,
      accountId: parseInt(sessionLogin),
    };
    const result = await BaseService.post(
      `${ConfigLink.pro}/api/MyLetter/AddMyLetter`,
      body
    );
    if (result) {
      history.push("/");
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
              onChange={(value) => setCoverLetter(value.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label className="col-12"></Label>
            <Button onClick={() => handleInsert()}>Submit</Button>
          </FormGroup>
        </Form>
      </Row>
      <Row style={{ height: 100 }}></Row>
    </Container>
  );
};
export default CreateCoverLetter;
