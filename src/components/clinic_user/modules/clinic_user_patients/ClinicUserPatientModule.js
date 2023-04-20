import { SearchOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Input, Row, message } from "antd";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "./ClinicUserPatientModule.css";
import image from "../../../../assets/propic.jpg";
import { useNavigate } from "react-router-dom";
import {
  routes_clinic_user_add_patient,
  routes_clinic_user_view_patient_by_id,
} from "../../../../utils/clinic_user_constants/ClinicUserConstants";
import axios from "axios";

const ClinicUserPatientModule = () => {
  const navigate = useNavigate();
  const clinicId = localStorage.getItem("PatientID");
  const Token = localStorage.getItem("Token");
  const [patientDataForClinic, setPatientDataForClinic] = useState();

  const handleGetAllPatientsForClinic = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };
    axios
      .get(
        `http://ec2-3-6-218-218.ap-south-1.compute.amazonaws.com:8080/api/v1/clinic/${clinicId}/patient`,
        config
      )
      .then((res) => {
        console.log(res.data.data);
        setPatientDataForClinic(res.data.data);
      })
      .catch((err) => {
        message.error(err.response.data.data.errors);
      });
  };

  useEffect(() => {
    handleGetAllPatientsForClinic();
  }, []);
  return (
    <div className="clinic-user-patients-main-div">
      <Helmet>
        <title>Patients</title>
      </Helmet>
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "23px",
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
            Patients
          </span>
          <Breadcrumb>
            <Breadcrumb.Item
              style={{
                background: "#2381C6",
                color: "white",
                padding: "1px 10px",
                borderRadius: 3,
              }}
            >
              Patients
            </Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row
          style={{
            display: "flex",
            gap: 44,
          }}
        >
          <Button
            style={{
              background: "#F1F7FF",
              border: "1px solid #009DF7",
              borderRadius: 30,
              fontWeight: 600,
              fontSize: 14,
              color: "#2CA3FA",
            }}
            onClick={() => navigate(routes_clinic_user_view_patient_by_id)}
          >
            View Patient History by ID
          </Button>
          <Button
            style={{
              background: "#F1F7FF",
              border: "1px solid #009DF7",
              borderRadius: 30,
              fontWeight: 600,
              fontSize: 14,
              color: "#2CA3FA",
            }}
            onClick={() => navigate(routes_clinic_user_add_patient)}
          >
            Add Patient
          </Button>
        </Row>
        <Input
          style={{
            width: 399,
            height: 40,
            borderRadius: 3,
          }}
          className="d-flex ai-center"
          placeholder="Search"
          prefix={<SearchOutlined style={{ opacity: 0.5 }} />}
        />
      </Row>
      <div
        style={{
          margin: "0 23px",
          background: "#FFF",
          padding: "23px",
        }}
      >
        <Row
          style={{
            padding: "0 0 13px 0",
            margin: "0 23px",
          }}
        >
          <Col span={2}>
            <span className="patients-data-heading">Added Date</span>
          </Col>
          <Col span={3}>
            <span className="patients-data-heading">Patient Name</span>
          </Col>
          <Col span={4}>
            <span className="patients-data-heading">Email</span>
          </Col>
          <Col span={2}>
            <span className="patients-data-heading">Phone</span>
          </Col>
          <Col span={3}>
            <span className="patients-data-heading">Address</span>
          </Col>
          <Col span={3} style={{ display: "flex", justifyContent: "center" }}>
            <span className="patients-data-heading">View X-Ray/Reports</span>
          </Col>
          <Col span={3} style={{ display: "flex", justifyContent: "center" }}>
            <span className="patients-data-heading">Add X-Ray</span>
          </Col>
          <Col span={3} style={{ display: "flex", justifyContent: "center" }}>
            <span className="patients-data-heading">Appointments</span>
          </Col>
          <Col span={1}></Col>
        </Row>
        {patientDataForClinic &&
          patientDataForClinic.map((item) => {
            return (
              <Row
                style={{
                  minHeight: 93,
                  background: "#FBFBFB",
                  margin: "0 0 5px 0",
                  padding: "0 23px",
                }}
                className="d-flex ai-center"
              >
                <Col span={2}>
                  <span className="patients-data-date">24/07/2023</span>
                </Col>
                <Col span={3}>
                  <Row>
                    <Col>
                      <img
                        src={image}
                        alt=""
                        style={{
                          width: 49,
                          height: 49,
                          borderRadius: 18,
                        }}
                      />
                    </Col>
                    <Col
                      span={15}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        margin: "0 0 0 10px",
                      }}
                    >
                      <Row>
                        <span
                          style={{
                            fontWeight: 600,
                            fontSize: 14,
                            textDecorationLine: "underline",
                            color: "#2CA3FA",
                            display: "block",
                            width: "100%",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.name}
                        </span>
                      </Row>
                      <Row>
                        <span
                          style={{
                            fontWeight: 600,
                            fontSize: 14,
                            color: "#000000",
                          }}
                        >
                          #PID
                          <span
                            style={{
                              color: "#7D7D7D",
                            }}
                          >
                            &nbsp;{item.user_id}
                          </span>
                        </span>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col span={3}>
                  <span className="patients-data-email">{item.email}</span>
                </Col>
                <Col
                  span={3}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <span className="patients-data-phone">
                    {item.phone_number}
                  </span>
                </Col>
                <Col span={3}>
                  <span className="patients-data-address">
                    {item.address_line_one}
                  </span>
                </Col>
                <Col
                  span={3}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <span
                    style={{
                      fontWeight: 600,
                      fontSize: 14,
                      textDecorationLine: "underline",
                      color: "#2CA3FA",
                    }}
                  >
                    View
                  </span>
                </Col>
                <Col
                  span={3}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <span className="patients-data">
                    <Button
                      style={{
                        border: "1px solid #009DF7",
                        borderRadius: 30,
                        fontWeight: 600,
                        fontSize: 14,
                        color: "#2CA3FA",
                      }}
                    >
                      Add X-Ray/Reports
                    </Button>
                  </span>
                </Col>
                <Col
                  span={3}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <span className="patients-data">
                    <Button
                      style={{
                        border: "1px solid #009DF7",
                        borderRadius: 30,
                        fontWeight: 600,
                        fontSize: 14,
                        color: "#2CA3FA",
                      }}
                    >
                      Schedule Appointment
                    </Button>
                  </span>
                </Col>
                <Col span={1}>
                  <span className="patients-data">
                    <Button
                      style={{
                        border: "1px solid #009DF7",
                        borderRadius: 30,
                        fontWeight: 600,
                        fontSize: 14,
                        color: "#2CA3FA",
                      }}
                      onClick={() =>
                        navigate(`/clinic-user/edit-patient/${item.user_id}`)
                      }
                    >
                      Edit
                    </Button>
                  </span>
                </Col>
              </Row>
            );
          })}
      </div>
    </div>
  );
};

export default ClinicUserPatientModule;
