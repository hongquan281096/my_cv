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
import BaseService from "../../services/BaseService";
import useSWR from "swr";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import ConfigLink from "../../configs";
import moment from "moment";
import Axios from "axios";
const Create = (props) => {
  const sessionLogin = localStorage.getItem("id");
  let history = useHistory();
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [titleObjective, setTitleObjective] = useState("");
  const [objective, setObjective] = useState("");
  const [titleSkill, setTitleSkill] = useState("");
  const [skill, setSkill] = useState("");
  const [titleCertifications, setTitleCertifications] = useState("");
  const [certifications, setCertifications] = useState("");
  const [titleFavourite, setTitleFavourite] = useState("");
  const [favourite, setFavourite] = useState("");
  const [titleExperience, setTitleExperience] = useState("");
  const [experience, setExperience] = useState("");
  const [titleProject, setTitleProject] = useState("");
  const [project, setProject] = useState("");
  const [titleEducation, setTitleEducation] = useState("");
  const [education, setEducation] = useState("");
  const [titleActivities, setTitleActivities] = useState("");
  const [activities, setActivities] = useState("");
  const [imagePath, setImagePath] = useState("");
  const handleInsert = async () => {
    const body = {
      name,
      position,
      birthDate: birthDay,
      gender,
      phoneNumber,
      email,
      address,
      titleObjective,
      objective,
      titleSkill,
      skill,
      titleCertifications,
      certifications,
      titleFavourite,
      favourite,
      titleExperience,
      experience,
      titleProject,
      project,
      titleEducation,
      education,
      titleActivities,
      activities,
      imagePath,
      accountId: parseInt(sessionLogin),
    };
    const result = await BaseService.post(
      `${ConfigLink.pro}/api/MyCv/AddMyCv`,
      body
    );
    history.push(`/GetCVById/${result.id}`);
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const handUpdateImage = async (value) => {
    let listFiles = value.target.files;
    if (listFiles && listFiles.length > 0) {
      let file = listFiles[0];
      if ((file && file.type === "image/jpeg") || file.type === "image/png") {
        let avatar = await getBase64(listFiles[0]);
        setImagePath(avatar);
        await uploadImg(avatar);
      }
    }
  };
  const uploadImg = async (value) => {
    let img = "";
    const formData = new FormData();
    formData.append("file", value);
    formData.append("upload_preset", "vulxwnf5");
    const url = "https://api.cloudinary.com/v1_1/dvhlnlvky/image/upload";
    await Axios.post(url, formData).then(
      (response) => (img = response.data.url)
    );
    await setImagePath(img);
  };
  return (
    <Container>
      <Row>
        <h1> Create</h1>
      </Row>
      <Row>
        <Form>
          <FormGroup className="row">
            <div className="col-12 col-md-6">
              <Label for="exampleEmail">Full Name</Label>
              <Input onChange={(value) => setName(value.target.value)} />
            </div>
            <div className="col-12 col-md-6">
              <Label for="examplePassword">Position</Label>
              <Input onChange={(value) => setPosition(value.target.value)} />
            </div>
          </FormGroup>

          <FormGroup className="row">
            <div className="col-12 col-md-6">
              <Label for="exampleEmail">BirthDay</Label>
              <Input
                type="date"
                onChange={(value) => setBirthDay(value.target.value)}
              />
            </div>
            <div className="col-12 col-md-6">
              <Label for="examplePassword">Gender</Label>
              <Input onChange={(value) => setGender(value.target.value)} />
            </div>
          </FormGroup>

          <FormGroup className="row">
            <div className="col-12 col-md-6">
              <Label for="exampleEmail">Phone</Label>
              <Input onChange={(value) => setPhoneNumber(value.target.value)} />
            </div>
            <div className="col-12 col-md-6">
              <Label for="examplePassword">Email</Label>
              <Input onChange={(value) => setEmail(value.target.value)} />
            </div>
          </FormGroup>

          <FormGroup>
            <Label for="exampleEmail">Address</Label>
            <Input onChange={(value) => setAddress(value.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Title Objective</Label>
            <Input
              onChange={(value) => setTitleObjective(value.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Objective</Label>
            <Input
              type="textarea"
              onChange={(value) => setObjective(value.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="exampleEmail">Title Skill</Label>
            <Input onChange={(value) => setTitleSkill(value.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label>Skill</Label>
            <Input
              type="textarea"
              onChange={(value) => setSkill(value.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="examplePassword">Title Certifications</Label>
            <Input
              onChange={(value) => setTitleCertifications(value.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Certifications</Label>
            <Input
              type="textarea"
              onChange={(value) => setCertifications(value.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="examplePassword">Title Favourite</Label>
            <Input
              onChange={(value) => setTitleFavourite(value.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Favourite</Label>
            <Input
              type="textarea"
              onChange={(value) => setFavourite(value.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="examplePassword">Title Experience</Label>
            <Input
              onChange={(value) => setTitleExperience(value.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Experience</Label>
            <Input
              type="textarea"
              onChange={(value) => setExperience(value.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="examplePassword">Title Project</Label>
            <Input onChange={(value) => setTitleProject(value.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label>Project</Label>
            <Input
              type="textarea"
              onChange={(value) => setProject(value.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="examplePassword">Title Education</Label>
            <Input
              onChange={(value) => setTitleEducation(value.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Education</Label>
            <Input
              type="textarea"
              onChange={(value) => setEducation(value.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="examplePassword">Title Activities</Label>
            <Input
              onChange={(value) => setTitleActivities(value.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Activities</Label>
            <Input
              type="textarea"
              onChange={(value) => setActivities(value.target.value)}
            />
          </FormGroup>
          {imagePath !== "" && <img src={imagePath} height={200} width={200} />}

          <FormGroup>
            <Label for="exampleFile">Avatar</Label>
            <Input
              type="file"
              name="file"
              id="exampleFile"
              onChange={(value) => handUpdateImage(value)}
            />
            <FormText color="muted"></FormText>
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

export default Create;
