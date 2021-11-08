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
import useSWR from "swr";
import ConfigLink from "../../configs";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import BaseService from "../../services/BaseService";
import moment from "moment";
import Axios from "axios";
const Detail = () => {
  const sessionLogin = localStorage.getItem("id");
  let history = useHistory();
  let { Id } = useParams();
  const [data, setData] = useState({});

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
  useEffect(async () => {
    const result = await BaseService.get(
      `${ConfigLink.pro}/api/MyCv/GetMyCvById?id=${Id}`
    );
    setData(result);
    const {
      birthDate,
      gender,
      phoneNumber,
      email,
      address,
      name,
      position,
      titleObjective,
      objective,
      titleCertifications,
      certifications,
      titleFavourite,
      favourite,
      titleExperience,
      experience,
      titleProject,
      project,
      titleActivities,
      activities,
      titleEducation,
      education,
      titleSkill,
      skill,
      imagePath,
    } = result;
    setName(name);
    setPosition(position);
    setBirthDay(moment(birthDate).format("YYYY-MM-DD"));
    setGender(gender);
    setPhoneNumber(phoneNumber);
    setEmail(email);
    setAddress(address);
    setTitleObjective(titleObjective);
    setObjective(objective);
    setTitleSkill(titleSkill);
    setSkill(skill);
    setTitleCertifications(titleCertifications);
    setCertifications(certifications);
    setTitleFavourite(titleFavourite);
    setFavourite(favourite);
    setTitleExperience(titleExperience);
    setExperience(experience);
    setTitleProject(titleProject);
    setProject(project);
    setTitleEducation(titleEducation);
    setEducation(education);
    setTitleActivities(titleActivities);
    setActivities(activities);
    setImagePath(imagePath);
  }, []);
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const handleUpdate = async () => {
    // await uploadImg();
    const body = {
      id: parseInt(Id),
      name,
      position,
      birthDate: moment(birthDay).format("YYYY-MM-DD") + "T00:00:00.000Z",
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
    const result = await BaseService.put(
      `${ConfigLink.pro}/api/MyCv/EditMyCv`,
      body
    );
    history.push(`/GetCVById/${result.id}`);
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

  if (data) {
    return (
      <Container>
        <Row>
          <h1> Update</h1>
        </Row>
        <Row>
          <Form>
            <FormGroup className="row">
              <div className="col-12 col-md-6">
                <Label for="exampleEmail">Full Name</Label>
                <Input
                  value={name}
                  onChange={(value) => setName(value.target.value)}
                />
              </div>
              <div className="col-12 col-md-6">
                <Label for="examplePassword">Position</Label>
                <Input
                  value={position}
                  onChange={(value) => setPosition(value.target.value)}
                />
              </div>
            </FormGroup>
            <FormGroup className="row">
              <div className="col-12 col-md-6">
                <Label for="exampleEmail">BirthDay</Label>
                <Input
                  value={birthDay}
                  type="date"
                  onChange={(value) => setBirthDay(value.target.value)}
                />
              </div>
              <div className="col-12 col-md-6">
                <Label for="examplePassword">Gender</Label>
                <Input
                  value={gender}
                  onChange={(value) => setGender(value.target.value)}
                />
              </div>
            </FormGroup>

            <FormGroup className="row">
              <div className="col-12 col-md-6">
                <Label for="exampleEmail">Phone</Label>
                <Input
                  value={phoneNumber}
                  onChange={(value) => setPhoneNumber(value.target.value)}
                />
              </div>
              <div className="col-12 col-md-6">
                <Label for="examplePassword">Email</Label>
                <Input
                  value={email}
                  onChange={(value) => setEmail(value.target.value)}
                />
              </div>
            </FormGroup>

            <FormGroup>
              <Label for="exampleEmail">Address</Label>
              <Input
                value={address}
                onChange={(value) => setAddress(value.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Title Objective</Label>
              <Input
                value={titleObjective}
                onChange={(value) => setTitleObjective(value.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Objective</Label>
              <Input
                value={objective}
                type="textarea"
                onChange={(value) => setObjective(value.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="exampleEmail">Title Skill</Label>
              <Input
                value={titleSkill}
                onChange={(value) => setTitleSkill(value.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Skill</Label>
              <Input
                value={skill}
                type="textarea"
                onChange={(value) => setSkill(value.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="examplePassword">Title Certifications</Label>
              <Input
                value={titleCertifications}
                onChange={(value) => setTitleCertifications(value.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Certifications</Label>
              <Input
                value={certifications}
                type="textarea"
                onChange={(value) => setCertifications(value.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="examplePassword">Title Favourite</Label>
              <Input
                value={titleFavourite}
                onChange={(value) => setTitleFavourite(value.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Favourite</Label>
              <Input
                value={favourite}
                type="textarea"
                onChange={(value) => setFavourite(value.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="examplePassword">Title Experience</Label>
              <Input
                value={titleExperience}
                onChange={(value) => setTitleExperience(value.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Experience</Label>
              <Input
                value={experience}
                type="textarea"
                onChange={(value) => setExperience(value.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="examplePassword">Title Project</Label>
              <Input
                value={titleProject}
                onChange={(value) => setTitleProject(value.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Project</Label>
              <Input
                value={project}
                type="textarea"
                onChange={(value) => setProject(value.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="examplePassword">Title Education</Label>
              <Input
                value={titleEducation}
                onChange={(value) => setTitleEducation(value.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Education</Label>
              <Input
                value={education}
                type="textarea"
                onChange={(value) => setEducation(value.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="examplePassword">Title Activities</Label>
              <Input
                value={titleActivities}
                onChange={(value) => setTitleActivities(value.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Activities</Label>
              <Input
                value={activities}
                type="textarea"
                onChange={(value) => setActivities(value.target.value)}
              />
            </FormGroup>
            {imagePath !== "" && (
              <FormGroup>
                <Label className="col-12"></Label>

                <img src={imagePath} height={200} width={200} />
              </FormGroup>
            )}
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
              <Button onClick={() => handleUpdate()}>Submit</Button>
            </FormGroup>
          </Form>
        </Row>
        <Row style={{ height: 100 }}></Row>
      </Container>
    );
  }
  return null;
};
export default Detail;
