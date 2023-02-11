import React, { useEffect, useRef, useState } from "react";

import { Button, NavItem, FormGroup, Form, Label, Input } from "reactstrap";
import { Container, Row, Col, Badge, Progress } from "reactstrap";
import {
  FaCalendarAlt,
  FaUser,
  FaPhoneAlt,
  HiLocationMarker,
} from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { AiTwotoneMail } from "react-icons/ai";
import "./style.css";
import useSWR from "swr";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { Parser } from "html-to-react";
import { useHistory } from "react-router-dom";
import BaseService from "../../services/BaseService";
import ConfigLink from "../../configs";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
var coverLetterId = 0;
export const GetCVBy = React.forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  let { Id } = useParams();
  useEffect(async () => {
    const result = await BaseService.get(
      `${ConfigLink.pro}/api/MyCv/GetMyCvById?id=${Id}`
    );
    setData(result);
    console.log("result:", JSON.stringify(result));
  }, []);
  if (data) {
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
      accountId,
    } = data;
    coverLetterId = accountId;
    let strSkill = "";
    let str = "";
    if (skill && skill !== "") {
      strSkill = skill.split(";");
      str = strSkill.map((item) => {
        return item.split("|");
      });
    }

    return (
      <div ref={ref}>
        <Container>
          <Row className="pd-20">
            <div className="col-12 col-md-6">
              <img
                src={imagePath}
                className="img"
                style={{ height: 200, width: 200 }}
              />
            </div>

            <div className="col-12 col-md-6 flex-display">
              <div className="main-margin">
                <label className="block-display fullNameSize text-alight">
                  {name}
                </label>
                <label className="block-display position">{position}</label>
              </div>
            </div>
          </Row>
          <Row>
            <div className="col-12 col-md-6">
              {/* ------------------thông tin liên hệ--------------------------------- */}
              <div className="pd-top-bottom">
                <h6 className="title">CONTACT INFO</h6>
                <div className="hr-underLine"></div>
                <div>
                  <span>
                    <Badge className="style-Badge">
                      <FaCalendarAlt className="style-icon" />
                    </Badge>
                  </span>
                  <span className="pl-8">
                    {moment(birthDate).format("DD/MM/YYYY")}
                  </span>
                </div>
                <div>
                  <span>
                    <Badge className="style-Badge">
                      <FaUser className="style-icon" />
                    </Badge>
                  </span>
                  <span className="pl-8">{gender}</span>
                </div>
                <div>
                  <span>
                    <Badge className="style-Badge">
                      <FaPhoneAlt className="style-icon" />
                    </Badge>
                  </span>
                  <span className="pl-8">{phoneNumber}</span>
                </div>
                <div>
                  <span>
                    <Badge className="style-Badge">
                      <AiTwotoneMail className="style-icon" />
                    </Badge>
                  </span>
                  <span className="pl-8">{email}</span>
                </div>
                <div>
                  <span>
                    <Badge className="style-Badge">
                      <IoLocationSharp className="style-icon" />
                    </Badge>
                  </span>
                  <span className="pl-8">{address}</span>
                </div>
              </div>
              {/* ------------------thông tin liên hệ--------------------------------- */}
              {/* ------------------Mục tiêu nghề nghiệp--------------------------------- */}
              {titleObjective && titleObjective.length > 0 && (
                <div className="pd-top-bottom">
                  <h6 className="title">{titleObjective}</h6>
                  <div className="hr-underLine"></div>
                  {Parser().parse(objective)}
                </div>
              )}
              {/* ------------------Mục tiêu nghề nghiệp--------------------------------- */}
              {/* ------------------Kỹ năng--------------------------------- */}
              {str && str.length > 0 && (
                <div className="pd-top-bottom">
                  <h6 className="title">{titleSkill}</h6>
                  <div className="hr-underLine"></div>
                  {str.map((item, index) => (
                    <div key={index}>
                      <div className="text-center">{item[0]}</div>
                      <Progress value={`${item[1]}`} />
                    </div>
                  ))}
                </div>
              )}

              {/* ------------------Kỹ năng--------------------------------- */}
              {/* ------------------CHỨNG CHỈ--------------------------------- */}
              {titleCertifications && titleCertifications.length > 0 && (
                <div className="pd-top-bottom">
                  <h6 className="title">{titleCertifications}</h6>
                  <div className="hr-underLine"></div>
                  {Parser().parse(certifications)}
                </div>
              )}
              {/* ------------------CHỨNG CHỈ--------------------------------- */}
              {/* ------------------SỞ THÍCH--------------------------------- */}
              {titleFavourite && titleFavourite.length > 0 && (
                <div className="pd-top-bottom">
                  <h6 className="title">{titleFavourite}</h6>
                  <div className="hr-underLine"></div>
                  {Parser().parse(favourite)}
                </div>
              )}
              {/* ------------------SỞ THÍCH--------------------------------- */}
              {/* --------------------------TRINH DO HOC VAN--------------------------------------------- */}
              {titleEducation && titleEducation.length > 0 && (
                <div className="pd-top-bottom">
                  <h6 className="title">{titleEducation}</h6>
                  <div className="hr-underLine"></div>
                  {Parser().parse(education)}
                </div>
              )}
              {/* -------------------------TRINH DO HOC VAN--------------------------------------------- */}
            </div>
            <div className="col-12 col-md-6">
              {/* --------------------------KINH NGHIÊM LAM VIỆC--------------------------------------------- */}
              {titleExperience && titleExperience.length > 0 && (
                <div className="pd-top-bottom">
                  <h6 className="title">{titleExperience}</h6>
                  <div className="hr-underLine"></div>
                  {Parser().parse(experience)}
                </div>
              )}
              {/* --------------------------KINH NGHIÊM LAM VIỆC--------------------------------------------- */}
              {/* --------------------------DU AN THAM GIA--------------------------------------------- */}
              {titleProject && titleProject.length > 0 && (
                <div className="pd-top-bottom">
                  <h6 className="title">{titleProject}</h6>
                  <div className="hr-underLine"></div>
                  {Parser().parse(project)}
                </div>
              )}
              {/* --------------------------DU AN THAM GIA--------------------------------------------- */}
              {/* --------------------------HAOT ĐỘNG--------------------------------------------- */}
              {titleActivities && titleActivities.length > 0 && (
                <div className="pd-top-bottom">
                  <h6 className="title">{titleActivities}</h6>
                  <div className="hr-underLine"></div>
                  {Parser().parse(activities)}
                </div>
              )}
              {/* --------------------------HAOT ĐỘNG------------------------------------------ */}
            </div>
          </Row>
          <Row style={{ height: 20 }}></Row>
        </Container>
      </div>
    );
  } else {
    return null;
  }
});
const GetCVById = () => {
  let history = useHistory();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handleRedirect = () => {
    history.push(`/CoverLetter/Letter/${coverLetterId}`);
  };
  return (
    <div>
      <GetCVBy ref={componentRef} />
      <Container>
        <Row>
          <Form>
            <FormGroup className="row">
              <div className="col-12 footer">
                <Button onClick={handlePrint}>Print CV</Button>
              </div>
            </FormGroup>
          </Form>
        </Row>
        <Row style={{ height: 20 }}></Row>
      </Container>
    </div>
  );
};
export { GetCVById };
