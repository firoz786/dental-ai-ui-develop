import { SearchOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  message,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import "./ViewPatientById.css";
import { routes_clinic_user_patients } from "../../../../../utils/clinic_user_constants/ClinicUserConstants";
import { Option } from "antd/lib/mentions";
import ProfilePic from "../../../../../assets/default-profile-pic.png";
import axios from "axios";

const ViewPatientById = () => {
  const clinicId = localStorage.getItem("PatientID");
  const Token = localStorage.getItem("Token");
  const [patientIdForClinic, setPatientIdForClinic] = useState();
  const [patientDataByIdForClinic, setPatientDataByIdForClinic] = useState();
  const handleGetPatientByIdForClinic = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };
    axios
      .get(
        `http://ec2-3-6-218-218.ap-south-1.compute.amazonaws.com:8080/api/v1/clinic/${clinicId}/patient/${patientIdForClinic}`,
        config
      )
      .then((res) => {
        console.log(res.data.data);
        setPatientDataByIdForClinic(res.data.data);
      })
      .catch((err) => {
        message.error(err.response.data.data.errors);
      });
  };

  console.log(patientDataByIdForClinic);
  const phonecode = [
    { country: "+93" },
    { country: "+213" },
    { country: "+54" },
    { country: "+61" },
    { country: "+43" },
    { country: "+880" },
    { country: "+32" },
    { country: "+55" },
    { country: "+359" },
    { country: "+1" },
    { country: "+56" },
    { country: "+86" },
    { country: "+57" },
    { country: "+506" },
    { country: "+385" },
    { country: "+357" },
    { country: "+420" },
    { country: "+45" },
    { country: "+20" },
    { country: "+358" },
    { country: "+33" },
    { country: "+49" },
    { country: "+30" },
    { country: "+504" },
    { country: "+852" },
    { country: "+36" },
    { country: "+354" },
    { country: "+91" },
    { country: "+62" },
    { country: "+964" },
    { country: "+353" },
    { country: "+972" },
    { country: "+39" },
    { country: "+1-876" },
    { country: "+81" },
    { country: "+962" },
    { country: "+254" },
    { country: "+82" },
    { country: "+965" },
    { country: "+856" },
    { country: "+961" },
    { country: "+60" },
    { country: "+52" },
    { country: "+212" },
    { country: "+95" },
    { country: "+977" },
    { country: "+31" },
    { country: "+64" },
    { country: " +234" },
    { country: "+47" },
  ];
  return (
    <div className="view-patient-by-id-main-div">
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "13px 23px",
        }}
      >
        <Row
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span
            style={{
              fontWeight: 700,
              fontSize: 22,
              color: "#525252",
            }}
          >
            Patient ID# 258794
          </span>
          <Breadcrumb>
            <Breadcrumb.Item
              style={{
                background: "#2381C6",
                padding: "1px 10px",
                borderRadius: "3px",
              }}
            >
              <a href={routes_clinic_user_patients} style={{ color: "#FFF" }}>
                Patients
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item
              style={{
                background: "#2381C6",
                padding: "1px 10px",
                borderRadius: "3px",
                color: "#FFF",
              }}
            >
              Patient Search By Id
            </Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        {/* <Input
          style={{
            width: 399,
            height: 40,
            borderRadius: 3,
          }}
          className="d-flex ai-center"
          placeholder="Patient Search"
          prefix={<SearchOutlined style={{ opacity: 0.5 }} />}
        /> */}
      </Row>
      <Row
        style={{
          background: "#FFF",
          margin: "0 23px",
          padding: "32px",
        }}
      >
        <div
          style={{
            background: "#FBFBFB",
            width: "100%",
            padding: "36px 0 56px 0",
            gap: 25,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Row>
            <span
              style={{
                fontWeight: 600,
                fontSize: 20,
                color: "#525252",
              }}
            >
              Patient History Search by ID
            </span>
          </Row>
          <Row
            className="w-100 d-flex jc-center"
            style={{
              gap: 23,
            }}
          >
            <Input
              value={patientIdForClinic}
              onChange={(e) => setPatientIdForClinic(e.target.value)}
              style={{
                maxWidth: "399px",
              }}
            />
            <Button
              className="search-patient-by-id"
              onClick={handleGetPatientByIdForClinic}
            >
              Search
            </Button>
          </Row>
        </div>
      </Row>
      {patientDataByIdForClinic && (
        <Row
          style={{
            margin: "23px",
            display: "flex",
            gap: 23,
          }}
        >
          <Col>
            {/* <Col xs={24} sm={24} md={12} xl={6}> */}
            <div className="profile-pic-col-main-div">
              <div
                style={{
                  padding: "3.3333333333333335vw",
                  borderBottom: "1px solid #D9D9D9",
                }}
              >
                <Row
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Col>
                    <div
                      style={{
                        borderRadius: "40%",
                        background: "#D9D9D9",
                        width: "118px",
                        height: "118px",
                      }}
                    >
                      <img
                        style={{
                          height: "118px",
                          width: "118px",
                          borderRadius: 40,
                        }}
                        src={ProfilePic}
                        alt=""
                      />
                    </div>
                  </Col>
                </Row>
                <Row
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "27px 0 0 0",
                    gap: "2.302vh",
                  }}
                >
                  <Row style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      style={{
                        fontWeight: "400",
                        fontSize: "12px",
                        color: "#A5A4A4",
                      }}
                    >
                      Name
                    </span>

                    <Input
                      value={patientDataByIdForClinic.name}
                      style={{
                        fontWeight: "400",
                        fontSize: "16px",
                        color: "#525252",
                        height: "40px",
                        borderRadius: "3px",
                        border: "1px solid #E3E3E3",
                      }}
                      disabled={true}
                      bordered={false}
                    />
                  </Row>

                  <Row style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      style={{
                        fontWeight: "400",
                        fontSize: "12px",
                        color: "#A5A4A4",
                      }}
                    >
                      Patient Identification
                    </span>

                    <Input
                      value={"PID# " + patientDataByIdForClinic.user_id}
                      style={{
                        fontWeight: "400",
                        fontSize: "16px",
                        color: "#525252",
                        height: "40px",
                        borderRadius: "3px",
                        border: "1px solid #E3E3E3",
                      }}
                      bordered={false}
                      disabled={true}
                    />
                  </Row>
                </Row>
              </div>
              <div
                style={{
                  padding:
                    "3.7151702786377707vh 3.3333333333333335vw 4vh 3.3854166666666665vw",
                  borderBottom: "1px solid #D9D9D9",
                }}
              >
                <span
                  style={{
                    fontWeight: "400",
                    fontSize: "12px",
                    color: "#A5A4A4",
                  }}
                >
                  Email
                </span>
                <Input
                  value={patientDataByIdForClinic.email}
                  style={{
                    fontWeight: "400",
                    fontSize: "16px",
                    color: "#7D7D7D",
                    height: "40px",
                    borderRadius: "3px",
                    border: "1px solid #E3E3E3",
                  }}
                  disabled={true}
                  bordered={false}
                />
              </div>
              <div
                style={{
                  padding:
                    "3.7151702786377707vh 3.3333333333333335vw 4.615384615384615vh 3.3854166666666665vw",
                }}
              >
                <span
                  style={{
                    fontWeight: "400",
                    fontSize: "12px",
                    color: "#A5A4A4",
                  }}
                >
                  Phone
                </span>

                <Input
                  value={patientDataByIdForClinic.phone_number}
                  maxLength={20}
                  bordered={false}
                  addonBefore={
                    <Select
                      value={patientDataByIdForClinic.phone_country_code}
                      bordered={false}
                      label="Code"
                      style={{ color: "#7D7D7D" }}
                    >
                      {phonecode.map((item) => {
                        return (
                          <Option value={item.country}>{item.country}</Option>
                        );
                      })}
                    </Select>
                  }
                  style={{
                    fontWeight: "400",
                    fontSize: "16px",
                    border: "1px solid #E3E3E3",
                    color: "#7D7D7D",
                  }}
                />
              </div>
            </div>
            {/* </Col> */}
          </Col>
          <Col>
            <div className="d-flex jc-center clinic-user-mlanalysis-main-div">
              <div
                className="w-100"
                style={{
                  padding: "0px 19px",
                }}
              >
                <Row
                  style={{
                    height: "54px",
                    borderBottom: " 1px solid #E3E3E3",
                  }}
                  className="d-flex jc-between ai-center"
                >
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: 18,
                      color: "#525252",
                    }}
                  >
                    ML Analysis-Reports (1)
                  </span>

                  <u
                    style={{
                      fontWeight: 400,
                      fontSize: 14,
                      color: "#2CA3FA",
                      cursor: "pointer",
                    }}
                    // onClick={handleNavigateToMlAnalysis}
                  >
                    View All
                  </u>
                </Row>

                <Row
                  style={{
                    padding: "0 13px",
                    margin: "23px 15px 15px 0",
                  }}
                >
                  <Col span={4}>
                    <span className="xray-details-heading">Upload Date</span>
                  </Col>
                  <Col span={11}>
                    <span className="xray-details-heading">
                      Clinic Name / Self
                    </span>
                  </Col>
                  <Col span={5}>
                    <span className="xray-details-heading">Xray Reports</span>
                  </Col>
                  <Col span={4}>
                    <span className="xray-details-heading">Other Reports</span>
                  </Col>
                </Row>

                <Row
                  style={{
                    overflowY: "scroll",
                  }}
                ></Row>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ViewPatientById;
