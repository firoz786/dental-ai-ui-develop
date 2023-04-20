import { Button, Col, Modal, Row, Input } from "antd";
import React, { useEffect, useState } from "react";
import "./PatientDashboard.css";
import {
  EnvironmentOutlined,
  CloseOutlined,
  MailOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import location_icon from "../../../../assets/location-icon.png";
import MobileIcon from "../../../../assets/mobile-icon.png";
import calendar_icon from "../../../../assets/calendar-icon.png";
import BloodDrop from "../../../../assets/Blood-drop.png";
import CitizenId from "../../../../assets/citizen-id-icon.png";
import InsurenceID from "../../../../assets/insurence-id.png";
import GenderIcon from "../../../../assets/gender-icon.png";
import noanalysisicon from "../../../../assets/no-analysis-icon.png";
import EditIcon from "../../../../assets/edit-icon.png";
import ClinicIcon from "../../../../assets/clinic-icon.png";
import ProfileIcon from "../../../../assets/profile-icon.png";
import LocationIcon from "../../../../assets/location-icon.png";
import CalendarIcon from "../../../../assets/calendar-icon.png";
import noxrayicon from "../../../../assets/no-xray-icon.png";
import RescheduleAppointmentModal from "../appointment_page/appointment_modals/RescheduleAppointmentModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  routes_appointments,
  routes_clinics,
  routes_mlanalysis,
  routes_myaccount,
  routes_surveys,
  tabs_appointments,
  tabs_clinics,
  tabs_mlanalysis,
  tabs_myaccount,
  tabs_surveys,
} from "../../../../utils/patient_navbar_constants/PatientNavbarConstants";
import { UserAuth } from "../../../../context_api/ContextApi";
import DoctorProfileIcon from "../../../../assets/profile-icon.png";
import moment from "moment";
import { _status_cancelled } from "../../../../utils/appointment_constants/AppointmentConstants";
import ProfilePic from "../../../../assets/default-profile-pic.png";
import { XrayAndReportComponent } from "./xray_and_report_data_component/XrayAndReportComponent";
import { Helmet } from "react-helmet";

const PatientDashboard = (props) => {
  const navigate = useNavigate();
  const { setTabActiveKey, setInputsEnable } = UserAuth();
  const [openCancelAppointmentModal, setOpenCancelAppointmentModal] =
    useState(false);
  const [clinicDetails, setClinicDetails] = useState();

  const patientid = localStorage.getItem("PatientID");
  const Token = localStorage.getItem("Token");
  const [treatmentTypes, setTreatmentTypes] = useState();
  const [downloadDocModal, setDownloadDocModal] = useState(false);
  const [openRescheduleAppointmentModal, setOpenRescheduleAppointmentModal] =
    useState(false);
  const [IsOpenFullXrayModal, setIsOpenFullXrayModal] = useState(false);
  const [patientDashboardInfoDetails, setPatientDashboardInfoDetails] =
    useState([]);
  const [patientDashboardReportsDetails, setPatientDashboardReportsDetails] =
    useState([]);
  const [patientDashboardSurveysDetails, setPatientDashboardSurveysDetails] =
    useState([]);
  const [patientDashboardTodayDetails, setPatientDashboardTodayDetails] =
    useState([]);
  const [treatmentId, setTreatmentId] = useState();
  const [appointmentId, setAppointmentId] = useState();
  const [fromDate, setFromDate] = useState();
  const [scheduledBy, setScheduledBy] = useState();
  const [xrayMimeType, setxrayMimeType] = useState("");
  const [xrayImageUrl, setXrayImageUrl] = useState("");
  const [xrayArrayId, setXrayArrayId] = useState();
  const [ReportArrayId, setReporArraytId] = useState();
  const openResheduleAppointmentmodal = () => {
    setOpenRescheduleAppointmentModal(true);
  };

  const handleCancelAppointment = () => {
    const payload = {
      patient_id: patientid,
      clinic_id: patientid,
      treatment_type_id: treatmentId,
      from_date: fromDate,
      scheduled_by: scheduledBy,
      status: _status_cancelled,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };
    axios
      .put(
        `http://ec2-3-6-218-218.ap-south-1.compute.amazonaws.com:8080/api/v1/appointment/${appointmentId}`,
        payload,
        config
      )
      .then((res) => {
        getPatientDashboardDetails();
        setOpenCancelAppointmentModal(false);
      });
  };

  const getPatientDashboardDetails = async () => {
    let config = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };
    await axios
      .get(
        `http://ec2-3-6-218-218.ap-south-1.compute.amazonaws.com:8080/api/v1/patient/${patientid}/dashboard`,
        config
      )
      .then((res) => {
        setClinicDetails(res.data.data.clinics);
        setPatientDashboardInfoDetails(res.data.data.patient_info);
        setPatientDashboardReportsDetails(res.data.data.reports);
        setPatientDashboardSurveysDetails(res.data.data.surveys);
        setFromDate(res.data.data.today_appointments[0].from_date);
        setScheduledBy(res.data.data.today_appointments[0].scheduled_by);
        setAppointmentId(res.data.data.today_appointments[0].id);
        setTreatmentId(res.data.data.today_appointments[0].treatment_type_id);
        setPatientDashboardTodayDetails(res.data.data.today_appointments);
      });
  };

  const openReportModalAndSendingImageUrl = (fileMimeType, imageUrl, width) => {
    setDownloadDocModal(true);
    setxrayMimeType(fileMimeType);
    setXrayImageUrl(imageUrl);
  };

  const handleSendingReportImageUrl = (fileMimeType, imageUrl) => {
    setxrayMimeType(fileMimeType);
    setXrayImageUrl(imageUrl);
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
        const defaultTreatmentType = res.data.data
          .filter(
            (item) => item.id === patientDashboardTodayDetails.treatment_type_id
          )
          .map((item) => item.name);
        setTreatmentTypes(res.data.data);
      });
  };

  const xraydata = [
    {
      id: 1,
      clinic: "Happy Smile Clinic",
      clinicid: "Cln ID: # 365-546",
      timestamp: "Sat, 23/01/2023 09:30 AM",
      documents: [
        { doc: "Document name 1" },
        { doc: "Document name 2" },
        { doc: "Document name 3" },
        { doc: "Document name 4" },
        { doc: "Document name 5" },
        { doc: "Document name 6" },
        { doc: "Document name 7" },
      ],
    },
    {
      id: 2,
      clinic: "Happy Smile Clinic",
      clinicid: "Cln ID: # 365-546",
      timestamp: "Sat, 23/01/2023 09:30 AM",
      documents: [
        { doc: "Document name 1" },
        { doc: "Document name 2" },
        { doc: "Document name 3" },
      ],
    },
    {
      id: 3,
      clinic: "Self",
      clinicid: "Cln ID: # 365-546",
      timestamp: "Sat, 23/01/2023 09:30 AM",
      documents: [
        { doc: "Document name 1" },
        { doc: "Document name 2" },
        { doc: "Document name 3" },
        { doc: "Document name 3" },
        { doc: "Document name 3" },
      ],
    },
    {
      id: 4,
      clinic: "Happy Smile Clinic",
      clinicid: "Cln ID: # 365-546",
      timestamp: "Sat, 23/01/2023 09:30 AM",
      documents: [{ doc: "Document name 1" }, { doc: "Document name 3" }],
    },
    {
      id: 5,
      clinic: "Happy Smile Clinic",
      clinicid: "Cln ID: # 365-546",
      timestamp: "Sat, 23/01/2023 09:30 AM",
      documents: [
        { doc: "Document name 1" },
        { doc: "Document name 2" },
        { doc: "Document name 3" },
        { doc: "Document name 3" },
      ],
    },
    {
      id: 6,
      clinic: "Happy Smile Clinic",
      clinicid: "Cln ID: # 365-546",
      timestamp: "Sat, 23/01/2023 09:30 AM",
      documents: [{ doc: "Document name 1" }, { doc: "Document name 3" }],
    },
    {
      id: 7,
      clinic: "Self",
      clinicid: "Cln ID: # 365-546",
      timestamp: "Sat, 23/01/2023 09:30 AM",
      documents: [{ doc: "Document name 2" }, { doc: "Document name 3" }],
    },
  ];

  const navigateToMyAccountPage = () => {
    navigate(routes_myaccount);
    setTabActiveKey(tabs_myaccount);
  };
  const handleNavigateToMlAnalysis = () => {
    navigate(routes_mlanalysis);
    setTabActiveKey(tabs_mlanalysis);
  };

  const navigateToMyAccountPageAndEdit = () => {
    navigate(routes_myaccount);
    setTabActiveKey(tabs_myaccount);
    setInputsEnable(false);
  };

  const navigateToSurveyPage = () => {
    navigate(routes_surveys);
    setTabActiveKey(tabs_surveys);
  };

  const handleNavigateToClinicsPage = () => {
    navigate(routes_clinics);
    setTabActiveKey(tabs_clinics);
  };

  useEffect(() => {
    getPatientDashboardDetails();
    handleGetAllTreatmentTypes();
  }, []);
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="patient-dashboard-main-div">
      <Helmet>
        <title>Patient Dashboard</title>
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
            margin: "0 0 0 1.25vw",
            color: "#525252",
          }}
        >
          Patient Dashboard
        </span>
      </Row>
      <Row
        className="dashboard-modules-row"
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {/* My account */}
        <Col xs={24} sm={12} lg={6} style={{ display: "flex", height: "100%" }}>
          <div className="dashboard-myaccount-main-div">
            <div
              style={{
                width: "100%",
                borderBottom: "1px solid #D9D9D9",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <Row style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="my-account-text-tag">My Account</span>
                <span style={{ color: "#2CA3FA", cursor: "pointer" }}>
                  <u onClick={navigateToMyAccountPage}>View</u>
                </span>
              </Row>

              <Row style={{ padding: "19px 0 29px 0" }}>
                <Col
                  style={{
                    padding: "0 1.3020833333333333vw 0 0",
                  }}
                >
                  {patientDashboardInfoDetails && (
                    <img
                      style={{
                        height: "78px",
                        width: "78px",
                        borderRadius: "24px",
                      }}
                      src={
                        patientDashboardInfoDetails.profile_picture_url
                          ? patientDashboardInfoDetails.profile_picture_url
                          : ProfilePic
                      }
                      alt=""
                    />
                  )}
                </Col>
                <Col
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                  md={10}
                  xl={11}
                  xxl={15}
                >
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "#7D7D7D",
                    }}
                  >
                    {patientDashboardInfoDetails &&
                      patientDashboardInfoDetails.name}
                  </span>
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#000000",
                    }}
                  >
                    PID#
                    <span style={{ color: "#7D7D7D" }}>
                      {patientDashboardInfoDetails &&
                        patientDashboardInfoDetails.user_id}
                    </span>
                  </span>
                </Col>
                <Col
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "#E1F7FF",
                      height: "34px",
                      width: "34px",
                      borderRadius: "50%",
                    }}
                  >
                    <img
                      src={EditIcon}
                      style={{
                        height: "13px",
                        cursor: "pointer",
                      }}
                      onClick={navigateToMyAccountPageAndEdit}
                      alt=""
                    />
                  </div>
                </Col>
              </Row>
            </div>
            <div
              style={{
                padding: "23px 0",
                width: "100%",
                borderBottom: "1px solid #D9D9D9",
              }}
            >
              <Row>
                <Col
                  style={{ display: "flex", justifyContent: "center" }}
                  span={3}
                >
                  <img src={GenderIcon} alt="" style={{ height: "16px" }} />
                </Col>
                <Col
                  span={10}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <span className="account-details-header">Gender</span>
                  {patientDashboardInfoDetails && (
                    <span className="account-details">
                      {patientDashboardInfoDetails.gender}
                    </span>
                  )}
                </Col>
              </Row>
            </div>
            <div
              style={{
                padding: "23px 0",
                width: "100%",
                borderBottom: "1px solid #D9D9D9",
              }}
            >
              <Row>
                <Col
                  style={{ display: "flex", justifyContent: "center" }}
                  span={3}
                >
                  <EnvironmentOutlined
                    style={{ fontSize: "16px", color: "#009DF7" }}
                  />
                </Col>
                <Col
                  span={10}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <span className="account-details-header">Address</span>
                  {patientDashboardInfoDetails && (
                    <>
                      <span className="account-details">
                        {patientDashboardInfoDetails.address_line_one}
                      </span>
                      <span className="account-details">
                        {patientDashboardInfoDetails.address_line_two}
                      </span>
                      <span className="account-details">
                        {patientDashboardInfoDetails.city}
                      </span>
                      <span className="account-details">
                        {patientDashboardInfoDetails.province}
                      </span>
                      <span className="account-details">
                        {patientDashboardInfoDetails.country}&nbsp;-&nbsp;
                        {patientDashboardInfoDetails.zip_code}
                      </span>
                    </>
                  )}
                </Col>
              </Row>
            </div>
            <div
              style={{
                padding: "23px 0",
                width: "100%",
                borderBottom: "1px solid #D9D9D9",
              }}
            >
              <Row>
                <Col
                  style={{ display: "flex", justifyContent: "center" }}
                  span={3}
                >
                  <MailOutlined
                    style={{ fontSize: "16px", color: "#009DF7" }}
                  />
                </Col>
                <Col
                  span={10}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <span className="account-details-header">Email</span>
                  {patientDashboardInfoDetails && (
                    <span className="account-details">
                      {patientDashboardInfoDetails.email}
                    </span>
                  )}
                </Col>
              </Row>
            </div>
            <div
              style={{
                padding: "23px 0",
                width: "100%",
                borderBottom: "1px solid #D9D9D9",
              }}
            >
              <Row>
                <Col
                  style={{ display: "flex", justifyContent: "center" }}
                  span={3}
                >
                  <img src={MobileIcon} alt="" style={{ height: "16px" }} />
                </Col>
                <Col
                  span={10}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <span className="account-details-header">Phone</span>
                  {patientDashboardInfoDetails && (
                    <span className="account-details">
                      {patientDashboardInfoDetails.phone_country_code}&nbsp;
                      {patientDashboardInfoDetails.phone_number}
                    </span>
                  )}
                </Col>
              </Row>
            </div>
            <div
              style={{
                padding: "23px 0",
                width: "100%",
                borderBottom: "1px solid #D9D9D9",
              }}
            >
              <Row>
                <Col
                  style={{ display: "flex", justifyContent: "center" }}
                  span={3}
                >
                  <img src={BloodDrop} alt="" style={{ height: "16px" }} />
                </Col>
                <Col
                  span={10}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <span className="account-details-header">Blood Group</span>
                  {patientDashboardInfoDetails && (
                    <span className="account-details">
                      {patientDashboardInfoDetails.blood_group}
                    </span>
                  )}
                </Col>
              </Row>
            </div>
            <div
              style={{
                padding: "23px 0",
                width: "100%",
                borderBottom: "1px solid #D9D9D9",
              }}
            >
              <Row>
                <Col
                  style={{ display: "flex", justifyContent: "center" }}
                  span={3}
                >
                  <img src={CitizenId} alt="" style={{ height: "16px" }} />
                </Col>
                <Col
                  span={10}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <span className="account-details-header">Citizen ID</span>
                  {patientDashboardInfoDetails && (
                    <span className="account-details">
                      {patientDashboardInfoDetails.citizen_id}
                    </span>
                  )}
                </Col>
              </Row>
            </div>
            <div style={{ width: "100%", padding: "23px 0" }}>
              <Row>
                <Col
                  style={{ display: "flex", justifyContent: "center" }}
                  span={3}
                >
                  <img src={InsurenceID} alt="" style={{ height: "16px" }} />
                </Col>
                <Col
                  span={10}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <span className="account-details-header">Insurance ID</span>
                  {patientDashboardInfoDetails && (
                    <span className="account-details">
                      {patientDashboardInfoDetails.insurance_id}
                    </span>
                  )}
                </Col>
              </Row>
            </div>
          </div>
        </Col>
        {/* ml, articles, surveys */}
        <Col
          xs={24}
          sm={12}
          lg={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className="mlanalysis-articles-surveys-div">
            {/* My Analysis */}
            <Row className="d-flex jc-center dashboard-mlanalysis-main-div">
              {patientDashboardReportsDetails ? (
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
                      ML Analysis-Reports ({xraydata.length})
                    </span>
                    {patientDashboardReportsDetails.length > 0 && (
                      <u
                        style={{
                          fontWeight: 400,
                          fontSize: 14,
                          color: "#2CA3FA",
                          cursor: "pointer",
                        }}
                        onClick={handleNavigateToMlAnalysis}
                      >
                        View All
                      </u>
                    )}
                  </Row>
                  {patientDashboardReportsDetails.length > 0 && (
                    <Row
                      style={{
                        padding: "0 13px",
                        margin: "23px 15px 15px 0",
                      }}
                    >
                      <Col span={4}>
                        <span className="xray-details-heading">
                          Upload Date
                        </span>
                      </Col>
                      <Col span={11}>
                        <span className="xray-details-heading">
                          Clinic Name / Self
                        </span>
                      </Col>
                      <Col span={5}>
                        <span className="xray-details-heading">
                          Xray Reports
                        </span>
                      </Col>
                      <Col span={4}>
                        <span className="xray-details-heading">
                          Other Reports
                        </span>
                      </Col>
                    </Row>
                  )}
                  <Row
                    style={{
                      overflowY: "scroll",
                    }}
                  >
                    {patientDashboardReportsDetails.length > 0 ? (
                      patientDashboardReportsDetails.map(
                        (xrayAndReportData, id) => {
                          return (
                            <XrayAndReportComponent
                              patientDashboardReportsDetails={
                                patientDashboardReportsDetails
                              }
                              openReportModalAndSendingImageUrl={
                                openReportModalAndSendingImageUrl
                              }
                              IsOpenFullXrayModal={IsOpenFullXrayModal}
                              setIsOpenFullXrayModal={setIsOpenFullXrayModal}
                              xrayAndReportData={xrayAndReportData}
                              xrayAndReportId={id}
                              xrayArrayId={xrayArrayId}
                              setXrayArrayId={setXrayArrayId}
                              xrayMimeType={xrayMimeType}
                              xrayImageUrl={xrayImageUrl}
                              setReporArraytId={setReporArraytId}
                              ReportArrayId={ReportArrayId}
                            />
                          );
                        }
                      )
                    ) : (
                      <Row
                        className="d-flex jc-center ai-center w-100"
                        style={{
                          padding: "33px 33px 0 33px",
                          background: "#FBFBFB",
                          height: "48.61538461538461vh",
                        }}
                      >
                        <div
                          className="d-flex flex-col ai-center"
                          style={{
                            gap: "20px",
                          }}
                        >
                          <img
                            src={noxrayicon}
                            alt=""
                            style={{
                              width: 140,
                              height: 140,
                            }}
                          />
                          <span
                            className="d-flex jc-center ai-center w-100"
                            style={{
                              fontWeight: 400,
                              fontSize: 14,
                              color: "#525252",
                            }}
                          >
                            Currently there is no data to display. You can add
                            an X-Ray to analyse it...
                          </span>
                          <Button
                            style={{
                              display: "flex",
                              alignItems: "center",
                              height: "32px",
                              border: "1px solid #009DF7",
                              borderRadius: "30px",
                              fontWeight: "600",
                              fontSize: "16px",
                              color: "#2CA3FA",
                            }}
                            onClick={handleNavigateToMlAnalysis}
                          >
                            Add Xray/Reports
                          </Button>
                        </div>
                      </Row>
                    )}
                  </Row>
                </div>
              ) : (
                <>
                  <div
                    style={{
                      width: "100%",
                    }}
                    className="d-flex ai-center"
                  >
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: 18,
                        margin: "0 0 0 19px",
                        color: "#525252",
                      }}
                    >
                      No Data To Display
                    </span>
                  </div>
                  <div
                    style={{
                      width: "45.833333333333336vw",
                      backgroundColor: "#FBFBFB",
                      height: "48.61538461538461vh",
                      borderRadius: 5,
                    }}
                    className="d-flex jc-center ai-center"
                  >
                    <Row
                      style={{
                        width: "100%",
                        flexDirection: "column",
                      }}
                      className="d-flex jc-center ai-center flex-col"
                    >
                      <div
                        style={{
                          width: "7.291666666666667vw",
                          height: "14.35897435897436vh",
                          background: "#E0F2FF",
                          borderRadius: "50%",
                        }}
                        className="d-flex jc-center ai-center"
                      >
                        <img
                          src={noanalysisicon}
                          alt=""
                          style={{ width: "3.5vw" }}
                        />
                      </div>
                      <span
                        style={{
                          margin: "1.75vh 0 0 0",
                          fontSize: 14,
                          textAlign: "center",
                          color: "#525252",
                        }}
                      >
                        Currently there is no data
                      </span>
                      <span
                        style={{
                          fontSize: 14,
                          textAlign: "center",
                          color: "#525252",
                        }}
                      >
                        to display. You can add an X-Ray to analyse it...
                      </span>
                      <Button className="add-xray-btn">Add X-Ray</Button>
                    </Row>
                  </div>
                </>
              )}
            </Row>
            {/* Articles and Surveys row */}
            <Row
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                margin: "2.358974358974359vh 0 0 0",
              }}
            >
              {/* Articles */}
              <Col lg={12} sm={24}>
                <div className="dashboard-articles-main-div">
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        color: "#525252",
                        fontWeight: "700",
                        fontSize: "18px",
                      }}
                    >
                      Articles
                    </span>
                    <span
                      style={{
                        color: "#2CA3FA",
                        fontWeight: "400",
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                    >
                      <u>View All</u>
                    </span>
                  </Row>
                  <Row
                    style={{
                      padding: "15px",
                      background: "#FBFBFB",
                      borderRadius: "5px",
                      margin: "17px 0 0 0",
                      minHeight: "8.102564102564102vh",
                    }}
                  >
                    <Col
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                      span={16}
                    >
                      <Row>
                        <span
                          style={{
                            color: "#525252",
                            fontSize: "16px",
                            fontWeight: "600",
                            lineHeight: "104.52%",
                          }}
                        >
                          How much do you know about your teeth?
                        </span>
                      </Row>
                      <Row>
                        <span
                          style={{
                            color: "#2CA3FA",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                        >
                          By DR.Jason Hogg
                        </span>
                      </Row>
                    </Col>
                    <Col
                      style={{ display: "flex", justifyContent: "end" }}
                      span={8}
                    >
                      <Button
                        shape="round"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          width: "60px",
                          height: "30px",
                          border: "1px solid #009DF7",
                          color: "#2CA3FA",
                          fontWeight: "600",
                          fontSize: "14px",
                        }}
                      >
                        Read
                      </Button>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      padding: "15px",
                      background: "#FBFBFB",
                      borderRadius: "5px",
                      margin: "16px 0 0 0",
                      minHeight: "8.102564102564102vh",
                    }}
                  >
                    <Col
                      style={{ display: "flex", flexDirection: "column" }}
                      span={16}
                    >
                      <span
                        style={{
                          color: "#525252",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        Get the most popular smile...
                      </span>
                      <span
                        style={{
                          color: "#2CA3FA",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        By Dr.Jason Hogg
                      </span>
                    </Col>
                    <Col
                      style={{ display: "flex", justifyContent: "end" }}
                      span={8}
                    >
                      <Button
                        shape="round"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          width: "60px",
                          height: "30px",
                          border: "1px solid #009DF7",
                          color: "#2CA3FA",
                          fontWeight: "600",
                          fontSize: "14px",
                        }}
                      >
                        Read
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Col>

              {/* surveys */}
              <Col
                lg={12}
                sm={24}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                }}
              >
                <div className="dashboard-surveys-main-div">
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        color: "#525252",
                        fontWeight: "700",
                        fontSize: "18px",
                      }}
                    >
                      Survey
                    </span>
                    <span
                      style={{
                        color: "#2CA3FA",
                        fontWeight: "400",
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                    >
                      <u onClick={navigateToSurveyPage}>View All</u>
                    </span>
                  </Row>
                  {patientDashboardSurveysDetails &&
                    patientDashboardSurveysDetails.map((surveydata) => {
                      return (
                        <Row
                          style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "15px",
                            background: "#FBFBFB",
                            borderRadius: "5px",
                            margin: "17px 0 0 0",
                            minHeight: "8.102564102564102vh",
                          }}
                          className="d-flex jc-between"
                        >
                          <Col>
                            <span
                              style={{
                                color: "#525252",
                                fontSize: "16px",
                                fontWeight: "600",
                              }}
                            >
                              {surveydata.text}
                            </span>
                          </Col>
                          <Col
                            style={{ display: "flex", justifyContent: "end" }}
                            // span={8}
                          >
                            <Button
                              shape="round"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                width: "109px",
                                height: "30px",
                                border: "1px solid #009DF7",
                                color: "#2CA3FA",
                                fontWeight: "600",
                                fontSize: "14px",
                              }}
                              onClick={navigateToSurveyPage}
                            >
                              Participate
                            </Button>
                          </Col>
                        </Row>
                      );
                    })}
                </div>
              </Col>
            </Row>
          </div>
        </Col>

        {/* Clinics and Appointments Row */}
        <Col
          xs={24}
          sm={24}
          lg={6}
          style={{ display: "flex", justifyContent: "end", height: "100%" }}
        >
          <Row style={{ width: "100%" }}>
            {/* Appointements */}
            <Col
              lg={24}
              sm={12}
              xs={24}
              className="dashboard-appointments-main-div"
            >
              <div className="dashboard-appointments-div">
                <Row>
                  <span
                    style={{
                      color: "#525252",
                      fontWeight: "700",
                      fontSize: "18px",
                    }}
                  >
                    Today's Appointment
                  </span>
                </Row>

                {/* It renders If Todays's Appointements is there */}
                {patientDashboardTodayDetails.filter(
                  (todayAppointment) =>
                    todayAppointment.status !== _status_cancelled
                ) &&
                  patientDashboardTodayDetails
                    .slice(1)
                    .filter(
                      (todayAppointment) =>
                        todayAppointment.status !== _status_cancelled
                    )
                    .map((todayAppointment, id) => {
                      return (
                        <Row
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            padding: "15px",
                            background: "#FBFBFB",
                            borderRadius: "5px",
                            margin: "17px 0 0 0",
                            gap: "8px",
                          }}
                        >
                          <Row>
                            <span
                              style={{
                                fontWeight: "600",
                                fontSize: "16px",
                                color: "#525252",
                              }}
                            >
                              Happy Smile Clinic
                            </span>
                          </Row>

                          <Row>
                            <Col span={2}>
                              <img
                                style={{ height: "17px" }}
                                src={ProfileIcon}
                                alt=""
                              />
                            </Col>
                            <Col span={22}>
                              <span
                                style={{
                                  fontWeight: "600",
                                  fontSize: "16px",
                                  color: "#7D7D7D",
                                }}
                              >
                                Dr. Jonathan Drew
                              </span>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={2}>
                              <img
                                style={{ height: "17px" }}
                                src={LocationIcon}
                                alt=""
                              />
                            </Col>
                            <Col span={22}>
                              <span
                                style={{
                                  fontWeight: "600",
                                  fontSize: "16px",
                                  color: "#7D7D7D",
                                }}
                              >
                                Lorem ipsum dolor sit amet consectetur
                                pellentesque
                              </span>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={2}>
                              <img
                                style={{ height: "16px" }}
                                src={CalendarIcon}
                                alt=""
                              />
                            </Col>
                            <Col span={22}>
                              <Row>
                                <Col span={15}>
                                  <span
                                    style={{
                                      fontWeight: "600",
                                      fontSize: "16px",
                                      color: "#525252",
                                    }}
                                  >
                                    {todayAppointment.from_date &&
                                      moment(todayAppointment.from_date).format(
                                        "ddd, DD/MM/YYYY HH:mm A"
                                      )}
                                  </span>
                                </Col>
                              </Row>
                              <Row>
                                <span
                                  style={{
                                    fontWeight: "600",
                                    fontSize: "16px",
                                    color: "#7D7D7D",
                                  }}
                                >
                                  {treatmentId &&
                                    treatmentTypes
                                      .filter((item) => item.id === treatmentId)
                                      .map((item) => {
                                        return <>Treatment : {item.name}</>;
                                      })}
                                </span>
                              </Row>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={7}>
                              <Button
                                style={{
                                  width: "83px",
                                  height: "30px",
                                  border: "1px solid #F7927E",
                                  background: "#FFF6F2",
                                  borderRadius: "30px",
                                  color: "#F7927E",
                                }}
                                onClick={() => {
                                  setOpenCancelAppointmentModal(true);
                                  setAppointmentId(todayAppointment.id);
                                }}
                              >
                                Cancel
                              </Button>
                            </Col>
                            <Col>
                              <Button
                                style={{
                                  width: "102px",
                                  height: "30px",
                                  border: "1px solid #17A1FA",
                                  background: "#FFFFFF",
                                  borderRadius: "30px",
                                  color: "#17A1FA",
                                }}
                                onClick={openResheduleAppointmentmodal}
                              >
                                Reschedule
                              </Button>
                              <RescheduleAppointmentModal
                                openRescheduleAppointmentModal={
                                  openRescheduleAppointmentModal
                                }
                                setOpenRescheduleAppointmentModal={
                                  setOpenRescheduleAppointmentModal
                                }
                                defaultDate={moment(todayAppointment.from_date)}
                                treatmentTypes={treatmentTypes}
                                treatmentTypeId={treatmentId}
                                appointment_id={appointmentId}
                                handleGetAllAppointments={
                                  getPatientDashboardDetails
                                }
                              />
                            </Col>
                          </Row>
                        </Row>
                      );
                    })}
                {patientDashboardTodayDetails.filter(
                  (todayAppointment) =>
                    todayAppointment.status === _status_cancelled
                ) && (
                  <Row
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                      padding: "26px 0 22px 0",
                      background: "#FBFBFB",
                      borderRadius: "5px",
                      margin: "17px 0 0 0",
                      gap: "15px",
                    }}
                  >
                    <Row>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "50%",
                          height: "140px",
                          width: "140px",
                          background: "#E0F2FF",
                        }}
                      >
                        <img
                          style={{ height: "57px" }}
                          src={DoctorProfileIcon}
                          alt=""
                        />
                      </div>
                    </Row>
                    <Row>
                      <span style={{ fontWeight: "400", fontSize: "14px" }}>
                        There are no Appointements to display!!
                      </span>
                    </Row>
                    <Row>
                      <Button
                        style={{
                          width: "196px",
                          height: "28px",
                          border: "1px solid #009DF7",
                          borderRadius: "30px",
                          color: "#2CA3FA",
                        }}
                        onClick={() => {
                          navigate(routes_appointments);
                          setTabActiveKey(tabs_appointments);
                        }}
                      >
                        Book an Appointment
                      </Button>
                    </Row>
                  </Row>
                )}
              </div>
            </Col>

            {/* Clinics */}
            <Col lg={24} sm={12} xs={24} className="dashboard-clinics-main-div">
              <div className="dashboard-clinics-div">
                <Row className="d-flex jc-between ai-center">
                  <span
                    style={{
                      fontWeight: "700",
                      fontSize: "18px",
                      color: "#525252",
                    }}
                  >
                    Clinics
                  </span>
                  <span
                    style={{
                      fontWeight: "400",
                      fontSize: "14px",
                      color: "#2CA3FA",
                      cursor: "pointer",
                      textDecorationLine: "underline",
                    }}
                    onClick={handleNavigateToClinicsPage}
                  >
                    View All
                  </span>
                </Row>
                <Row>
                  <Input
                    style={{
                      height: 40,
                      margin: "12px 0 0 0",
                    }}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search"
                    prefix={<SearchOutlined style={{ opacity: 0.5 }} />}
                  />
                </Row>
                {clinicDetails && clinicDetails.length > 0 ? (
                  <Row
                    style={{
                      height: "40vh",
                      overflowY: "auto",
                      overflowX: "hidden",
                      margin: "24px 0",
                    }}
                  >
                    {clinicDetails &&
                      clinicDetails
                        .filter((item) =>
                          item.name
                            .toLowerCase()
                            .includes(searchInput.toLowerCase())
                        )
                        .map((item) => {
                          return (
                            <div
                              style={{
                                width: "100%",
                                minHeight: 192,
                                background: "#FBFBFB",
                                borderRadius: 5,
                                margin: "0 0 24px 0",
                                padding: "18px",
                              }}
                            >
                              <Row>
                                <span className="dashboard-clinic-name-text">
                                  {item.name}
                                </span>
                              </Row>
                              <Row>
                                <span className="dashboard-clinic-id-text">
                                  Cln ID: #&nbsp;{item.user_id}
                                </span>
                              </Row>
                              <Row style={{ padding: "18px 0 0 0" }}>
                                <Col span={1}>
                                  <img
                                    src={location_icon}
                                    alt=""
                                    style={{
                                      width: "13px",
                                      height: "16px",
                                      margin: "2px 7px 0 0",
                                    }}
                                  />
                                </Col>
                                <Col span={22}>
                                  <span className="address">
                                    {item.address_line_one},&nbsp;
                                    {item.address_line_two},&nbsp;
                                    {item.city},&nbsp;
                                    {item.province},&nbsp;
                                    {item.country},&nbsp;
                                    {item.zip_code}
                                  </span>
                                </Col>
                              </Row>
                              <Row style={{ gap: "17px", padding: "20px 0 " }}>
                                <Button className="locate-btn">
                                  Locate on Map
                                </Button>
                                <Button
                                  className="consult-btn"
                                  // onClick={() => setOpenCreateAppointmentModal(true)}
                                >
                                  Consult
                                </Button>
                              </Row>
                            </div>
                          );
                        })}
                  </Row>
                ) : (
                  <Row
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      justifyContent: "center",
                      background: "#FBFBFB",
                      height: "48.61538461538461vh",
                    }}
                  >
                    <Row>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "140px",
                          width: "140px",
                          borderRadius: "50%",
                          background: "#E0F2FF",
                        }}
                      >
                        <img
                          style={{ height: "76px" }}
                          src={ClinicIcon}
                          alt=""
                        />
                      </div>
                    </Row>
                    <Row
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        margin: "5vh 0 0 0",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "400",
                          fontSize: "14px",
                          color: "#525252",
                        }}
                      >
                        You can start by searching for a Dental Clinic
                      </span>
                      <span>near you and book an appointment</span>
                    </Row>
                    <Row style={{ margin: "5vh 0 0 0", width: "100%" }}>
                      <Input
                        style={{
                          width: "100%",
                          height: "40px",
                          margin: "0 27px",
                        }}
                      />
                    </Row>
                  </Row>
                )}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

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
                {patientDashboardTodayDetails &&
                  patientDashboardTodayDetails
                    .slice(1)
                    .filter(
                      (todayAppointment) =>
                        todayAppointment.status !== _status_cancelled
                    )
                    .map((todayAppointment, id) => {
                      return (
                        <span
                          style={{
                            fontWeight: 600,
                            fontSize: 16,
                            color: "#525252",
                          }}
                        >
                          {todayAppointment.from_date &&
                            moment(todayAppointment.from_date).format(
                              "ddd, DD/MM/YYYY HH:mm A"
                            )}
                        </span>
                      );
                    })}
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
    </div>
  );
};

export default PatientDashboard;
