import { Button, Col, Collapse, Row } from "antd";
import CollapsePanel from "antd/lib/collapse/CollapsePanel";
import moment from "moment";
import React from "react";

const Notification = (props) => {
  const {
    handleMarkAsReadPatientNotification,
    id,
    created_at,
    title,
    message,
  } = props;
  const createdAt = moment(created_at).format("DD/MM/YYYY HH:mm A");

  return (
    <Collapse
      ghost
      style={{
        width: "100%",
        minHeight: "79px",
        background: "#FBFBFB",
        borderRadius: 5,
        margin: "0 0 4px 0",
      }}
      expandIconPosition="right"
      collapsible="icon"
      expandIcon={({ isActive }) => (
        <Button
          className="read-notif-btn"
          onClick={() => handleMarkAsReadPatientNotification(id)}
        >
          {isActive ? "Close" : "Read"}
        </Button>
      )}
    >
      <CollapsePanel
        header={
          <Row
            style={{
              display: "flex",
              align: "center",
              width: "100%",
            }}
          >
            <Col
              xs={24}
              sm={4}
              md={3}
              lg={2}
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <span className="notification-created-at" style={{}}>
                {createdAt}
              </span>
            </Col>
            <Col
              xs={15}
              sm={20}
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <span className="notification-title">{title}</span>
            </Col>
          </Row>
        }
        key="1"
      >
        <Row className="notification-msg-row">
          <Col xs={24} sm={4} md={3} lg={2}></Col>
          <Col xs={24} sm={20}>
            <span className="notification-msg">{message}</span>
          </Col>
        </Row>
      </CollapsePanel>
    </Collapse>
  );
};

export default Notification;
