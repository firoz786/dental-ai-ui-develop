import "./ClinicUserNavbar.css";
import { Col, Dropdown, Row, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import ivoryailogo from "../../../assets/ivory-ai-logo.png";
import notifred from "../../../assets/notif-icon.png";
import notif from "../../../assets/notificon.png";
import helpicon from "../../../assets/help-icon.png";
import ProfilePic from "../../../assets/default-profile-pic.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  routes_notifications,
  routes_help,
  routes_patientlogin,
} from "../../../utils/patient_navbar_constants/PatientNavbarConstants";
import { UserAuth } from "../../../context_api/ContextApi";
import TabPane from "antd/lib/tabs/TabPane";
import {
  clinic_user_tabs_appointments,
  clinic_user_tabs_dashboard,
  clinic_user_tabs_patients,
  routes_clinic_user_add_patient,
  routes_clinic_user_appointments,
  routes_clinic_user_dashboard,
  routes_clinic_user_view_patient_by_id,
  routes_clinic_user_patients,
  routes_clinic_user_edit_patient,
} from "../../../utils/clinic_user_constants/ClinicUserConstants";
import axios from "axios";

const ClinicUserNavbar = () => {
  const Token = localStorage.getItem("Token");
  const patientid = localStorage.getItem("PatientID");
  const { tabActiveKey, setTabActiveKey, setInputsEnable } = UserAuth();
  const { allPatientNotificationsMap, handleGetAllPatientNotifications } =
    UserAuth();
  const [patientUserDetails, setPatientUserDetails] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const navbartabs = [
    { navigate: routes_clinic_user_dashboard, tab: clinic_user_tabs_dashboard },
    { navigate: routes_clinic_user_patients, tab: clinic_user_tabs_patients },
    {
      navigate: routes_clinic_user_appointments,
      tab: clinic_user_tabs_appointments,
    },
  ];

  const patientSignOut = async () => {
    const decodedToken = JSON.parse(atob(Token.split(".")[1]));

    if (decodedToken.exp >= parseInt(Date.now() / 1000)) {
      const payload = {
        token: Token,
      };
      let config = {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      };
      await axios
        .post(
          `http://ec2-3-6-218-218.ap-south-1.compute.amazonaws.com:8080/api/v1/user/logout`,
          payload,
          config
        )
        .then((res) => {
          localStorage.clear();
          navigate(routes_patientlogin);
        });
    } else if (decodedToken.exp <= parseInt(Date.now() / 1000)) {
      localStorage.clear();
      navigate(routes_patientlogin);
    }
  };

  const profileDropdown = (
    <div
      className="d-flex jc-center ai-center"
      style={{
        height: "40px",
        margin: "0 10px 0 0",
        backgroundColor: "#FFF",
        borderRadius: "3px",
        cursor: "pointer",
        boxShadow: "0px 1px 20px rgba(0,0, 0, 0.15)",
      }}
      onClick={patientSignOut}
    >
      <span
        style={{
          fontWeight: "500",
          fontSize: "16px",
          color: "#000000",
          padding: "0 30px",
        }}
      >
        Sign Out
      </span>
    </div>
  );

  const tabsChange = (activeKey) => {
    if (activeKey === clinic_user_tabs_dashboard) {
      navigate(routes_clinic_user_dashboard);
      setTabActiveKey(clinic_user_tabs_dashboard);
      setInputsEnable(true);
    } else if (activeKey === clinic_user_tabs_patients) {
      navigate(routes_clinic_user_patients);
      setTabActiveKey(clinic_user_tabs_patients);
      setInputsEnable(true);
    } else if (activeKey === clinic_user_tabs_appointments) {
      navigate(routes_clinic_user_appointments);
      setTabActiveKey(clinic_user_tabs_appointments);
      setInputsEnable(true);
    } else {
    }
    handleGetAllPatientNotifications();
  };

  const handleDefaultRoute = () => {
    const key = location.pathname;
    const editPatientKey = location.pathname
      .split("/clinic-user/")[1]
      .split("/")[0];
    if (key === routes_clinic_user_dashboard) {
      setTabActiveKey(clinic_user_tabs_dashboard);
    }
    if (key === routes_clinic_user_patients) {
      setTabActiveKey(clinic_user_tabs_patients);
    }
    if (key === routes_clinic_user_appointments) {
      setTabActiveKey(clinic_user_tabs_appointments);
    }
    if (key === routes_clinic_user_add_patient) {
      setTabActiveKey(clinic_user_tabs_patients);
    }
    if (key === routes_clinic_user_view_patient_by_id) {
      setTabActiveKey(clinic_user_tabs_patients);
    }
    if (editPatientKey === "edit-patient") {
      setTabActiveKey(clinic_user_tabs_patients);
    }
    if (key === routes_notifications) {
      setTabActiveKey("Notifications");
    }
    if (key === routes_help) {
      setTabActiveKey("Help");
    }
  };

  const handleGetClincUserDetails = async () => {
    let config = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };
    await axios
      .get(
        `http://ec2-3-6-218-218.ap-south-1.compute.amazonaws.com:8080/api/v1/clinic/${patientid}`,
        config
      )
      .then((res) => {
        setPatientUserDetails(res.data.data);
      });
  };

  const samplearray =
    allPatientNotificationsMap &&
    allPatientNotificationsMap
      .filter((item) => item.viewed === false)
      .map((item) => item.viewed);

  useEffect(() => {
    handleGetClincUserDetails();
    handleDefaultRoute();
    handleGetAllPatientNotifications();
  }, []);

  return (
    <div
      style={{
        height: "7.45vh",
        background: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent:
          window.innerWidth > 1050 ? "space-between" : "space-evenly",
      }}
      className="navbar-main-div"
    >
      <Col>
        <img
          src={ivoryailogo}
          alt=""
          style={{
            width: window.innerWidth > 950 ? "6.5vw" : "86px",
            margin: "0 0 0 1.25vw",
          }}
        />
      </Col>
      <Col xs={12} sm={16} md={18}>
        <Tabs
          onChange={tabsChange}
          activeKey={tabActiveKey}
          style={{ margin: "0 0 0 2.8645vw" }}
        >
          {navbartabs.map((item) => {
            return (
              <TabPane
                tab={
                  <span onClick={() => navigate(item.navigate)}>
                    {item.tab}
                  </span>
                }
                key={item.tab}
              />
            );
          })}
        </Tabs>
      </Col>
      <Col
        xs={6}
        sm={6}
        md={4}
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Row
          className="d-flex ai-center jc-between"
          style={{
            width: window.innerWidth > 1050 ? "15vw" : "100%",
            height: "100%",
          }}
        >
          <Col
            style={{
              borderBottom:
                tabActiveKey === "Notifications"
                  ? "5px solid #1890ff"
                  : "5px solid white",
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={samplearray && samplearray[0] === false ? notifred : notif}
              alt=""
              style={{
                width: window.innerWidth > 1050 ? "1vw" : "18px",
                height: window.innerWidth < 1050 && "20.5px",
                cursor: "pointer",
              }}
              onClick={() => {
                // setTabActiveKey("Notifications");
                // navigate(routes_notifications);
              }}
            />
          </Col>
          <Col
            style={{
              borderBottom:
                tabActiveKey === "Help"
                  ? "5px solid #1890ff"
                  : "5px solid white",
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={helpicon}
              alt=""
              style={{
                width: window.innerWidth > 1050 ? "1vw" : "18px",
                height: window.innerWidth < 1050 && "20.5px",
                cursor: "pointer",
              }}
              onClick={() => {
                // setTabActiveKey("Help");
                // navigate(routes_help);
              }}
            />
          </Col>
          <span className="user-name">
            {patientUserDetails
              ? patientUserDetails.name
              : "Titan Dental clinic"}
          </span>
          <Dropdown overlay={profileDropdown} placement="bottomRight">
            <img
              src={
                patientUserDetails.profile_picture_url
                  ? patientUserDetails.profile_picture_url
                  : ProfilePic
              }
              alt=""
              style={{
                width: window.innerWidth > 1050 ? "2vw" : "36px",
                margin: "0 0.9895833333333334vw 5px 0",
                borderRadius: "13px",
                cursor: "pointer",
              }}
            />
          </Dropdown>
        </Row>
      </Col>
    </div>
  );
};

export default ClinicUserNavbar;
