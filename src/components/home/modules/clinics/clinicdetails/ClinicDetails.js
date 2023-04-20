// import "./Appointments.css";
import { Button, Col, Input, Modal, Row } from "antd";
import React, { useState } from "react";
import location_icon from "../../../../../assets/location-icon.png";
import titan_dental_logo from "../../../../../assets/titan-dental-logo.png";
import { CloseOutlined } from "@ant-design/icons";
import CreateAppointmentModal from "../../appointment_page/appointment_modals/CreateAppointmentModal";

const ClinicDetails = (props) => {
  const {
    name,
    email,
    clinic_user_id,
    zip_code,
    address_line_one,
    address_line_two,
    city,
    country,
    latitude,
    longitude,
    phone_country_code,
    phone_number,
    province,
    treatmentTypes,
  } = props;
  const patientId = localStorage.getItem("PatientID");
  const Token = localStorage.getItem("Token");
  const [isOpenClinicDetailsModal, setIsOpenClinicDetailsModal] =
    useState(false);
  const [openCreateAppointmentModal, setOpenCreateAppointmentModal] =
    useState(false);

  return (
    <Row className="clinics-data-row">
      <Col md={5} xs={24} style={{ display: "flex", flexDirection: "column" }}>
        <span
          className="clinic-name"
          onClick={() => setIsOpenClinicDetailsModal(true)}
        >
          {name}
        </span>
        <span className="clinic-id">Cln ID: # {clinic_user_id}</span>
      </Col>
      <Col md={6} xs={24} style={{ display: "flex", gap: "7px" }}>
        <Row>
          <img
            src={location_icon}
            alt=""
            style={{
              width: "13px",
              height: "16px",
              margin: "2px 7px 0 0",
            }}
          />
        </Row>
        <Row>
          <span className="address">
            {address_line_one},&nbsp;
            {address_line_two},&nbsp;
            {city},&nbsp;
            {province},&nbsp;
            {country},&nbsp;
            {zip_code}
          </span>
        </Row>
      </Col>
      <Col md={4} xs={24}></Col>
      <Col md={5} xs={24} style={{ padding: "0 0 0 50px" }}>
        {/* {appointment_status === "Scheduled" && (
          <span
            style={{
              fontWeight: 600,
              fontSize: 16,
              color: "#525252",
            }}
          >
            {appointment_status}
          </span>
        )}
        {appointment_status === _status_confirmed && (
          <span
            style={{
              fontWeight: 600,
              fontSize: 16,
              color: "#29C3C1",
            }}
          >
            {appointment_status}
          </span>
        )}
        {appointment_status === "Rejected" && (
          <span
            style={{
              fontWeight: 600,
              fontSize: 16,
              color: "#D35850",
            }}
          >
            {appointment_status}
          </span>
        )}
        {appointment_status === "Cancelled" && (
          <span
            style={{
              fontWeight: 600,
              fontSize: 16,
              color: "#D35850",
            }}
          >
            {appointment_status}
          </span>
        )} */}
      </Col>
      <Col md={4} xs={24}>
        <Row
          className="d-flex jc-end"
          style={{ gap: "17px", padding: "0 33px" }}
        >
          <Button className="locate-btn">Locate on Map</Button>
          <Button
            className="consult-btn"
            onClick={() => setOpenCreateAppointmentModal(true)}
          >
            Consult
          </Button>
        </Row>
      </Col>

      <Modal
        centered
        width={"450px"}
        open={isOpenClinicDetailsModal}
        closable={false}
        footer={false}
        className="clinic-details-modal"
        style={{
          borderRadius: "5px",
        }}
      >
        <div
          style={{
            height: "628px",
            background: "#FFF",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Row className="d-flex jc-between ai-center">
            <span style={{ fontWeight: 600, fontSize: 14, color: "#7D7D7D" }}>
              Cln ID: # {clinic_user_id}
            </span>
            <CloseOutlined
              onClick={() => setIsOpenClinicDetailsModal(false)}
              style={{ fontSize: "20px", color: "red" }}
            />
          </Row>
          <Row className="d-flex jc-center">
            <img src={titan_dental_logo} alt="" className="clinic-logo" />
          </Row>
          <Row className="d-flex jc-center" style={{ padding: "0 34px" }}>
            <div>
              <span
                style={{
                  fontWeight: 400,
                  fontSize: 12,
                  color: "#A5A4A4",
                  padding: "0 0 5px 0",
                }}
              >
                Contact Person
              </span>
              <Input
                value={name}
                bordered={false}
                className="clinic-details-input"
              />
            </div>
          </Row>
          <Row className="d-flex jc-center" style={{ padding: "0 34px" }}>
            <div>
              <span
                style={{
                  fontWeight: 400,
                  fontSize: 12,
                  color: "#A5A4A4",
                  padding: "0 0 5px 0",
                }}
              >
                Email
              </span>
              <Input
                value={email}
                bordered={false}
                className="clinic-details-input"
              />
            </div>
          </Row>
          <Row className="d-flex jc-center" style={{ padding: "0 34px" }}>
            <div>
              <span
                style={{
                  fontWeight: 400,
                  fontSize: 12,
                  color: "#A5A4A4",
                  padding: "0 0 5px 0",
                }}
              >
                Phone
              </span>
              <Input.Group compact>
                <Input
                  style={{ width: "20%" }}
                  value="+91"
                  className="clinic-details-input"
                />
                <Input
                  style={{ width: "80%" }}
                  value={phone_number}
                  className="clinic-details-input"
                />
              </Input.Group>
            </div>
          </Row>
          <Row className="d-flex jc-center" style={{ paddingBottom: "15px" }}>
            <Button
              className="close-clinic-details-btn"
              onClick={() => setIsOpenClinicDetailsModal(false)}
            >
              close
            </Button>
          </Row>
        </div>
      </Modal>
      <CreateAppointmentModal
        setOpenCreateAppointmentModal={setOpenCreateAppointmentModal}
        openCreateAppointmentModal={openCreateAppointmentModal}
        treatmentTypes={treatmentTypes}
      />
    </Row>
  );
};

export default ClinicDetails;
