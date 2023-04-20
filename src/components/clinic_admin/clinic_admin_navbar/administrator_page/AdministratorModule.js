import {
  EllipsisOutlined,
  MoreOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Col, Dropdown, Input, Row } from "antd";
import React from "react";
import { Helmet } from "react-helmet";
import "./AdministratorModule.css";
import AddStaffIcon from "../../../../assets/plus-icon-green-col.png";
import StaffProfilePic from "../../../../assets/profile-pic.png";
import { useNavigate } from "react-router-dom";
import { routes_clinic_admin_add_admin, routes_clinic_admin_administrator_profile } from "../../../../utils/clinic_admin_constants/ClinicAdminConstants";

const AdministratorModule = () => {
  const navigate = useNavigate();

  const patientDeleteDropdown = (
    <div className="patient-delete-dropdown">
      <Row
        className="full-profile-row"
        onClick={() => navigate(routes_clinic_admin_administrator_profile)}
      >
        View full profile
      </Row>
      <Row className="delete-patient-row">Delete</Row>
    </div>
  );
  return (
    <div className="administrator-main-div">
      <Helmet>
        <title>Administrator</title>
      </Helmet>
      <Row
        className="d-flex ai-center jc-between"
        style={{ margin: "12px 23px" }}
      >
        <span
          style={{
            fontWeight: 700,
            fontSize: 22,
            color: "#525252",
          }}
        >
          Administrator
        </span>
        <Button
          style={{
            height: "32px",
            display: "flex",
            alignItems: "center",
            gap: 5,
            border: "1px solid #97C46F",
            borderRadius: "30px",
            fontSize: "16px",
            color: "#2CA3FA",
          }}
          onClick={() => navigate(routes_clinic_admin_add_admin)}
        >
          <img style={{ height: "20px" }} src={AddStaffIcon} alt="" />
          <span
            style={{
              fontWeight: "600",
              fontSize: "14PX",
              color: "#525252",
            }}
          >
            Add New Admin
          </span>
        </Button>
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
      <Row
        style={{
          background: "#FFF",
          padding: "0 33px 33px 33px",
          margin: "0 23px",
        }}
      >
        <Row
          className="xray-details"
          style={{
            width: "100%",
            padding: "0px 32px 0 32px",
            margin: "23px 4px 15px 0",
          }}
        >
          <Col span={2}>
            <span
              style={{ fontWeight: "600", fontSize: "14px", color: "#A8A8A8" }}
            >
              Upload
            </span>
          </Col>
          <Col span={3}>
            <span
              style={{ fontWeight: "600", fontSize: "14px", color: "#A8A8A8" }}
            >
              Staff Name / ID
            </span>
          </Col>
          <Col span={3}>
            <span
              style={{ fontWeight: "600", fontSize: "14px", color: "#A8A8A8" }}
            >
              Designation
            </span>
          </Col>
          <Col span={2}>
            <span
              style={{ fontWeight: "600", fontSize: "14px", color: "#A8A8A8" }}
            >
              Date of Birth
            </span>
          </Col>
          <Col span={3}>
            <span
              style={{
                fontWeight: "600",
                fontSize: "14px",
                color: "#A8A8A8",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Gender
            </span>
          </Col>
          <Col span={2}>
            <span
              style={{ fontWeight: "600", fontSize: "14px", color: "#A8A8A8" }}
            >
              Qualification
            </span>
          </Col>
          <Col span={4}>
            <span
              style={{
                fontWeight: "600",
                fontSize: "14px",
                color: "#A8A8A8",
              }}
            >
              Email
            </span>
          </Col>
          <Col span={2}>
            <span
              style={{
                fontWeight: "600",
                fontSize: "14px",
                color: "#A8A8A8",
              }}
            >
              Phone
            </span>
          </Col>
          <Col span={2}>
            <span
              style={{
                fontWeight: "600",
                fontSize: "14px",
                color: "#A8A8A8",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Access Type
            </span>
          </Col>
        </Row>
        <Row>
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              width: "94vw",
              height: "88px",
              background: "#FBFBFB",
              borderRadius: 5,
              padding: "25px 32px 25px 32px",
              margin: "4px 0 0 0",
            }}
          >
            <Col
              span={2}
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
                <Col span={6}>
                  <img
                    style={{ height: "48px" }}
                    src={StaffProfilePic}
                    alt=""
                  />
                </Col>
                <Col
                  span={18}
                  style={{ display: "flex", flexDirection: "column" }}
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
              span={3}
              style={{
                fontWeight: "400",
                fontSize: "16px",
                color: "#7D7D7D",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Female
            </Col>
            <Col
              span={2}
              style={{ fontWeight: "400", fontSize: "16px", color: "#7D7D7D" }}
            >
              BDS
            </Col>
            <Col
              span={4}
              style={{ fontWeight: "400", fontSize: "16px", color: "#7D7D7D" }}
            >
              adityavarma.rao@gmail.com
            </Col>
            <Col
              span={2}
              style={{
                fontWeight: "400",
                fontSize: "16px",
                color: "#7D7D7D",
              }}
            >
              +1-9845698745
            </Col>
            <Col
              span={2}
              style={{
                fontWeight: "400",
                fontSize: "16px",
                color: "#29C3C1",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Master Admin
            </Col>
            <Col
              span={1}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Dropdown overlay={patientDeleteDropdown} placement="bottomRight">
                <EllipsisOutlined rotate={90} style={{ fontSize: 20 }} />
              </Dropdown>
            </Col>
          </Row>
        </Row>
      </Row>
    </div>
  );
};

export default AdministratorModule;
