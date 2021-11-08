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
import { NavLink, useHistory } from "react-router-dom";
import BaseService from "../../services/BaseService";
import ConfigLink from "../../configs";
const Login = (props) => {
  let history = useHistory();
  const [modal, setModal] = useState(false);
  const { buttonLabel, className } = props;
  const toggle = () => setModal(!modal);
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [warning, setWarning] = useState(false);
  const handleRedirect = () => {
    history.push("/Register");
    toggle();
  };
  const handleLogin = async () => {
    const result = await BaseService.post(
      `${ConfigLink.pro}/api/myAccount/GetMyAccountLogin?userName=${userName}&passWord=${passWord}`
    );

    if (result) {
      localStorage.setItem("id", result.id);
      history.push("/");
    } else {
      setWarning(true);
    }
  };
  return (
    <div>
      <Modal isOpen={!modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
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
              <Label style={{ color: "#e50505" }}>Account not defined</Label>
              <br></br>
            </>
          )}
          <NavLink to={"/Register"}>Register Now?</NavLink>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => handleLogin()}>
            Login
          </Button>
          {/* <Button color="secondary" onClick={() => handleRedirect()}>
            Register
          </Button> */}
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default Login;
