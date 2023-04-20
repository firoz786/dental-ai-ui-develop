import { MoreOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import React from "react";
import StaffProfilePic from "../../../../../assets/profile-pic.png";
const StaffDetails = () => {
  return (
    <>
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          width: "94vw",
          minHeight: "88px",
          background: "#FBFBFB",
          borderRadius: 5,
          padding: "25px 32px 25px 32px",
          margin: "4px 0 0 0",
        }}
      >
        <Col
          span={3}
          style={{
            display: "flex",
            flexDirection: "column",
            fontWeight: "400",
            fontSize: "14px",
            color: "#7D7D7D",
          }}
        >
          <span>Sat, 23/01/2023</span>
          <span>09:30 AM</span>
        </Col>

        <Col span={3}>
          <Row>
            <Col>
              <img style={{ height: "48px" }} src={StaffProfilePic} alt="" />
            </Col>
            <Col
              span={15}
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "0 0 0 10px",
              }}
            >
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "16px",
                  color: "#2CA3FA",
                }}
              >
                Leela Hardy
              </span>
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "16px",
                  color: "#000000",
                }}
              >
                SID#<span style={{ color: "#7D7D7D" }}>388794</span>
              </span>
            </Col>
          </Row>
        </Col>
        <Col
          span={3}
          style={{ fontWeight: "400", fontSize: "16px", color: "#7D7D7D" }}
        >
          Nurse
        </Col>
        <Col
          span={2}
          style={{ fontWeight: "400", fontSize: "16px", color: "#7D7D7D" }}
        >
          06/07/1995
        </Col>
        <Col
          span={2}
          style={{ fontWeight: "400", fontSize: "16px", color: "#7D7D7D" }}
        >
          Female
        </Col>
        <Col
          span={3}
          style={{ fontWeight: "400", fontSize: "16px", color: "#7D7D7D" }}
        >
          BDS
        </Col>
        <Col
          span={3}
          style={{
            fontWeight: "400",
            fontSize: "16px",
            color: "#7D7D7D",
            display: "block",
            width: "100%",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          adityavarma.rao@gmail.com
        </Col>
        <Col
          span={3}
          style={{ fontWeight: "400", fontSize: "16px", color: "#7D7D7D" }}
        >
          +1-9845698745
        </Col>
        <Col
          span={1}
          style={{ fontWeight: "400", fontSize: "16px", color: "#29C3C1" }}
        >
          Can View
        </Col>
        <Col
          span={1}
          style={{
            display: "flex",
            justifyContent: "center",
            //   background: "rgba(27, 42, 84,0.6)",
          }}
        >
          <span style={{ fontSize: "24px", color: "#7D7D7D" }}>
            <MoreOutlined />
          </span>
        </Col>
      </Row>
    </>
  );
};

export default StaffDetails;
