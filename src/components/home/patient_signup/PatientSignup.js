import React from "react";
import "./PatientSignup.css";
import signupbgimage from "../../../assets/signup-bg-image.png";
import ivoryailogo from "../../../assets/ivory-ai-logo.png";
import { Row, Col, Input, Button, Form, Select, message } from "antd";
import { Option } from "antd/lib/mentions";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { routes_patientlogin } from "../../../utils/patient_navbar_constants/PatientNavbarConstants";

const PatientSignup = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const phonecode = [
    { country: "+93" },
    { country: "+213" },
    { country: "+54" },
    { country: "+61" },
    { country: "+43" },
    { country: "+880" },
    { country: "+32" },
    { country: "+55" },
    { country: "+359" },
    { country: "+1" },
    { country: "+56" },
    { country: "+86" },
    { country: "+57" },
    { country: "+506" },
    { country: "+385" },
    { country: "+357" },
    { country: "+420" },
    { country: "+45" },
    { country: "+20" },
    { country: "+358" },
    { country: "+33" },
    { country: "+49" },
    { country: "+30" },
    { country: "+504" },
    { country: "+852" },
    { country: "+36" },
    { country: "+354" },
    { country: "+91" },
    { country: "+62" },
    { country: "+964" },
    { country: "+353" },
    { country: "+972" },
    { country: "+39" },
    { country: "+1-876" },
    { country: "+81" },
    { country: "+962" },
    { country: "+254" },
    { country: "+82" },
    { country: "+965" },
    { country: "+856" },
    { country: "+961" },
    { country: "+60" },
    { country: "+52" },
    { country: "+212" },
    { country: "+95" },
    { country: "+977" },
    { country: "+31" },
    { country: "+64" },
    { country: " +234" },
    { country: "+47" },
  ];

  const handleSelectCountryCode = () => {};

  const handleSubmitNewUserSignup = (values) => {
    const payload = {
      name: values.Name,
      username: values.Username,
      password: values.password,
      email: values.Email,
      phone_country_code: values.Code,
      phone_number: values.Phone,
      address_line_one: values.Address,
      address_line_two: values.Apartment,
      city: values.City,
      province: values.State,
      country: values.Country,
      zip_code: values.Zip,
      insurance_id: values.Insurance,
      citizen_id: values.CitizenID,
      blood_group: values.BloodGroup,
      gender: values.Gender,
    };
    axios
      .post(
        "http://ec2-3-6-218-218.ap-south-1.compute.amazonaws.com:8080/api/v1/auth/sign-up",
        payload
      )
      .then((res) => {
        navigate(routes_patientlogin);
        message.success("Signup success");
      })
      .catch((err) => {
        message.error(err.response.data.data.errors);
      });
    setTimeout(() => {
      form.resetFields();
    }, 700);
  };

  return (
    <div className="patient-signup-main-div">
      <Helmet>
        <title>Patient Signup</title>
      </Helmet>
      <Row style={{ width: "100%" }}>
        <Col span={16}>
          <Row>
            <img
              data-testid="jest-ivory-logo"
              src={ivoryailogo}
              alt=""
              style={{ height: "6.7vh", margin: "3.2%" }}
            />
          </Row>
          <Form onFinish={handleSubmitNewUserSignup} form={form}>
            <Row
              style={{
                width: "100%",
                margin: "50px 0 0 0",
                display: "flex",
                gap: "65px",
                justifyContent: "center",
              }}
            >
              <Col span={18}>
                <Row style={{ width: "100%" }}>
                  <span className="patient-signup-title">
                    Sign up with Ivory AI
                  </span>
                </Row>
                <Row style={{ width: "100%" }}>
                  <span className="patient-signup-subtitle">
                    and experience the revolution in high tech dental care...
                  </span>
                </Row>
              </Col>
              <Col className="input-rows-main-col">
                <div className="patient-signup-input-row">
                  <Row style={{ width: "70%" }}>
                    <span className="patient-signup-input-title">
                      Name
                      <span style={{ color: "red" }}>*</span>
                    </span>
                  </Row>
                  <Form.Item
                    name="Name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your Name!",
                      },
                      { whitespace: true, message: "No white spaces" },
                    ]}
                  >
                    <Input
                      data-testid="jest-input-name"
                      label="Name"
                      className="patient-signup-input"
                      maxLength={30}
                    />
                  </Form.Item>
                </div>
                <div className="patient-signup-input-row">
                  <Row style={{ width: "70%" }}>
                    <span className="patient-signup-input-title">
                      Username
                      <span style={{ color: "red" }}>*</span>
                    </span>
                  </Row>
                  <Form.Item
                    name="Username"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your Username!",
                      },
                      { min: 8, message: "Please enter minimum 8 characters" },
                      { whitespace: true, message: "No white spaces" },
                      {
                        pattern: /^[a-zA-Z0-9._]+$/,
                        message:
                          "Username can only contain letters, numbers, fullstops, and underscores.",
                      },
                    ]}
                  >
                    <Input
                      data-testid="jest-input-username"
                      label="Username"
                      className="patient-signup-input"
                      maxLength={30}
                    />
                  </Form.Item>
                </div>
                <div className="password-row">
                  <div
                    className="patient-signup-input-row"
                    style={{ padding: "3.89vh 0" }}
                  >
                    <Row style={{ width: "70%" }}>
                      <span className="patient-signup-input-title">
                        Password
                        <span style={{ color: "red" }}>*</span>
                      </span>
                    </Row>
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          min: 8,
                          message: "Password must be atleast 8 characters",
                        },
                        { whitespace: true, message: "No white spaces" },
                        { required: true, message: "Enter Password" },
                        {
                          pattern:
                            /^[A-Z](?=.*[A-Za-z])(?=.*\d)(?=.*[@#$!%*?&_])[A-Za-z\d@#$!%*?&_]{7,}$/,
                          message:
                            "Password must contain first letter capital and at least one alphanumeric character and a symbol from @#$%^&*",
                        },
                      ]}
                      hasFeedback
                    >
                      <Input.Password
                        data-testid="jest-input-password"
                        maxLength={30}
                        className="patient-signup-input"
                      />
                    </Form.Item>
                  </div>
                  <div
                    className="patient-signup-input-row"
                    style={{ padding: "0 0 3.89vh 0" }}
                  >
                    <Row style={{ width: "70%" }}>
                      <span className="patient-signup-input-title">
                        Confirm Password
                        <span style={{ color: "red" }}>*</span>
                      </span>
                    </Row>
                    <Form.Item
                      name="confirm"
                      dependencies={["password"]}
                      hasFeedback
                      rules={[
                        {
                          min: 8,
                          message: "Password must be atleast 8 characters",
                        },
                        { whitespace: true, message: "No white spaces" },
                        { required: true, message: "Re-e nter Password" },
                        {
                          pattern:
                            /^[A-Z](?=.*[A-Za-z])(?=.*\d)(?=.*[@#$!%*?&_])[A-Za-z\d@#$!%*?&_]{7,}$/,
                          message:
                            "Password must contain first letter capital and at least one alphanumeric character and a symbol from @#$%^&*",
                        },

                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error(
                                "The two passwords that you entered do not match!"
                              )
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        data-testid="jest-input-confirm-password"
                        maxLength={30}
                        className="patient-signup-input"
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="patient-signup-input-row">
                  <Row style={{ width: "70%" }}>
                    <span className="patient-signup-input-title">
                      Gender
                      <span style={{ color: "red" }}>*</span>
                    </span>
                  </Row>
                  <Form.Item
                    name="Gender"
                    rules={[{ required: true, message: "Select Gender" }]}
                  >
                    <Select
                      data-testid="jest-input-gender"
                      label="Gender"
                      defaultValue={"Select Gender"}
                      bordered={false}
                      className="patient-signup-bloodgrp-select"
                    >
                      <Option value="Male" data-testid="jest-male">
                        Male
                      </Option>
                      <Option value="Female">Female</Option>
                      <Option value="Others">Others</Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="patient-signup-input-row">
                  <Row style={{ width: "70%" }}>
                    <span className="patient-signup-input-title">
                      Email
                      <span style={{ color: "red" }}>*</span>
                    </span>
                  </Row>
                  <Form.Item
                    name="Email"
                    rules={[
                      { required: true, message: "Enter email" },
                      {
                        type: "email",
                        message: "Enter valid email address",
                      },
                    ]}
                  >
                    <Input
                      data-testid="jest-input-email"
                      label="Email"
                      className="patient-signup-input"
                      maxLength={50}
                    />
                  </Form.Item>
                </div>
                <div className="patient-signup-input-row">
                  <Row style={{ width: "70%" }}>
                    <span className="patient-signup-input-title">
                      Phone
                      <span style={{ color: "red" }}>*</span>
                    </span>
                  </Row>
                  <Form.Item
                    name="Phone"
                    rules={[
                      {
                        required: true,
                        message: "Please enter phone number with country code",
                      },
                    ]}
                  >
                    <Input
                      data-testid="jest-input-phone"
                      maxLength={20}
                      bordered={false}
                      label="Phone"
                      addonBefore={
                        <Form.Item name="Code">
                          <Select
                            data-testid="jest-country-code"
                            label="Code"
                            defaultValue="PhoneCode"
                            onChange={handleSelectCountryCode}
                          >
                            {phonecode.map((item) => {
                              return (
                                <Option
                                  key={item.country}
                                  value={item.country}
                                  data-testid="jest-country-code-options"
                                >
                                  {item.country}
                                </Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      }
                      className="patient-signup-phone"
                    />
                  </Form.Item>
                </div>
                <div className="patient-signup-input-row">
                  <Row style={{ width: "70%" }}>
                    <span className="patient-signup-input-title">
                      Address
                      <span style={{ color: "red" }}>*</span>
                    </span>
                  </Row>
                  <Form.Item
                    name="Address"
                    rules={[{ required: true, message: "Enter Address" }]}
                  >
                    <Input
                      data-testid="jest-input-address"
                      label="Address"
                      className="patient-signup-input"
                    />
                  </Form.Item>
                </div>
                <div className="patient-signup-input-row">
                  <Row style={{ width: "70%" }}>
                    <span className="patient-signup-input-title">
                      Apartment / Suite Etc.,
                      <span style={{ color: "red" }}>*</span>
                    </span>
                  </Row>
                  <Form.Item
                    name="Apartment"
                    rules={[
                      {
                        required: true,
                        message: "Enter Apartment / Suite Etc.,",
                      },
                    ]}
                  >
                    <Input
                      data-testid="jest-input-apartment"
                      label="Apartment"
                      className="patient-signup-input"
                      maxLength={50}
                    />
                  </Form.Item>
                </div>
                <div className="patient-signup-input-row">
                  <Row style={{ width: "70%" }}>
                    <span className="patient-signup-input-title">
                      City
                      <span style={{ color: "red" }}>*</span>
                    </span>
                  </Row>
                  <Form.Item
                    name="City"
                    rules={[{ required: true, message: "Enter City" }]}
                  >
                    <Input
                      data-testid="jest-input-city"
                      label="City"
                      className="patient-signup-input"
                      maxLength={30}
                    />
                  </Form.Item>
                </div>
                <div className="patient-signup-input-row">
                  <Row style={{ width: "70%" }}>
                    <span className="patient-signup-input-title">
                      State / Province
                      <span style={{ color: "red" }}>*</span>
                    </span>
                  </Row>
                  <Form.Item
                    name="State"
                    rules={[
                      { required: true, message: "Enter State / Province" },
                    ]}
                  >
                    <Input
                      data-testid="jest-input-state"
                      label="State"
                      className="patient-signup-input"
                      maxLength={30}
                    />
                  </Form.Item>
                </div>
                <div className="patient-signup-input-row">
                  <Row style={{ width: "70%" }}>
                    <span className="patient-signup-input-title">
                      Country
                      <span style={{ color: "red" }}>*</span>
                    </span>
                  </Row>
                  <Form.Item
                    name="Country"
                    rules={[{ required: true, message: "Enter Country" }]}
                  >
                    <Input
                      data-testid="jest-input-country"
                      label="Country"
                      className="patient-signup-input"
                      maxLength={30}
                    />
                  </Form.Item>
                </div>
                <div className="patient-signup-input-row">
                  <Row style={{ width: "70%" }}>
                    <span className="patient-signup-input-title">
                      Zip Code
                      <span style={{ color: "red" }}>*</span>
                    </span>
                  </Row>
                  <Form.Item
                    name="Zip"
                    rules={[{ required: true, message: "Enter Zip code" }]}
                  >
                    <Input
                      data-testid="jest-input-zip"
                      label="Zip"
                      className="patient-signup-input"
                      maxLength={30}
                    />
                  </Form.Item>
                </div>
              </Col>
              <Col
                style={{ display: "flex", flexDirection: "column", gap: 28 }}
              >
                <div className="patient-sigup-input-bgcolor-row">
                  <div className="patient-signup-input-row">
                    <Row style={{ width: "70%" }}>
                      <span className="patient-signup-input-title">
                        Insurance ID
                      </span>
                    </Row>
                    <Form.Item name="Insurance">
                      <Input
                        data-testid="jest-input-insuranceid"
                        label="Insurance"
                        maxLength={30}
                        className="patient-signup-input"
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="patient-sigup-input-bgcolor-row">
                  <div className="patient-signup-input-row">
                    <Row style={{ width: "70%" }}>
                      <span className="patient-signup-input-title">
                        Citizen ID
                        <span style={{ color: "red" }}>*</span>
                      </span>
                    </Row>
                    <Form.Item
                      name="CitizenID"
                      rules={[{ required: true, message: "Enter Citizen ID" }]}
                    >
                      <Input
                        data-testid="jest-input-citizenid"
                        label="CitizenID"
                        className="patient-signup-input"
                        maxLength={30}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="patient-sigup-input-bgcolor-row">
                  <div className="patient-signup-input-row">
                    <Row style={{ width: "70%" }}>
                      <span className="patient-signup-input-title">
                        Blood Group
                        <span style={{ color: "red" }}>*</span>
                      </span>
                    </Row>
                    <Form.Item
                      name="BloodGroup"
                      rules={[
                        { required: true, message: "Select blood group" },
                      ]}
                    >
                      <Select
                        data-testid="jest-input-bloodgroup"
                        label="BloodGroup"
                        defaultValue={"Select Blood group"}
                        bordered={false}
                        className="patient-signup-bloodgrp-select"
                      >
                        <Option
                          data-testid="jest-input-bloodgroup-options"
                          value="A+"
                        >
                          A+
                        </Option>
                        <Option value="A-">A-</Option>
                        <Option value="B+">B+</Option>
                        <Option value="B-">B-</Option>
                        <Option value="O+">O+</Option>
                        <Option value="O-">O-</Option>
                        <Option value="AAB+">AAB+</Option>
                        <Option value="AAB-">AAB-</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="patient-signup-register-btn-row">
              <Form.Item>
                <Button
                  data-testid="jest-signup-btn"
                  className="patient-signup-register-btn"
                  type="primary"
                  htmlType="submit"
                >
                  Register
                </Button>
              </Form.Item>
            </Row>
          </Form>
        </Col>
        <Col span={8} className="patient-signup-bg-img-row">
          <img
            src={signupbgimage}
            alt=""
            style={{ width: "31.3vw" }}
            data-testid="jest-signupbgimage"
          />
        </Col>
      </Row>
      <Row className="patient-signup-copyright-row">
        <span className="patient-signup-copyright">
          Copyright © 2023. All Rights Reserved.
        </span>
      </Row>
    </div>
  );
};

export default PatientSignup;
