import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row } from "antd";
import React from "react";
import { Helmet } from "react-helmet";
import StaffDetails from "./staff_details/StaffDetails";
import AddStaffIcon from "../../../../assets/plus-icon-green-col.png";
import "./AdminStaff.css";
import { useNavigate } from "react-router-dom";
import { routes_ading_new_staff } from "../../../../utils/clinic_admin_constants/ClinicAdminConstants";

const AdminStaff = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-staff-main-div">
      <Helmet>
        <title>Staff Details</title>
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
          Staff(3)
        </span>
        <Button
          style={{
            height: "32px",
            width: "147px",
            border: "1px solid #97C46F",
            borderRadius: "30px",
            fontSize: "16px",
            color: "#2CA3FA",
          }}
          // onClick={showDrawer}
        >
          <Row>
            <Col style={{ display: "flex", alignItems: "center" }} span={6}>
              <img style={{ height: "20px" }} src={AddStaffIcon} alt="" />
            </Col>
            <Col style={{ display: "flex", alignItems: "center" }} span={18}>
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "14PX",
                  color: "#525252",
                }}
                onClick={() => navigate(routes_ading_new_staff)}
              >
                Add New Staff
              </span>
            </Col>
          </Row>
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
          // height: "65vh",
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
          <Col span={3}>
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
          <Col span={2}>
            <span
              style={{ fontWeight: "600", fontSize: "14px", color: "#A8A8A8" }}
            >
              Gender
            </span>
          </Col>
          <Col span={3}>
            <span
              style={{ fontWeight: "600", fontSize: "14px", color: "#A8A8A8" }}
            >
              Qualification
            </span>
          </Col>
          <Col span={3}>
            <span
              style={{ fontWeight: "600", fontSize: "14px", color: "#A8A8A8" }}
            >
              Email
            </span>
          </Col>
          <Col span={3}>
            <span
              style={{ fontWeight: "600", fontSize: "14px", color: "#A8A8A8" }}
            >
              Phone
            </span>
          </Col>
          <Col span={2}>
            <span
              style={{ fontWeight: "600", fontSize: "14px", color: "#A8A8A8" }}
            >
              Access Type
            </span>
          </Col>
        </Row>
        <Row>
          <StaffDetails />
        </Row>
      </Row>
      <Row className="w-100">
        {/* <Row
          className="d-flex jc-center ai-center w-100"
          style={{
            // height: "30vh",
            padding: "33px 33px 0 33px",
          }}
        >
          <span
            className="d-flex jc-center ai-center w-100"
            style={{
              fontSize: "20px",
            }}
          >
            You have no X-Rays
          </span>
          <Button
            style={{
              display: "flex",
              margin: "13px 33px 0 33px",
              alignItems: "center",
              height: "32px",
              width: "127px",
              border: "1px solid #009DF7",
              borderRadius: "30px",
              fontWeight: "600",
              fontSize: "16px",
              color: "#2CA3FA",
            }}
            // onClick={showDrawer}
          >
            Add Reports
          </Button>
        </Row> */}
      </Row>
    </div>
  );
};

export default AdminStaff;
