import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import BaseService from "../../services/BaseService";
import ConfigLink from "../../configs";

const Register = (props) => {
  let history = useHistory();
  const [modal, setModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [warning, setWarning] = useState(false);

  const { buttonLabel, className } = props;
  const toggle = () => setModal(!modal);
  const handleRegister = async () => {
    if (userName !== "" && passWord !== "") {
      const body = {
        userName,
        passWord,
      };
      const result = await BaseService.post(
        `${ConfigLink.pro}/api/MyAccount/AddMyAccount`,
        body
      );
      if (result) {
        history.push("/");
        toggle();
      }
    } else {
      setWarning(true);
    }
  };
  return (
    <div>
      <Modal isOpen={!modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          <Label>UserName</Label>
          <Input
            value={userName}
            onChange={(value) => setUserName(value.target.value)}
          ></Input>
          <Label>Password</Label>
          <Input
            value={passWord}
            type="password"
            onChange={(value) => setPassWord(value.target.value)}
          ></Input>
          {warning && (
            <>
              <Label style={{ color: "#e50505" }}>Register dont success</Label>
              <br></br>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => handleRegister()}>
            Register
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default Register;
