import { Row } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Notification from "./notification/Notification";
import "./PatientNotifications.css";
import { UserAuth } from "../../../../context_api/ContextApi";

const PatientNotifications = () => {
  const Token = localStorage.getItem("Token");
  const { allPatientNotificationsMap, handleGetAllPatientNotifications } =
    UserAuth();

  const handleMarkAsReadPatientNotification = (id) => {
    const payload = {};
    const config = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };
    axios
      .put(
        `http://ec2-3-6-218-218.ap-south-1.compute.amazonaws.com:8080/api/v1/notification/${id}`,
        payload,
        config
      )
      .then((res) => {
        setTimeout(() => {
          handleGetAllPatientNotifications();
        }, 100);
      });
  };

  useEffect(() => {
    handleGetAllPatientNotifications();
  }, []);

  return (
    <div className="patient-notification-main-div">
      <Helmet>
        <title>Notifications</title>
      </Helmet>
      <Row
        className="d-flex ai-center jc-between"
        style={{ height: "64px", margin: "0 23px" }}
      >
        <span
          style={{
            fontWeight: 700,
            fontSize: 22,
            color: "#525252",
          }}
        >
          Notifications
        </span>
      </Row>
      {allPatientNotificationsMap && allPatientNotificationsMap.length === 0 ? (
        <Row className="d-flex jc-center notifications-main-row">
          <span style={{ fontSize: 22, fontWeight: 600 }}>
            No New Notifications
          </span>
        </Row>
      ) : (
        <Row className="notifications-main-row">
          {allPatientNotificationsMap &&
            allPatientNotificationsMap.map((item) => {
              return (
                <Notification
                  handleMarkAsReadPatientNotification={
                    handleMarkAsReadPatientNotification
                  }
                  id={item.id}
                  created_at={item.created_at}
                  title={item.title}
                  message={item.message}
                />
              );
            })}
        </Row>
      )}
    </div>
  );
};

export default PatientNotifications;
