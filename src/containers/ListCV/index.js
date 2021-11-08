import React, { useEffect, useState } from "react";
import moment from "moment";
import { GetCVById } from "../GetCVById";
import {
  Table,
  Container,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  FormGroup,
} from "reactstrap";

import { useHistory } from "react-router-dom";
import useSWR from "swr";
import { FaEdit, FaAccusoft } from "react-icons/fa";
import { AiTwotoneDelete, AiFillPlusCircle } from "react-icons/ai";
import ConfigLink from "../../configs";
import BaseService from "../../services/BaseService";

const GetListCV = (props) => {
  let history = useHistory();
  const sessionLogin = localStorage.getItem("id");
  const { data, mutate, isValidating } = useSWR(
    `${ConfigLink.pro}/api/MyCv/GetMyCv?id=${sessionLogin}`
  );

  const { buttonLabel, className } = props;
  const [idDelete, SetIdDelete] = useState(0);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  if (data) {
    // history.push(`/GetCVById/${data[0].id}`);
    // return null;
  }
  const handleDelete = async (id = 0) => {
    if (id !== 0) {
      SetIdDelete(id);
    }
    if (modal) {
      const result = await BaseService.delete(
        `${ConfigLink.pro}/api/MyCv/DeleteMyCv?id=${idDelete}`
      );
      mutate();
    }
    toggle();
  };
  const handLogout = () => {
    localStorage.removeItem("id");
    history.push("/Login");
  };
  if (data) {
    return (
      <>
        <Container>
          <Row>
            <div className="col-12"></div>
            <FormGroup className="row">
              <div className="btn-logout">
                <h1> My CV</h1>
                <div className="center-button">
                  <a className="btn" onClick={() => handLogout()}>
                    Log out
                  </a>
                </div>
              </div>
            </FormGroup>
            <FormGroup>
              <Button onClick={() => history.push(`/Create`)}>Create CV</Button>
              <Button
                style={{ marginLeft: 10 }}
                onClick={() => history.push(`/CoverLetter/Create`)}
              >
                Create CoverLetter
              </Button>
            </FormGroup>
          </Row>
          <Row>
            <Table>
              <thead>
                <tr>
                  <th> Name</th>
                  <th>birthday </th>
                  <th>Position</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item.id}>
                    <td>
                      <a href={`/GetCVById/${item.id}`}>{item.name}</a>
                    </td>
                    <td>{moment(item.birthDate).format("DD/MM/YYYY")}</td>
                    <td>{item.position}</td>
                    <td style={{ justifyItems: "flex-end" }}>
                      <a href={`/Detail/${item.id}`}>
                        <FaEdit size={20} />
                      </a>
                      <AiTwotoneDelete
                        size={20}
                        onClick={() => handleDelete(item.id)}
                      />
                      <a href={`/CoverLetter/Detail/${sessionLogin}`}>
                        <FaAccusoft size={20} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
          <Row></Row>
        </Container>
        <div>
          <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>Delete Record</ModalHeader>
            <ModalBody>Are you sure delete this record.</ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => handleDelete()}>
                Delete
              </Button>
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </>
    );
  } else {
    return null;
  }
};
export default GetListCV;
