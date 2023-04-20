import React from "react";
import "./Clinics.css";
import { useEffect } from "react";
import { Button, Col, Input, Pagination, Row } from "antd";
import { useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import ClinicDetails from "./clinicdetails/ClinicDetails";

const Clinics = () => {
  const Token = localStorage.getItem("Token");
  const [searchInput, setSearchInput] = useState("");
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

  // Arranging the backend data to adjust for pagination
  let pageSize;
  pageSize = 4;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData =
    clinicDetails &&
    clinicDetails
      .filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      )
      .slice(startIndex, endIndex);

  useEffect(() => {
    handleGetAllTreatmentTypes();
    handleGetAllClinicDetails();
  }, []);

  return (
    <div className="clinics-page-main-div">
      <Helmet>
        <title>Clinics</title>
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
          Clinics
        </span>
      </Row>
      <Row className="d-flex jc-evenly">
        <div
          style={{
            width: "100%",
            margin: "0 23px",
            minHeight: "75vh",
            background: "#FFF",
          }}
        >
          <Row className="d-flex jc-center">
            <div
              style={{
                margin: "33px",
                width: "100%",
                minHeight: "16.76923076923077vh",
                background: "#FBFBFB",
                borderRadius: 5,
                gap: "25px",
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
                Search for a Clinic Near You
              </span>
              <Row
                className="w-100 d-flex jc-center ai-center"
                style={{
                  gap: "23px",
                }}
              >
                <Input
                  style={{
                    width: 399,
                    height: 40,
                  }}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search"
                  prefix={<SearchOutlined style={{ opacity: 0.5 }} />}
                />
                <Button
                  style={{
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#2CA3FA",
                    background: "#E0F2FF",
                    border: "1px solid #009DF7",
                    borderRadius: 30,
                  }}
                >
                  Search
                </Button>
              </Row>
            </div>
            <div
              style={{
                width: "100%",
                margin: "0 23px 18px 23px",
                background: "#FFF",
              }}
            >
              <Row
                className="clinic-headings-row"
                style={{
                  padding: "0 33px 20px 33px",
                }}
              >
                <Col span={5}>
                  <span className="appointment-date-heading">Clinic Name</span>
                </Col>
                <Col span={6}>
                  <span className="appointment-date-heading">Address</span>
                </Col>
                <Col span={4}>
                  <span className="appointment-date-heading">
                    Appointment Details
                  </span>
                </Col>
                <Col span={5} style={{ padding: "0 0 0 60px" }}>
                  <span className="appointment-date-heading">
                    Appointment Status
                  </span>
                </Col>
                <Col span={4}></Col>
              </Row>
              {clinicDetails &&
                currentData.map((item) => {
                  return (
                    <ClinicDetails
                      name={item.name}
                      email={item.email}
                      username={item.username}
                      clinic_user_id={item.user_id}
                      zip_code={item.zip_code}
                      address_line_one={item.address_line_one}
                      address_line_two={item.address_line_two}
                      city={item.city}
                      country={item.country}
                      latitude={item.coordinate.latitude}
                      longitude={item.coordinate.longitude}
                      phone_country_code={item.phone_country_code}
                      phone_number={item.phone_number}
                      province={item.province}
                      treatmentTypes={treatmentTypes}
                    />
                  );
                })}
            </div>
          </Row>
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
            total={clinicDetails && clinicDetails.length}
            onChange={onPageChange}
          />
        </Row>
      </Row>
    </div>
  );
};

export default Clinics;
