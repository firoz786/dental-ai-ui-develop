import "./Appointments.css";
import { Button, Col, Input, Modal, Row } from "antd";
import React, { useState } from "react";
import location_icon from "../../../../../assets/location-icon.png";
import calendar_icon from "../../../../../assets/calendar-icon.png";
import titan_dental_logo from "../../../../../assets/titan-dental-logo.png";
import { CloseOutlined } from "@ant-design/icons";
import axios from "axios";
import {
  _scheduled_by_patient,
  _status_cancelled,
  _status_confirmed,
  _status_rejected,
} from "../../../../../utils/appointment_constants/AppointmentConstants";
import RescheduleAppointmentModal from "../appointment_modals/RescheduleAppointmentModal";
import moment from "moment";

const Apppointments = (props) => {
  const {
    scheduled_by,
    date,
    clinic_name,
    clinic_id,
    appointment_id,
    address_line_one,
    from_date,
    appointment_status,
    email,
    phone,
    treatment_type_id,
    handleGetAllAppointments,
    treatmentTypes,
    locateButtonText,
    rescheduleButtonText,
    cancelButtonText,
    clinicDetails,
    address_line_two,
    city,
    country,
    zip_code,
  } = props;
  const patientId = localStorage.getItem("PatientID");
  const Token = localStorage.getItem("Token");
  const [isOpenClinicDetailsModal, setIsOpenClinicDetailsModal] =
    useState(false);
  const [openRescheduleAppointmentModal, setOpenRescheduleAppointmentModal] =
    useState(false);
  const [openCancelAppointmentModal, setOpenCancelAppointmentModal] =
    useState(false);

  const fromDate = moment(from_date).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

  const handleAcceptClinicAppointment = () => {
    const payload = {
      patient_id: patientId,
      clinic_id: patientId,
      treatment_type_id: treatment_type_id,
      from_date: from_date,
      scheduled_by: scheduled_by,
      status: _status_confirmed,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };
    axios
      .put(
        `http://ec2-3-6-218-218.ap-south-1.compute.amazonaws.com:8080/api/v1/appointment/${appointment_id}`,
        payload,
        config
      )
      .then((res) => {
        setTimeout(() => {
          handleGetAllAppointments();
        }, 300);
      });
  };

  const handleRejectClinicAppointment = () => {
    const payload = {
      patient_id: patientId,
      clinic_id: patientId,
      treatment_type_id: treatment_type_id,
      from_date: from_date,
      scheduled_by: scheduled_by,
      status: _status_rejected,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };
    axios
      .put(
        `http://ec2-3-6-218-218.ap-south-1.compute.amazonaws.com:8080/api/v1/appointment/${appointment_id}`,
        payload,
        config
      )
      .then((res) => {
        setTimeout(() => {
          handleGetAllAppointments();
        }, 300);
      });
  };

  const handleCancelAppointment = () => {
    const payload = {
      patient_id: patientId,
      clinic_id: clinic_id,
      treatment_type_id: treatment_type_id,
      from_date: fromDate,
      scheduled_by: scheduled_by,
      status: _status_cancelled,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };
    axios
      .put(
        `http://ec2-3-6-218-218.ap-south-1.compute.amazonaws.com:8080/api/v1/appointment/${appointment_id}`,
        payload,
        config
      )
      .then((res) => {
        handleGetAllAppointments();
        setOpenCancelAppointmentModal(false);
      });
  };

  const defaultDate = moment(from_date);
  return (
    <Row
      className={
        scheduled_by === _scheduled_by_patient
          ? "appointment-status-row"
          : "appointment-status-row-clinic"
      }
    >
      <Col md={2} xs={24}>
        <span className="appointment-date">{date.split("T")[0]}</span>
      </Col>
      <Col md={3} xs={24} style={{ display: "flex", flexDirection: "column" }}>
        <span
          className="clinic-name"
          onClick={() => setIsOpenClinicDetailsModal(true)}
        >
          {clinic_name}
        </span>
        <span className="clinic-id">Cln ID: # {clinic_id}</span>
      </Col>
      <Col md={5} xs={24} style={{ display: "flex", gap: "7px" }}>
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
            {address_line_two},&nbsp;{city},&nbsp;{country}&nbsp;-&nbsp;
            {zip_code}
          </span>
        </Row>
      </Col>
      <Col
        md={4}
        xs={24}
        style={{ display: "flex", gap: "7px", padding: "0 0 0 0" }}
      >
        <Row>
          <img
            src={calendar_icon}
            alt=""
            style={{
              width: "13px",
              height: "16px",
              margin: "5px 0 0 0",
            }}
          />
        </Row>
        <Row>
          <Col
            style={{
              gap: 3,
            }}
            className="d-flex flex-col"
          >
            <span
              style={{
                fontWeight: 600,
                fontSize: 16,
                color: "#525252",
              }}
            >
              {from_date &&
                moment(from_date).format("ddd, DD/MM/YYYY  HH:mm A")}
            </span>
          </Col>
        </Row>
      </Col>
      <Col md={4} xs={24} style={{ padding: "0 0 0 50px" }}>
        {appointment_status === "Scheduled" && (
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
        )}
      </Col>
      <Col md={6} xs={24}>
        {scheduled_by === _scheduled_by_patient && (
          <Row
            className="d-flex jc-end"
            style={{ gap: "17px", padding: "0 33px" }}
          >
            <Button className="locate-btn">{locateButtonText}</Button>
            <Button
              className="reschedule-btn"
              onClick={() => {
                appointment_status !== "Cancelled" &&
                  setOpenRescheduleAppointmentModal(true);
              }}
            >
              {rescheduleButtonText}
            </Button>
            <Button
              className="cancel-btn"
              onClick={() => setOpenCancelAppointmentModal(true)}
            >
              {cancelButtonText}
            </Button>
          </Row>
        )}
        {appointment_status === "Scheduled" && scheduled_by === "Clinic" && (
          <Row
            className="d-flex jc-end"
            style={{ gap: "17px", padding: "0 33px" }}
          >
            <Button
              className="accept-btn"
              onClick={handleAcceptClinicAppointment}
            >
              Accept
            </Button>
            <Button
              className="locate-btn"
              onClick={handleRejectClinicAppointment}
            >
              Locate on Map
            </Button>
            <Button className="cancel-btn">Reject</Button>
          </Row>
        )}
        {appointment_status === _status_confirmed &&
          scheduled_by === "Clinic" && (
            <Row
              className="d-flex jc-end"
              style={{ gap: "17px", padding: "0 33px" }}
            >
              <Button className="locate-btn">Locate on Map</Button>
              <Button
                className="reschedule-btn"
                onClick={() => {
                  appointment_status !== "Cancelled" &&
                    setOpenRescheduleAppointmentModal(true);
                }}
              >
                Reschedule
              </Button>
              <Button
                className="cancel-btn"
                onClick={() => setOpenCancelAppointmentModal(true)}
              >
                Cancel
              </Button>
            </Row>
          )}
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
              Cln ID: # {clinic_id}
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
                value={clinic_name}
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
                  value={phone}
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
      <RescheduleAppointmentModal
        treatmentTypes={treatmentTypes}
        defaultDate={defaultDate}
        handleGetAllAppointments={handleGetAllAppointments}
        appointment_id={appointment_id}
        treatmentTypeId={treatment_type_id}
        clinic_name={clinic_name}
        clinicDetails={clinicDetails}
        openRescheduleAppointmentModal={openRescheduleAppointmentModal}
        setOpenRescheduleAppointmentModal={setOpenRescheduleAppointmentModal}
      />
      <Modal
        centered
        width={"647px"}
        open={openCancelAppointmentModal}
        closable={false}
        footer={false}
        className="cancel-appointment-modal"
        style={{
          borderRadius: "5px",
        }}
      >
        <div style={{ minHeight: "305px", background: "#FFF" }}>
          <Row className="d-flex jc-between ai-center">
            <span style={{ fontWeight: 700, fontSize: 22, color: "#525252" }}>
              Cancel Appointment
            </span>
            <CloseOutlined
              style={{ color: "red", fontSize: "23px" }}
              onClick={() => setOpenCancelAppointmentModal(false)}
            />
          </Row>
          <Row className="d-flex jc-center">
            <span
              style={{
                fontWeight: 400,
                fontSize: 16,
                color: "#7D7D7D",
                margin: "60px 0 0 0",
              }}
            >
              Are you sure! you wish to cancel the appointment on
            </span>
          </Row>
          <Row className="d-flex jc-center">
            <Row
              style={{
                width: 300,
                height: 39,
                background: "#F9F9F9",
                borderRadius: 5,
                margin: "12px 0 0 0",
                gap: 13,
              }}
              className="jc-center ai-center"
            >
              <Col>
                <img
                  src={calendar_icon}
                  alt=""
                  style={{ width: "0.7291666666666666vw" }}
                />
              </Col>
              <Col>
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: 16,
                    color: "#525252",
                  }}
                >
                  {from_date &&
                    moment(from_date).format("ddd, DD/MM/YYYY HH:mm A")}
                </span>
              </Col>
            </Row>
          </Row>
          <Row
            className="d-flex jc-center"
            style={{ margin: "40px 0 0 0", gap: 18 }}
          >
            <Button
              className="no-btn"
              onClick={() => setOpenCancelAppointmentModal(false)}
            >
              No
            </Button>
            <Button className="yes-btn" onClick={handleCancelAppointment}>
              Yes
            </Button>
          </Row>
        </div>
      </Modal>
    </Row>
  );
};

export default Apppointments;
