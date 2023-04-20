import { Button, Checkbox, Col, Form, Input, message, Row, Space } from "antd";
import React from "react";
import "./Login.css";
import Ivorylogo from "../../assets/ivory-ai-logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import {
  routes_dashboard,
  routes_patientsignup,
} from "../../utils/patient_navbar_constants/PatientNavbarConstants";
import { routes_clinic_user_dashboard } from "../../utils/clinic_user_constants/ClinicUserConstants";
import { routes_clinic_admin_dashboard } from "../../utils/clinic_admin_constants/ClinicAdminConstants";
const PatientLogin = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleLoginButton = async (values) => {
    const payload = {
      username: values.name,
      password: values.password,
    };
    await axios
      .post(
        "http://ec2-3-6-218-218.ap-south-1.compute.amazonaws.com:8080/api/v1/auth/login",
        payload
      )
      .then((res) => {
        localStorage.setItem("Token", res.headers.authorization);
        localStorage.setItem("PatientID", res.data.data.user_id);
        console.log(res.data.data.role_names[0]);
        localStorage.setItem("role", res.data.data.role_names[0]);
        if (res.data.data.role_names[0] === "STANDARD") {
          navigate(routes_dashboard);
        }
        if (res.data.data.role_names[0] === "CLINIC") {
          navigate(routes_clinic_user_dashboard);
        }
        if (res.data.data.role_names[0] === "ADMIN") {
          navigate(routes_clinic_admin_dashboard);
        }
        message.success("Successfully Logged in !");
      })
      .catch((err) => {
        message.error(err.response.data.data.errors);
      });
    setTimeout(() => {
      form.resetFields();
    }, 500);
  };

  const handleNavigateToSignup = () => {
    navigate(routes_patientsignup);
  };
  return (
    <Row className="login-page-main-row">
      <Helmet>
        <title>Patient Login</title>
      </Helmet>
      <Col
        className="login-details-filling-form-col-tag"
        span={16}
        sm={16}
        xs={24}
      >
        <Row style={{ height: "10vh" }}>
          <img
            data-testid="Ivory-logo"
            className="Ivory-logo-img-tag"
            src={Ivorylogo}
            alt=""
          />
        </Row>
        <Row className="login-details-filling-row-tag">
          <Form
            name="basic"
            form={form}
            className="login-details-filling-form"
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
            onFinish={handleLoginButton}
          >
            <Row className="login-to-youracnt-row-text">
              <span className="loginto-text-span-tag">Login to</span>
              <span className="loginto-text-span-tag-two">your Account</span>
            </Row>
            <span className="username-text-span-tag">Username</span>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter your username!",
                },
                { whitespace: true, message: "No white spaces" },
                { min: 4, message: "Please enter minimum 4 characters" },
                { max: 30, message: "Please enter miximum 30 characters" },
              ]}
            >
              <Input
                data-testid="user-name-input"
                label="name"
                className="patient-signin-input"
              />
            </Form.Item>
            <span className="password-text-span-tag">Password</span>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password!",
                },
                { max: 30, message: "Please enter miximum 30 characters only" },
                { whitespace: true, message: "No white spaces" },
                {
                  pattern:
                    /^[A-Z](?=.*[A-Za-z])(?=.*\d)(?=.*[@#$!%*?&_])[A-Za-z\d@#$!%*?&_]{7,}$/,
                  message:
                    "Password must contain a capital letter and at least one alphanumeric character and one symbol from @#$%^&*_",
                },
              ]}
            >
              <Input.Password
                label="password"
                data-testid="password-input"
                className="patient-signin-input"
              />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              style={{ width: "100%" }}
            >
              <Row
                style={{
                  display: "flex",
                  width: "100%",
                }}
              >
                <Col span={12}>
                  <span className="forgot-password-span-tag">
                    <u>Forgot Password</u>
                  </span>
                </Col>
                <Col className="rememberme-checkbox-col-tag" span={12}>
                  <Checkbox
                    data-testid="remember-me-check-box"
                    className="remeber-me-checkbox-tag"
                  >
                    Remember me
                  </Checkbox>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item className="login-btn-form-item-tag">
              <Button
                className="login-button-tag"
                type="primary"
                data-testid="login-submit-btn"
                htmlType="submit"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Row>
        {/* <Space>
          Temporary buttons till API integration
          <Button
            type="primary"
            onClick={() => navigate(routes_clinic_user_dashboard)}
          >
            Clinic User Login
          </Button>
          <Button
            type="primary"
            onClick={() => navigate(routes_clinic_admin_dashboard)}
          >
            Clinic Admin Login
          </Button>
          <Button
            type="primary"
          >
            Clinic Admin Signup
          </Button>
        </Space> */}
        {/* PC view */}
        <Row className="copy-rights-text-row-tag">
          <span className="copy-rights-text-span-tag">
            Copyright @ 2023. All Rights Reserved
          </span>
        </Row>
      </Col>
      <Col className="signup-suggestion-img-col" span={8} sm={8} xs={24}>
        <Row className="signup-text-row-tag">
          <span className="new-here-text-span-row">New Here?</span>
          <span className="sign-up-text-span-tag">
            Sign up and discover a whole new World of AI based treatment
          </span>
        </Row>
        <Row>
          <Button
            className="sign-up-btn-login-page"
            onClick={handleNavigateToSignup}
            data-testid="sign-up-btn"
          >
            Sign up
          </Button>
        </Row>
      </Col>

      {/* Mobile view */}
      <Col className="copy-rights-text">
        <span className="copy-rights-text-span">
          Copyright @ 2023. All Rights Reserved
        </span>
      </Col>
    </Row>
  );
};

export default PatientLogin;
