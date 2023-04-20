import { EllipsisOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, Form, Input, Modal, Row } from "antd";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import "./AdminPatients.css";
import image from "../../../../assets/propic.jpg";
import xray from "../../../../assets/xray.png";
import report from "../../../../assets/add-report-icon.png";
import insuranceidicon from "../../../../assets/insurance-id-icon.png";
import { useNavigate } from "react-router-dom";
import { routes_clinic_admin_add_patient } from "../../../../utils/clinic_admin_constants/ClinicAdminConstants";

const AdminPatients = () => {
  const navigate = useNavigate();
  const [isOpenSendNotificationModal, setIsOpenSendNotificationModal] =
    useState(false);
  const patientData = [
    {
      date: "23/03/2023",
    },
    {
      date: "23/03/2023",
    },
    {
      date: "23/03/2023",
    },
    {
      date: "23/03/2023",
    },
    {
      date: "23/03/2023",
    },
  ];

  const patientDeleteDropdown = (
    <div className="patient-delete-dropdown">
      <Row
        className="full-profile-row"
        onClick={() => navigate(routes_clinic_admin_add_patient)}
      >
        View full profile
      </Row>
      <Row className="delete-patient-row">Delete patient</Row>
    </div>
  );

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
            Patients (100)
          </span>
        </Row>
        <Row
          style={{
            display: "flex",
            gap: 44,
          }}
        >
          <Button
            style={{
              background: "#FFFFFF",
              border: "1px solid #97C46F",
              borderRadius: 30,
              fontWeight: 600,
              fontSize: 14,
              color: "#525252",
            }}
            onClick={() => navigate(routes_clinic_admin_add_patient)}
          >
            Add New Patient
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
            <span className="patients-data-heading">Upload Date</span>
          </Col>
          <Col span={4}>
            <span className="patients-data-heading">Patient Name / ID</span>
          </Col>
          <Col span={4}>
            <span className="patients-data-heading">Email</span>
          </Col>
          <Col span={3}>
            <span className="patients-data-heading">Phone</span>
          </Col>
          <Col span={3}></Col>
          <Col span={3} style={{ display: "flex", justifyContent: "center" }}>
            <span className="patients-data-heading">X-Ray Reports</span>
          </Col>
          <Col span={4} style={{ display: "flex", justifyContent: "center" }}>
            <span className="patients-data-heading">Other Reports</span>
          </Col>
          <Col span={1}></Col>
        </Row>
        {patientData.map((item) => {
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
              <Col span={4}>
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
                          fontSize: 15,
                          textDecorationLine: "underline",
                          color: "#2CA3FA",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          navigate(routes_clinic_admin_add_patient)
                        }
                      >
                        Ruby Rose
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
                          &nbsp;9872987
                        </span>
                      </span>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col span={4}>
                <span className="patients-data-email">
                  rubyrose007@gmail.com
                </span>
              </Col>
              <Col span={3}>
                <span className="patients-data-phone">511161615</span>
              </Col>
              <Col span={3}>
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: 14,
                    textDecorationLine: "underline",
                    color: "#2CA3FA",
                    cursor: "pointer",
                  }}
                  onClick={() => setIsOpenSendNotificationModal(true)}
                >
                  Send Notification
                </span>
              </Col>
              <Col
                span={3}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={xray}
                  alt=""
                  style={{
                    width: "81px",
                    cursor: "pointer",
                  }}
                />
                <span
                  style={{
                    margin: "0 0 0 10px",
                    color: "#2CA3FA",
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  <u>(2)</u>
                </span>
              </Col>
              <Col
                span={4}
                style={{ display: "flex", justifyContent: "center", gap: 5 }}
              >
                <img src={report} alt="" style={{ width: 16 }} />
                <u style={{ color: "#2CA3FA" }}>Attachments</u>
                <span style={{ color: "#2CA3FA" }}>(3)</span>
              </Col>
              <Col span={1}>
                <Dropdown
                  overlay={patientDeleteDropdown}
                  placement="bottomRight"
                >
                  <EllipsisOutlined rotate={90} style={{ fontSize: 20 }} />
                </Dropdown>
              </Col>
            </Row>
          );
        })}
      </div>
      <Modal
        open={isOpenSendNotificationModal}
        centered
        footer={false}
        closable={false}
        width={450}
      >
        <div>
          <Row className="d-flex ai-center">
            <Col>
              <img src={insuranceidicon} alt="" style={{ width: "1.35vw" }} />
            </Col>
            <Col>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 18,
                  color: "#525252",
                  margin: "0 0 0 13px",
                }}
              >
                Send Notification
              </span>
            </Col>
          </Row>
          <Row
            style={{
              margin: "20px 0",
              display: "flex",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Row className="w-100">
              <span
                style={{
                  fontWeight: 400,
                  fontSize: 12,
                  color: "#A5A4A4",
                }}
              >
                Title
              </span>
            </Row>
            <Row className="w-100">
              <Form.Item
                className="w-100"
                name="notification_title"
                rules={[{ required: true, message: "Enter Citizen ID" }]}
              >
                <Input name="notification_title" style={{ height: 40 }} />
              </Form.Item>
            </Row>
          </Row>
          <Row
            style={{
              margin: "20px 0",
              display: "flex",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Row className="w-100">
              <span
                style={{
                  fontWeight: 400,
                  fontSize: 12,
                  color: "#A5A4A4",
                }}
              >
                Message
              </span>
            </Row>
            <Row className="w-100">
              <Form.Item className="w-100" name="notification_message">
                <Input name="notification_message" style={{ height: 100 }} />
              </Form.Item>
            </Row>
          </Row>
          <Row className="d-flex jc-center">
            <Button
              style={{
                height: "30px",
                margin: "0 0 20px 0",
                width: "64px",
                border: "1px solid #29C3C1",
                borderRadius: "30px",
                color: "#29C3C1",
                background: "#ECFEFF",
              }}
              htmlType="submit"
              onClick={() => setIsOpenSendNotificationModal(false)}
            >
              Send
            </Button>
          </Row>
        </div>
      </Modal>
      {/* <Modal
        open={IsOpenFullXrayModal}
        centered
        footer={false}
        closable={false}
        width={"51.145833333333336vw"}
        mask={false}
      >
        <div
          style={{
            height: "75.07692307692308vh",
          }}
        >
          <Row className="d-flex jc-between ai-center">
            <span
              style={{
                fontWeight: 700,
                fontSize: 22,
                color: "#525252",
              }}
            >
              ML Analysis
            </span>
            <CloseOutlined
              style={{
                color: "red",
                fontSize: "16px",
              }}
              onClick={() => setIsOpenFullXrayModal(false)}
            />
          </Row>
          <Row
            style={{
              width: "100%",
              margin: "25px 0 0 0",
              gap: "10px",
            }}
          >
            {patientDashboardReportsDetails &&
              patientDashboardReportsDetails
                .filter((item, id) => id === xrayArrayId)
                .map((item, id) => {
                  return (
                    <Col span={7}>
                      {item.xray_reports.map((item) => {
                        return (
                          <Row
                            style={{
                              display: "flex",
                              alignItems: "center",
                              background: "#F1FBFF",
                              height: "72px",
                              margin: "5px 0 0 0",
                            }}
                          >
                            <Col
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                              span={9}
                            >
                              <img
                                style={{
                                  height: "41px",
                                  width: "59px",
                                  cursor: "pointer",
                                }}
                                src={
                                  item.file_mime_type === imageJPEG
                                    ? jpegimagedatabaseurl + item.report_image
                                    : pngimagedatabaseurl + item.report_image
                                }
                                alt=""
                                onClick={() =>
                                  handleSendingImageUrl(
                                    item.file_mime_type,
                                    item.report_image
                                  )
                                }
                              />
                            </Col>
                            <Col>
                              <span
                                style={{
                                  fontWeight: "600",
                                  fontSize: "14px",
                                  color: "#525252",
                                }}
                              >
                                {item.title}
                              </span>
                            </Col>
                          </Row>
                        );
                      })}
                    </Col>
                  );
                })}
            <Col
              span={16}
              style={{
                margin: "5px 0 0 0",
              }}
            >
              <ImageComponent
                ImageMimeType={xrayMimeType}
                ImageUrl={xrayImageUrl}
              />
            </Col>
          </Row>
          <Row
            style={{
              margin: "18px 0 0 0",
              height: "258px",
            }}
          ></Row>
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "85px",
            }}
          >
            <Button
              style={{
                display: "flex",
                alignItems: "center",
                fontWeight: "600",
                fontSize: "16px",
                color: "#D35850",
                border: "1px solid #D35850",
                borderRadius: "16px",
              }}
              onClick={() => setIsOpenFullXrayModal(false)}
            >
              Close
            </Button>
          </Row>
        </div>
      </Modal> */}
    </div>
  );
};

export default AdminPatients;
