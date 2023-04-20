import React, { useEffect } from "react";
import "./AppointmentPage.css";
import { Button, Col, Pagination, Row } from "antd";
import { useState } from "react";
import { Helmet } from "react-helmet";
import Apppointments from "./appointments/Apppointments";
import axios from "axios";
import CreateAppointmentModal from "./appointment_modals/CreateAppointmentModal";
import locateonmapicon from "../../../../assets/locate-on-map-icon.png";
import rescheduleicon from "../../../../assets/reschedule-icon.png";
import cancelicon from "../../../../assets/cancel-icon.png";
import createAppointmentIcon from "../../../../assets/create-appointment-icon.png";

const AppointmentPage = () => {
  const patientid = localStorage.getItem("PatientID");
  const Token = localStorage.getItem("Token");
  const [openCreateAppointmentModal, setOpenCreateAppointmentModal] =
    useState(false);
  const [appointmentTableData, setAppointmentTableData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [treatmentTypes, setTreatmentTypes] = useState();
  const [clinicDetails, setClinicDetails] = useState();

  const handleGetAllClinicDetails = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };
    axios
      .get(
        `http://ec2-3-6-218-218.ap-south-1.compute.amazonaws.com:8080/api/v1/clinic`,
        config
      )
      .then((res) => {
        setClinicDetails(res.data.data);
      });
  };

  let pageSize;

  if (window.innerWidth > 1900) {
    pageSize = 6;
  }
  if (window.innerWidth < 1900) {
    pageSize = 5;
  }
  if (window.innerWidth < 1800) {
    pageSize = 4;
  }
  if (window.innerWidth < 1207) {
    pageSize = 3;
  }
  if (window.innerWidth < 1051) {
    pageSize = 4;
  }
  if (window.innerWidth < 931) {
    pageSize = 3;
  }
  if (window.innerWidth < 769) {
    pageSize = 2;
  }

  const openCreateAppointmentodal = () => {
    setOpenCreateAppointmentModal(true);
  };

  const handleGetAllTreatmentTypes = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };
    axios
      .get(
        "http://ec2-3-6-218-218.ap-south-1.compute.amazonaws.com:8080/api/v1/static/treatment-type",
        config
      )
      .then((res) => {
        setTreatmentTypes(res.data.data);
      });
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGetAllAppointments = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };
    axios
      .get(
        `http://ec2-3-6-218-218.ap-south-1.compute.amazonaws.com:8080/api/v1/appointment/patient/${patientid}`,
        config
      )
      .then((res) => {
        setAppointmentTableData(res.data.data);
      });
  };

  // Arranging the backend data to adjust for pagination
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData =
    appointmentTableData && appointmentTableData.slice(startIndex, endIndex);

  useEffect(() => {
    handleGetAllTreatmentTypes();
    handleGetAllAppointments();
  }, []);

  const [locateButtonText, setLocateButtonText] = useState(<>Locate on Map</>);
  const [rescheduleButtonText, setRescheduleButtonText] = useState(
    <>Reschedule</>
  );
  const [cancelButtonText, setCancelButtonText] = useState(<>Cancel</>);
  const [createAppointmentButtonText, setCreateAppointmentButtonText] =
    useState(<>Create an Appointment</>);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1050) {
        setLocateButtonText(
          <img
            src={locateonmapicon}
            alt=""
            style={{ width: "18px", height: 16 }}
          />
        );
        setRescheduleButtonText(
          <img
            src={rescheduleicon}
            alt=""
            style={{ width: "18px", height: 16 }}
          />
        );
        setCancelButtonText(
          <img src={cancelicon} alt="" style={{ width: "18px", height: 16 }} />
        );
        setCreateAppointmentButtonText(
          <img
            src={createAppointmentIcon}
            alt=""
            style={{ width: "18px", height: 16 }}
          />
        );
      } else {
        setLocateButtonText(<>Locate on Map</>);
        setRescheduleButtonText(<>Reschedule</>);
        setCancelButtonText(<>Cancel</>);
        setCreateAppointmentButtonText(<>Create an Appointment</>);
      }
    };
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div className="appointment-page-main-div">
      <Helmet>
        <title>Appointments</title>
      </Helmet>
      <Row
        style={{
          height: "6.564102564102564vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontWeight: 700,
            fontSize: 22,
            margin: "0 0 0 22px",
            color: "#525252",
          }}
        >
          Appointments
        </span>
      </Row>
      <Row className="d-flex jc-evenly">
        <div
          style={{
            width: "100%",
            margin: "0 23px",
            padding:
              appointmentTableData && appointmentTableData.length > 0
                ? "20px 33px"
                : "",
            minHeight: "75vh",
            background: "#FFF",
          }}
        >
          {appointmentTableData && appointmentTableData.length === 0 ? (
            <Row className="d-flex jc-center">
              <div
                style={{
                  margin: "38px 33px",
                  width: "100%",
                  height: "18.76923076923077vh",
                  background: "#FBFBFB",
                  borderRadius: 5,
                  gap: "1.5384615384615385vh",
                }}
                className="d-flex flex-col jc-center ai-center"
              >
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: 20,
                    color: "#525252",
                  }}
                >
                  Currently you have no appointments
                </span>
                <Button
                  style={{
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#29C3C1",
                    background: "#ECFEFF",
                    border: "1px solid #29C3C1",
                    borderRadius: 30,
                  }}
                  onClick={openCreateAppointmentodal}
                >
                  Create an Appointment
                </Button>
              </div>
            </Row>
          ) : (
            <>
              <Row
                className="appointment-heading-row"
                style={{
                  padding: "20px 33px",
                }}
              >
                <Col span={2}>
                  <span className="appointment-date-heading">Date</span>
                </Col>
                <Col span={3}>
                  <span className="appointment-date-heading">Clinic Name</span>
                </Col>
                <Col span={5}>
                  <span className="appointment-date-heading">Address</span>
                </Col>
                <Col span={4}>
                  <span className="appointment-date-heading">
                    Appointment Details
                  </span>
                </Col>
                <Col span={4} style={{ padding: "0 0 0 60px" }}>
                  <span className="appointment-date-heading">
                    Appointment Status
                  </span>
                </Col>
                <Col
                  span={6}
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    style={{
                      fontWeight: 600,
                      fontSize: 14,
                      color: "#29C3C1",
                      background: "#ECFEFF",
                      border: "1px solid #29C3C1",
                      borderRadius: 30,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={openCreateAppointmentodal}
                  >
                    {createAppointmentButtonText}
                  </Button>
                </Col>
              </Row>
              <Row
                style={{
                  padding: "20px 33px",
                  display: window.innerWidth > 768 && "none",
                }}
              >
                <Button
                  style={{
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#29C3C1",
                    background: "#ECFEFF",
                    border: "1px solid #29C3C1",
                    borderRadius: 30,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={openCreateAppointmentodal}
                >
                  Create an Appointment
                </Button>
              </Row>
            </>
          )}
          {appointmentTableData &&
            currentData.map((item) => {
              return (
                <Apppointments
                  date={item.created_at}
                  clinic_name={item.clinic.name}
                  clinic_id={item.clinic.id}
                  address_line_one={item.clinic.address.address_line_one}
                  address_line_two={item.clinic.address.address_line_two}
                  city={item.clinic.address.city}
                  country={item.clinic.address.country}
                  zip_code={item.clinic.address.zip_code}
                  from_date={item.from_date}
                  appointment_status={item.status}
                  scheduled_by={item.scheduled_by}
                  appointment_id={item.id}
                  treatment_type_id={item.treatment_type_id}
                  email={item.clinic.email}
                  phone={item.clinic.phone}
                  setIsOpenClinicDetailsModal={item.setIsOpenClinicDetailsModal}
                  handleGetAllAppointments={handleGetAllAppointments}
                  treatmentTypes={treatmentTypes}
                  locateButtonText={locateButtonText}
                  rescheduleButtonText={rescheduleButtonText}
                  cancelButtonText={cancelButtonText}
                  clinicDetails={clinicDetails}
                />
              );
            })}
        </div>
        <Row
          style={{
            width: "100%",
            margin: "23px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={appointmentTableData && appointmentTableData.length}
            onChange={onPageChange}
          />
        </Row>
      </Row>
      <CreateAppointmentModal
        handleGetAllAppointments={handleGetAllAppointments}
        openCreateAppointmentModal={openCreateAppointmentModal}
        setOpenCreateAppointmentModal={setOpenCreateAppointmentModal}
        treatmentTypes={treatmentTypes}
        clinicDetails={clinicDetails}
        handleGetAllClinicDetails={handleGetAllClinicDetails}
      />
    </div>
  );
};

export default AppointmentPage;
