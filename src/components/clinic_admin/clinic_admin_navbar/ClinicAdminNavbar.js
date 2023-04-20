import { Col, Dropdown, Row, Tabs } from "antd";
import TabPane from "antd/lib/tabs/TabPane";
import React, { useEffect } from "react";
import ivoryailogo from "../../../assets/ivory-ai-logo.png";
import ProfilePic from "../../../assets/default-profile-pic.png";
import { routes_patientlogin } from "../../../utils/patient_navbar_constants/PatientNavbarConstants";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import helpicon from "../../../assets/help-icon.png";
import {
  routes_clinic_admin_administrator,
  routes_clinic_admin_dashboard,
  routes_clinic_admin_ml_analysis,
  routes_clinic_admin_patients,
  routes_clinic_admin_staff,
  routes_clinic_appointments,
  tabs_admin_appointments,
  tabs_admin_dashboard,
  tabs_admin_mlanalysis,
  tabs_admin_patients,
  tabs_admin_staff,
} from "../../../utils/clinic_admin_constants/ClinicAdminConstants";
import { UserAuth } from "../../../context_api/ContextApi";

const ClinicAdminNavbar = () => {
  const Token = localStorage.getItem("Token");

  const { adminTabActiveKey, setAdminTabActiveKey } = UserAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const patientSignOut = async () => {
    // const decodedToken = JSON.parse(atob(Token.split(".")[1]));

    // if (decodedToken.exp >= parseInt(Date.now() / 1000)) {
    //   const payload = {
    //     token: Token,
    //   };
    //   let config = {
    //     headers: {
    //       Authorization: `Bearer ${Token}`,
    //     },
    //   };
    //   await axios
    //     .post(
    //       `http://ec2-3-6-218-218.ap-south-1.compute.amazonaws.com:8080/api/v1/user/logout`,
    //       payload,
    //       config
    //     )
    //     .then((res) => {
    //       localStorage.clear();
    //       navigate(routes_patientlogin);
    //     });
    // } else if (decodedToken.exp <= parseInt(Date.now() / 1000)) {
    //   localStorage.clear();
    //   navigate(routes_patientlogin);
    // } else

    localStorage.clear();
    navigate(routes_patientlogin);
  };

  const tabsChange = (activeKey) => {
    if (activeKey === tabs_admin_dashboard) {
      navigate(routes_clinic_admin_dashboard);
      setAdminTabActiveKey(tabs_admin_dashboard);
    } else if (activeKey === tabs_admin_mlanalysis) {
      navigate(routes_clinic_admin_ml_analysis);
      setAdminTabActiveKey(tabs_admin_mlanalysis);
    } else if (activeKey === tabs_admin_patients) {
      navigate(routes_clinic_admin_patients);
      setAdminTabActiveKey(tabs_admin_patients);
    } else if (activeKey === tabs_admin_staff) {
      navigate(routes_clinic_admin_staff);
      setAdminTabActiveKey(tabs_admin_staff);
    } else if (activeKey === tabs_admin_appointments) {
      navigate(routes_clinic_appointments);
      setAdminTabActiveKey(tabs_admin_appointments);
    } else {
    }
  };

  const handleDefaultRoute = () => {
    const key = location.pathname;
    if (key === routes_clinic_admin_dashboard) {
      setAdminTabActiveKey(tabs_admin_dashboard);
    }
    if (key === routes_clinic_admin_ml_analysis) {
      setAdminTabActiveKey(tabs_admin_mlanalysis);
    }
    if (key === routes_clinic_admin_patients) {
      setAdminTabActiveKey(tabs_admin_patients);
    }
    if (key === routes_clinic_admin_staff) {
      setAdminTabActiveKey(tabs_admin_staff);
    }
    if (key === routes_clinic_appointments) {
      setAdminTabActiveKey(tabs_admin_appointments);
    }
  };
  useEffect(() => {
    handleDefaultRoute();
  }, []);

  const profileDropdown = (
    <div className="patient-delete-dropdown">
      <Row
        className="full-profile-row"
        onClick={() => navigate(routes_clinic_admin_administrator)}
      >
        Administrator
      </Row>
      <Row className="delete-patient-row">Clinic Profile</Row>
      <Row className="delete-patient-row" onClick={patientSignOut}>
        Sign Out
      </Row>
    </div>
  );

  const navbartabs = [
    { navigate: routes_clinic_admin_dashboard, tab: tabs_admin_dashboard },
    { navigate: routes_clinic_admin_ml_analysis, tab: tabs_admin_mlanalysis },
    { navigate: routes_clinic_admin_patients, tab: tabs_admin_patients },
    { navigate: routes_clinic_admin_staff, tab: tabs_admin_staff },
    { navigate: routes_clinic_appointments, tab: tabs_admin_appointments },
  ];

  return (
    <div>
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
            activeKey={adminTabActiveKey}
            style={{ margin: "0 0 0 2.8645vw" }}
          >
            {navbartabs.map((item) => {
              return <TabPane tab={item.tab} key={item.tab} />;
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
            // style={{
            //   borderBottom:
            //     tabActiveKey === "Notifications"
            //       ? "5px solid #1890ff"
            //       : "5px solid white",
            //   height: "100%",
            //   display: "flex",
            //   alignItems: "center",
            // }}
            >
              <img
                // src={samplearray && samplearray[0] === false ? notifred : notif}
                // alt=""
                // style={{
                //   width: window.innerWidth > 1050 ? "1vw" : "18px",
                //   height: window.innerWidth < 1050 && "20.5px",
                //   cursor: "pointer",
                // }}
                // onClick={() => {
                //   setTabActiveKey("Notifications");
                //   navigate(routes_notifications);
                // }}
                alt=""
              />
            </Col>
            <Col
            // style={{
            //   borderBottom:
            //     tabActiveKey === "Help"
            //       ? "5px solid #1890ff"
            //       : "5px solid white",
            //   height: "100%",
            //   display: "flex",
            //   alignItems: "center",
            // }}
            >
              <img
                src={helpicon}
                alt=""
                style={{
                  width: window.innerWidth > 1050 ? "1vw" : "18px",
                  height: window.innerWidth < 1050 && "20.5px",
                  cursor: "pointer",
                }}
                // onClick={() => {
                //   setTabActiveKey("Help");
                //   navigate(routes_help);
                // }}
              />
            </Col>
            <span className="user-name">Cameron Williamson</span>
            <Dropdown overlay={profileDropdown} placement="bottomRight">
              <img
                src={ProfilePic}
                alt=""
                style={{
                  width: window.innerWidth > 1050 ? "2vw" : "36px",
                  margin: "0 0.9895833333333334vw 5px 0",
                  borderRadius: "13px",
                  cursor: "pointer",
                }}
                onClick={patientSignOut}
              />
            </Dropdown>
          </Row>
        </Col>
      </div>
    </div>
  );
};

export default ClinicAdminNavbar;
