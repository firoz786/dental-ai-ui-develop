import { Button, Col, Input, Row, Select, Form, Drawer } from "antd";
import React, { useEffect, useRef, useState } from "react";
import "./MyAccount.css";
import bloodgroupicon from "../../../../assets/Blood-drop.png";
import insuranceidicon from "../../../../assets/insurance-id-icon.png";
import citizenidicon from "../../../../assets/citizen-id-icon.png";
import xrayicon from "../../../../assets/xray-icon.png";
import deletexrayicon from "../../../../assets/delete-xray-icon.png";
import { Option } from "antd/lib/mentions";
import LocationIcon from "../../../../assets/location-icon.png";
import axios from "axios";
import { Helmet } from "react-helmet";
import { UserAuth } from "../../../../context_api/ContextApi";
import XRayTextIcon from "../../../../assets/xRayTextIcon.png";
import XMarkIcon from "../../../../assets/x-mark-icon.png";
import ReportTextIcon from "../../../../assets/reportTextIcon.png";
import RedXMarkIcon from "../../../../assets/red-X-mark-Icon.png";
import moment from "moment";
import ProfilePic from "../../../../assets/default-profile-pic.png";

const MyAccount = () => {
  const [xrayform] = Form.useForm();
  const [otherform] = Form.useForm();
  const [form] = Form.useForm();
  const patientid = localStorage.getItem("PatientID");
  const Token = localStorage.getItem("Token");
  const { inputsEnable, setInputsEnable } = UserAuth();
  const [patientUserDetails, setPatientUserDetails] = useState("");
  const [getXRayImageDetailsToStore, setGetXRayImageDetailsToStore] =
    useState("");
  const [getReportImageDetailsToStore, setGetReportImageDetailsToStore] =
    useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [getProfilePic, setGetProfilePic] = useState("");
  const [patientXrayImageDetails, setPatientXrayImageDetails] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [titleForUploadingXrayImages, setTitleForUploadingXrayImages] =
    useState("");
  const [titleForUploadingReportImages, setTitleForUploadingReportImages] =
    useState("");
  const [xRayArrayStore, setXrayArrayStore] = useState([]);
  const [reportArrayStore, setReportArrayStore] = useState([]);
  const [xrayFileName, setXrayFileName] = useState(null);
  const [reportFileName, setReportFileName] = useState(null);

  const imageJPEG = "image/jpeg";
  const imagePNG = "image/png";
  const jpegimagedatabaseurl = "data:image/jpeg;base64,/9j/";
  const pngimagedatabaseurl = "data:image/png;base64,";

  // for Uploading Xray and report
  const hiddenXrayFileInput = useRef(null);
  const hiddenReportFileInput = useRef(null);

  // For uploading Profile pic
  const hiddenFilesInput = useRef(null);

  const handleXrayUpload = () => {
    hiddenXrayFileInput.current.click();
  };

  const handleReportUpload = () => {
    hiddenReportFileInput.current.click();
  };
  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const onClose = () => {
    setOpenDrawer(false);
  };

  // For profile Input fields
  const enableFormFields = () => {
    setInputsEnable(false);
  };

  const getPatientDetails = async () => {
    let config = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };
    await axios
      .get(
        `http://ec2-3-6-218-218.ap-south-1.compute.amazonaws.com:8080/api/v1/patient/${patientid}`,
        config
      )
      .then((res) => {
        setPatientUserDetails(res.data.data);
      });
  };

  const handleUpdatePatientDetails = async (values) => {
    const payload = {
      name: values.name,
      email: values.email,
      phone_country_code: values.countryCode,
      phone_number: values.phone,
      address_line_one: values.apartment,
      address_line_two: values.address,
      city: values.cityname,
      province: values.state,
      country: values.country,
      zip_code: values.zipcode,
      insurance_id: values.insuranceID,
      citizen_id: values.citizenID,
      blood_group: values.bloodgroup,
      gender: values.Gender,
    };
    let config = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };
    await axios.put(
      `http://ec2-3-6-218-218.ap-south-1.compute.amazonaws.com:8080/api/v1/patient/${patientid}`,
      payload,
      config
    );
    getPatientDetails();
    setInputsEnable(true);
  };

  const handleProfilePicUpload = () => {
    hiddenFilesInput.current.click();
  };

  const holdProfilePicFromFiles = (e) => {
    setGetProfilePic(e.target.files[0]);
  };

  const uploadProfilePic = async (e) => {
    let formData = new FormData();
    formData.append("file", getProfilePic);
    let config = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };
    await axios
      .post(
        `http://ec2-3-6-218-218.ap-south-1.compute.amazonaws.com:8080/api/v1/patient/${patientid}/upload-profile-picture`,
        formData,
        config
      )
      .then((res) => console.log(res.data));
    getPatientDetails();
  };

  /*......................................................................................*/

  // for Uploading Xray Multiple Times
  const handleAddXrayToDrawer = (values) => {
    if (imgUrl !== null) {
      let tempXrayArr = xRayArrayStore;
      tempXrayArr.push({
        name: getXRayImageDetailsToStore.name.split(`.`)[0],
        title: values.xray_title,
        file_mime_type: getXRayImageDetailsToStore.type,
        report_type: "xray",
        report_image: imgUrl,
      });
      setXrayArrayStore(tempXrayArr);
      xrayform.resetFields();
      setTitleForUploadingXrayImages("");
      setImgUrl(null);
      setXrayFileName(null);
    }
  };

  const handleDeletingXrayFromInitialList = (index) => {
    const newItems = xRayArrayStore.filter((item, i) => i !== index);
    setXrayArrayStore(newItems);
  };

  // for Uploading Report Multiple Times
  const handleAddReportsToDrawer = (values) => {
    if (imgUrl !== null) {
      let tempReportArr = reportArrayStore;
      tempReportArr.push({
        name: getReportImageDetailsToStore.name.split(`.`)[0],
        title: values.report_title,
        file_mime_type: getReportImageDetailsToStore.type,
        report_type: "other",
        report_image: imgUrl,
      });
      setReportArrayStore(tempReportArr);
      otherform.resetFields();
      setTitleForUploadingReportImages("");
      setImgUrl(null);
      setReportFileName(null);
    }
  };

  const handleDeletingReportFromInitialList = (index) => {
    const newItems = reportArrayStore.filter((item, i) => i !== index);
    setReportArrayStore(newItems);
  };

  // Button click action for Uploading X-ray Multiple Times
  const handleXrayImageUpload = (e) => {
    setXrayFileName(e.target.files[0]);
    const xrayfile = e.target.files[0];
    setGetXRayImageDetailsToStore(xrayfile);
    const reader = new FileReader();
    reader.readAsDataURL(xrayfile);
    reader.onloadend = () => {
      if (xrayfile.type === imageJPEG) {
        const base64String = reader.result.split(jpegimagedatabaseurl)[1];
        setImgUrl(base64String);
      } else if (xrayfile.type === imagePNG) {
        const base64String = reader.result.split(pngimagedatabaseurl)[1];
        setImgUrl(base64String);
      }
    };
  };

  // Button click action for Uploading Report Multiple Times
  const handleReportImageUpload = (e) => {
    const otherfile = e.target.files[0];
    setReportFileName(e.target.files[0]);
    setGetReportImageDetailsToStore(otherfile);
    const reader = new FileReader();
    reader.readAsDataURL(otherfile);
    reader.onloadend = () => {
      if (otherfile.type === imageJPEG) {
        const base64String = reader.result.split(jpegimagedatabaseurl)[1];
        setImgUrl(base64String);
      } else if (otherfile.type === imagePNG) {
        const base64String = reader.result.split(pngimagedatabaseurl)[1];
        setImgUrl(base64String);
      }
    };
  };

  const addXRayAndReportImage = async () => {
    onClose();
    const addingXrayAndReportData = xRayArrayStore.concat(reportArrayStore);
    let i = 0;
    for (i = 0; i <= addingXrayAndReportData.length; i++) {
      const payload = {
        reports: [
          {
            file_name: addingXrayAndReportData[i].name,
            title: addingXrayAndReportData[i].title,
            file_mime_type: addingXrayAndReportData[i].file_mime_type,
            report_type: addingXrayAndReportData[i].report_type,
            report_image: addingXrayAndReportData[i].report_image,
          },
        ],
        patient_id: patientid,
        report_image_needed: false,
      };
      let config = {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      };
      await axios
        .post(
          `http://ec2-3-6-218-218.ap-south-1.compute.amazonaws.com:8080/api/v1/report`,
          payload,
          config
        )
        .then((res) => {});
      getXrayImageReport();
    }
  };

  const getXrayImageReport = async () => {
    let config = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };
    await axios
      .get(
        `http://ec2-3-6-218-218.ap-south-1.compute.amazonaws.com:8080/api/v1/report?patient_id=${patientid}`,
        config
      )
      .then((res) => {
        setPatientXrayImageDetails(res.data.data);
      });
  };

  const deleteUploadedXrayImg = async (imageid) => {
    let config = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };
    await axios
      .delete(
        `http://ec2-3-6-218-218.ap-south-1.compute.amazonaws.com:8080/api/v1/report/${imageid}`,
        config
      )
      .then((res) => {
        getXrayImageReport();
      });
  };

  const browseXrayButton = (
    <Button onClick={handleXrayUpload} className="browse-xray-btn">
      <input
        type="file"
        id="file"
        accept=".png, .jpg, .jpeg"
        ref={hiddenXrayFileInput}
        style={{ display: "none" }}
        onChange={(e) => handleXrayImageUpload(e)}
      />
      Browse
    </Button>
  );

  const browseReportButton = (
    <Button onClick={handleReportUpload} className="browse-xray-btn">
      <input
        type="file"
        id="file"
        accept=".png, .jpg, .jpeg"
        ref={hiddenReportFileInput}
        style={{ display: "none" }}
        onChange={(e) => handleReportImageUpload(e)}
      />
      Browse
    </Button>
  );

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

  useEffect(() => {
    getPatientDetails();
    getXrayImageReport();
  }, []);

  return (
    <Form
      onFinish={handleUpdatePatientDetails}
      form={form}
      initialValues={{
        remember: true,
      }}
      autoComplete="off"
      className="my-account-main-div"
    >
      <Helmet>
        <title>Patient My Account</title>
      </Helmet>
      <Row style={{ height: "64px", display: "flex", alignItems: "center" }}>
        <span
          style={{
            fontWeight: 700,
            fontSize: 22,
            margin: "0 0 0 22px",
            color: "#525252",
          }}
        >
          My Account
        </span>
      </Row>
      <Row style={{ padding: "0 23px" }} className="d-flex">
        {/* Profile Pic Col */}
        <Col xs={24} sm={24} md={12} xl={6}>
          <div className="profile-pic-col-main-div">
            <div
              style={{
                padding: "3.3333333333333335vw",
                borderBottom: "1px solid #D9D9D9",
              }}
            >
              <Row style={{ display: "flex", alignItems: "center" }}>
                <Col>
                  <div
                    style={{
                      borderRadius: "40%",
                      background: "#D9D9D9",
                      width: "118px",
                      height: "118px",
                    }}
                  >
                    <Form.Item>
                      <img
                        style={{
                          height: "118px",
                          width: "118px",
                          borderRadius: 40,
                        }}
                        src={
                          patientUserDetails.profile_picture_url
                            ? patientUserDetails.profile_picture_url
                            : ProfilePic
                        }
                        alt=""
                      />
                    </Form.Item>
                  </div>
                </Col>
                <Col>
                  <span>
                    <u
                      style={{
                        fontWeight: "400",
                        fontSize: "16px",
                        color: "#2CA3FA",
                        padding: "0 12px",
                        cursor: "pointer",
                      }}
                      onClick={handleProfilePicUpload}
                    >
                      <input
                        type="file"
                        id="file"
                        accept="image/*"
                        ref={hiddenFilesInput}
                        style={{ display: "none" }}
                        onChange={holdProfilePicFromFiles}
                      />
                      Add / Edit Picture
                    </u>
                  </span>
                </Col>
              </Row>
              <Row
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "27px 0 0 0",
                  gap: "2.302vh",
                }}
              >
                <Row style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      fontWeight: "400",
                      fontSize: "12px",
                      color: "#A5A4A4",
                    }}
                  >
                    Name
                  </span>
                  {patientUserDetails && (
                    <Form.Item
                      name="name"
                      initialValue={patientUserDetails.name}
                      rules={[
                        {
                          required: true,
                          message: "Enter name",
                        },
                      ]}
                    >
                      <Input
                        name="name"
                        label="name"
                        style={{
                          fontWeight: "400",
                          fontSize: "16px",
                          color: "#525252",
                          height: "40px",
                          borderRadius: "3px",
                          border: "1px solid #E3E3E3",
                        }}
                        bordered={false}
                        disabled={inputsEnable}
                      />
                    </Form.Item>
                  )}
                </Row>

                <Row style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      fontWeight: "400",
                      fontSize: "12px",
                      color: "#A5A4A4",
                    }}
                  >
                    Patient Identification
                  </span>
                  {patientUserDetails && (
                    <Form.Item
                      name="patientID"
                      initialValue={"PID# " + patientUserDetails.user_id}
                    >
                      <Input
                        name="patientID"
                        label="patientID"
                        style={{
                          fontWeight: "400",
                          fontSize: "16px",
                          color: "#525252",
                          height: "40px",
                          borderRadius: "3px",
                          border: "1px solid #E3E3E3",
                        }}
                        bordered={false}
                        disabled={true}
                      />
                    </Form.Item>
                  )}
                </Row>

                <Row style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      fontWeight: "400",
                      fontSize: "12px",
                      color: "#A5A4A4",
                    }}
                  >
                    Gender
                  </span>
                  {patientUserDetails && (
                    <Form.Item
                      name="Gender"
                      rules={[{ required: true, message: "Select Gender" }]}
                      initialValue={patientUserDetails.gender}
                    >
                      <Select
                        name="Gender"
                        label="Gender"
                        disabled={inputsEnable}
                        bordered={false}
                        style={{
                          fontWeight: "400",
                          fontSize: "16px",
                          color: "#525252",
                          height: "40px",
                          borderRadius: "3px",
                          border: "1px solid #E3E3E3",
                        }}
                      >
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                        <Option value="Others">Others</Option>
                      </Select>
                    </Form.Item>
                  )}
                </Row>
              </Row>
            </div>
            <div
              style={{
                padding:
                  "3.7151702786377707vh 3.3333333333333335vw 4vh 3.3854166666666665vw",
                borderBottom: "1px solid #D9D9D9",
              }}
            >
              <span
                style={{
                  fontWeight: "400",
                  fontSize: "12px",
                  color: "#A5A4A4",
                }}
              >
                Email
              </span>
              {patientUserDetails && (
                <Form.Item
                  name="email"
                  initialValue={patientUserDetails.email}
                  rules={[
                    { required: true, message: "Enter email" },
                    {
                      type: "email",
                      message: "Enter valid email address",
                    },
                  ]}
                >
                  <Input
                    name="email"
                    label="email"
                    style={{
                      fontWeight: "400",
                      fontSize: "16px",
                      color: "#7D7D7D",
                      height: "40px",
                      borderRadius: "3px",
                      border: "1px solid #E3E3E3",
                    }}
                    disabled={inputsEnable}
                    bordered={false}
                  />
                </Form.Item>
              )}
            </div>
            <div
              style={{
                padding:
                  "3.7151702786377707vh 3.3333333333333335vw 4.615384615384615vh 3.3854166666666665vw",
              }}
            >
              <span
                style={{
                  fontWeight: "400",
                  fontSize: "12px",
                  color: "#A5A4A4",
                }}
              >
                Phone
              </span>
              {patientUserDetails && (
                <Form.Item
                  name="phone"
                  initialValue={patientUserDetails.phone_number}
                  rules={[
                    {
                      required: true,
                      message: "Please enter phone number",
                    },
                  ]}
                >
                  <Input
                    maxLength={20}
                    bordered={false}
                    disabled={inputsEnable}
                    name="phone"
                    label="Phone"
                    addonBefore={
                      <Form.Item
                        name="countryCode"
                        initialValue={patientUserDetails.phone_country_code}
                      >
                        <Select
                          bordered={false}
                          disabled={inputsEnable}
                          label="Code"
                          style={{ color: "#7D7D7D" }}
                        >
                          {phonecode.map((item) => {
                            return (
                              <Option value={item.country}>
                                {item.country}
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                    }
                    style={{
                      fontWeight: "400",
                      fontSize: "16px",
                      border: "1px solid #E3E3E3",
                      color: "#7D7D7D",
                    }}
                  />
                </Form.Item>
              )}
            </div>
          </div>
        </Col>

        {/* Address Col */}
        <Col xs={24} sm={24} md={12} xl={6}>
          <div className="profile-pic-col-main-div">
            <Row style={{ padding: "22px" }}>
              <Col span={2}>
                <img style={{ height: "26px" }} src={LocationIcon} alt="" />
              </Col>
              <Col>
                <span
                  style={{
                    fontWeight: "700",
                    fontSize: "18px",
                    color: "#525252",
                  }}
                >
                  Address
                </span>
              </Col>
            </Row>
            <Row
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5vh",
                padding:
                  "1.3333333333333335vw 3.3333333333333335vw 3.3333333333333335vw 3.3333333333333335vw",
              }}
            >
              <Row style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontWeight: "400",
                    fontSize: "12px",
                    color: "#A5A4A4",
                  }}
                >
                  Address
                </span>
                {patientUserDetails && (
                  <Form.Item
                    name="address"
                    rules={[{ required: true, message: "Enter Address" }]}
                    initialValue={patientUserDetails.address_line_two}
                  >
                    <Input
                      name="address"
                      label="address"
                      style={{
                        fontWeight: "400",
                        fontSize: "16px",
                        color: "#7D7D7D",
                        height: "40px",
                        border: "1px solid #E3E3E3",
                      }}
                      bordered={false}
                      disabled={inputsEnable}
                    />
                  </Form.Item>
                )}
              </Row>

              <Row style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontWeight: "400",
                    fontSize: "12px",
                    color: "#A5A4A4",
                  }}
                >
                  City
                </span>
                {patientUserDetails && (
                  <Form.Item
                    name="cityname"
                    rules={[{ required: true, message: "Enter City" }]}
                    initialValue={patientUserDetails.city}
                  >
                    <Input
                      name="cityname"
                      label="cityname"
                      style={{
                        fontWeight: "400",
                        fontSize: "16px",
                        height: "40px",
                        color: "#7D7D7D",
                        border: "1px solid #E3E3E3",
                      }}
                      bordered={false}
                      disabled={inputsEnable}
                    />
                  </Form.Item>
                )}
              </Row>
              <Row style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontWeight: "400",
                    fontSize: "12px",
                    color: "#A5A4A4",
                  }}
                >
                  Apartment / Suite ETC.,
                </span>
                {patientUserDetails && (
                  <Form.Item
                    name="apartment"
                    initialValue={patientUserDetails.address_line_one}
                    rules={[
                      {
                        required: true,
                        message: "Enter Apartment / Suite Etc.,",
                      },
                    ]}
                  >
                    <Input
                      name="apartment"
                      label="apartment"
                      style={{
                        fontWeight: "400",
                        fontSize: "16px",
                        color: "#7D7D7D",
                        height: "40px",
                        border: "1px solid #E3E3E3",
                      }}
                      bordered={false}
                      disabled={inputsEnable}
                    />
                  </Form.Item>
                )}
              </Row>

              <Row style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontWeight: "400",
                    fontSize: "12px",
                    color: "#A5A4A4",
                  }}
                >
                  Country
                </span>
                {patientUserDetails && (
                  <Form.Item
                    name="country"
                    initialValue={patientUserDetails.country}
                    rules={[{ required: true, message: "Enter Country" }]}
                  >
                    <Input
                      name="country"
                      label="country"
                      style={{
                        fontWeight: "400",
                        fontSize: "16px",
                        height: "40px",
                        color: "#7D7D7D",
                        border: "1px solid #E3E3E3",
                      }}
                      bordered={false}
                      disabled={inputsEnable}
                    />
                  </Form.Item>
                )}
              </Row>

              <Row style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontWeight: "400",
                    fontSize: "12px",
                    color: "#A5A4A4",
                  }}
                >
                  State / Province
                </span>
                {patientUserDetails && (
                  <Form.Item
                    name="state"
                    initialValue={patientUserDetails.province}
                    rules={[
                      { required: true, message: "Enter State / Province" },
                    ]}
                  >
                    <Input
                      name="state"
                      label="state"
                      style={{
                        fontWeight: "400",
                        fontSize: "16px",
                        color: "#7D7D7D",
                        height: "40px",
                        border: "1px solid #E3E3E3",
                      }}
                      bordered={false}
                      disabled={inputsEnable}
                    />
                  </Form.Item>
                )}
              </Row>

              <Row style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontWeight: "400",
                    fontSize: "12px",
                    color: "#A5A4A4",
                  }}
                >
                  Zip Code
                </span>
                {patientUserDetails && (
                  <Form.Item
                    name="zipcode"
                    initialValue={patientUserDetails.zip_code}
                    rules={[{ required: true, message: "Enter Zip code" }]}
                  >
                    <Input
                      name="zipcode"
                      label="zipcode"
                      style={{
                        fontWeight: "400",
                        fontSize: "16px",
                        height: "40px",
                        color: "#7D7D7D",
                        border: "1px solid #E3E3E3",
                      }}
                      bordered={false}
                      disabled={inputsEnable}
                    />
                  </Form.Item>
                )}
              </Row>
            </Row>
          </div>
        </Col>

        {/* Blood group, Citizen ID, Insurance ID Col */}
        <Col xs={24} sm={24} md={12} xl={6}>
          <div>
            {/* Blood group */}
            <div
              className="profile-pic-col-main-div"
              style={{
                margin: "0 0 2.5641025641025643vh 0",
                padding: "1.74vh 24px",
              }}
            >
              <Row className="d-flex ai-center">
                <Col>
                  <img
                    src={bloodgroupicon}
                    alt=""
                    style={{ width: "0.9895833333333334vw" }}
                  />
                </Col>
                <Col>
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: 18,
                      color: "#525252",
                      margin: "0 0 0 13px",
                    }}
                  >
                    Blood Group
                  </span>
                </Col>
              </Row>
              <Row
                style={{
                  margin: "5vh 0 6.2vh 0",
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <Row className="w-100">
                  <span
                    style={{
                      fontWeight: 400,
                      fontSize: 12,
                      color: "#A5A4A4",
                    }}
                  >
                    Blood Group
                  </span>
                </Row>
                <Row className="w-100">
                  {patientUserDetails && (
                    <Form.Item
                      className="w-100"
                      name="bloodgroup"
                      initialValue={patientUserDetails.blood_group}
                      rules={[
                        { required: true, message: "Select blood group" },
                      ]}
                    >
                      <Select
                        name="bloodgroup"
                        label="bloodgroup"
                        bordered={false}
                        disabled={inputsEnable}
                        style={{
                          background: "#FFFFFF",
                          border: "1px solid #E3E3E3",
                          borderRadius: 3,
                          height: "40px",
                          color: "#7D7D7D",
                        }}
                      >
                        <Option value="A+">A+</Option>
                        <Option value="A-">A-</Option>
                        <Option value="B+">B+</Option>
                        <Option value="B-">B-</Option>
                        <Option value="O+">O+</Option>
                        <Option value="O-">O-</Option>
                        <Option value="AAB+">AAB+</Option>
                        <Option value="AAB-">AAB-</Option>
                      </Select>
                    </Form.Item>
                  )}
                </Row>
              </Row>
            </div>
            {/* Citizen ID */}
            <div
              className="profile-pic-col-main-div"
              style={{
                margin: "0 0 2.5641025641025643vh 0",
                padding: "1.74vh 24px",
              }}
            >
              <Row className="d-flex ai-center">
                <Col>
                  <img
                    src={insuranceidicon}
                    alt=""
                    style={{ width: "1.35vw" }}
                  />
                </Col>
                <Col>
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: 18,
                      color: "#525252",
                      margin: "0 0 0 13px",
                    }}
                  >
                    Citizen ID
                  </span>
                </Col>
              </Row>
              <Row
                className=""
                style={{
                  margin: "5vh 0 6.2vh 0",
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <Row className="w-100">
                  <span
                    style={{
                      fontWeight: 400,
                      fontSize: 12,
                      color: "#A5A4A4",
                    }}
                  >
                    Citizen ID
                  </span>
                </Row>
                <Row className="w-100">
                  {patientUserDetails && (
                    <Form.Item
                      className="w-100"
                      name="citizenID"
                      initialValue={patientUserDetails.citizen_id}
                      rules={[{ required: true, message: "Enter Citizen ID" }]}
                    >
                      <Input
                        name="citizenID"
                        label="citizenID"
                        disabled={inputsEnable}
                        className="citizen-id-input"
                      />
                    </Form.Item>
                  )}
                </Row>
              </Row>
            </div>
            {/* Insurance ID */}
            <div
              className="profile-pic-col-main-div"
              style={{
                minHeight: "22.76923076923077vh",
                margin: "0 0 2.5641025641025643vh 0",
                padding: "1.74vh 24px",
              }}
            >
              <Row className="d-flex ai-center">
                <Col>
                  <img src={citizenidicon} alt="" style={{ width: "1.29vw" }} />
                </Col>
                <Col>
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: 18,
                      color: "#525252",
                      margin: "0 0 0 13px",
                    }}
                  >
                    Insurance ID
                  </span>
                </Col>
              </Row>
              <Row
                className=""
                style={{
                  margin: "5vh 0 6.2vh 0",
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <Row className="w-100">
                  <span
                    style={{
                      fontWeight: 400,
                      fontSize: 12,
                      color: "#A5A4A4",
                    }}
                  >
                    Insurance ID
                  </span>
                </Row>
                <Row className="w-100">
                  {patientUserDetails && (
                    <Form.Item
                      className="w-100"
                      name="insuranceID"
                      initialValue={patientUserDetails.insurance_id}
                    >
                      <Input
                        name="insuranceID"
                        label="insuranceID"
                        disabled={inputsEnable}
                        className="insurance-id-input"
                      />
                    </Form.Item>
                  )}
                </Row>
              </Row>
            </div>
          </div>
        </Col>

        {/* upload xray and report Col */}
        <Col xs={24} sm={24} md={12} xl={6}>
          <div
            className="profile-pic-col-main-div"
            style={{
              height: "715px",
              margin: "0 0 2.4615384615384617vh 0",
              padding: "18px 24px 0 24px",
              overflowY: "auto",
            }}
          >
            <Row className="d-flex ai-center">
              <Col>
                <img src={xrayicon} alt="" style={{ width: "0.9vw" }} />
              </Col>
              <Col>
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: 18,
                    color: "#525252",
                    margin: "0 0 0 0.83vw",
                  }}
                >
                  Upload My X-Rays/Reports
                </span>
              </Col>
            </Row>
            <Row style={{ margin: "33px 0 0 0" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  minHeight: "123px",
                  background: "#F2FAFF",
                }}
              >
                <Button
                  style={{
                    height: "44px",
                    width: "96px",
                    background: "#FFFFFF",
                    border: "1.7px solid #009DF7",
                    borderRadius: "30PX",
                    fontWeight: "600",
                    fontSize: "15.5PX",
                    color: "#2CA3FA",
                  }}
                  onClick={showDrawer}
                >
                  Add
                </Button>
                {/* add xray drawer */}
                <Drawer
                  width={window.innerWidth > 500 && "485px"}
                  className="upload-xray-drawer"
                  style={{ top: "7.45vh" }}
                  closable={false}
                  open={openDrawer}
                  mask={false}
                  destroyOnClose={false}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      padding: "0 15px 0 0",
                      width: "100%",
                      height: "15px",
                    }}
                  >
                    <img
                      style={{
                        color: "#FF0000",
                        height: "14px",
                        cursor: "pointer",
                      }}
                      src={RedXMarkIcon}
                      alt=""
                      onClick={onClose}
                    />
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "75vh",
                      overflowY: "scroll",
                    }}
                  >
                    {/* ......................................For uploading x-rays  ........................................................... */}
                    <Row style={{ width: "100%" }}>
                      <span style={{ fontWeight: "700", fontSize: "18px" }}>
                        Add X-Rays
                      </span>
                    </Row>
                    <Row
                      style={{
                        margin: "6px 0 0 0",
                        width: "100%",
                        padding: "0 0 12px 0",
                        background: "#F8F8F8",
                        border: "1px solid #E3E3E3",
                        borderRadius: "3px",
                      }}
                    >
                      <Col span={24} style={{ padding: "7.5px 8px 0 8px" }}>
                        <Form onFinish={handleAddXrayToDrawer} form={xrayform}>
                          <Row>
                            <Form.Item className="w-100" name="xray_report">
                              <Input
                                disabled={true}
                                label="xray_report"
                                suffix={browseXrayButton}
                                style={{
                                  width: "100%",
                                  height: "42px",
                                  color: "#7D7D7D",
                                }}
                                placeholder={
                                  xrayFileName && xrayFileName
                                    ? xrayFileName.name
                                    : "Browse X-Ray"
                                }
                              />
                            </Form.Item>
                          </Row>
                          <Row style={{ margin: "6.5px 0 0 0" }}>
                            <Form.Item
                              className="w-100"
                              name="xray_title"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter xray title",
                                },
                              ]}
                            >
                              <Input
                                style={{
                                  background: "#FFFFFF",
                                  border: "1px solid #E3E3E3",
                                  borderRadius: "3px",
                                  width: "100%",
                                  height: "42px",
                                  color: "#525252",
                                }}
                                value={titleForUploadingXrayImages}
                                onChange={(e) =>
                                  setTitleForUploadingXrayImages(e.target.value)
                                }
                                placeholder="X-Ray Title"
                              />
                            </Form.Item>
                          </Row>
                          <Row
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              margin: "9px 0 0 0",
                            }}
                          >
                            <Form.Item>
                              <Button
                                htmlType="submit"
                                style={{
                                  height: "30px",
                                  width: "66px",
                                  background: "#ECFEFF",
                                  border: "1px solid #29C3C1",
                                  borderRadius: "30px",
                                  fontWeight: "600",
                                  fontSize: "14px",
                                  color: "#29C3C1",
                                }}
                              >
                                Add
                              </Button>
                            </Form.Item>
                          </Row>
                        </Form>
                      </Col>
                    </Row>
                    {xRayArrayStore &&
                      xRayArrayStore.map((displayXrayData, i) => {
                        return (
                          <Row
                            style={{
                              width: "100%",
                              margin: "27.5px 0 0 0",
                              padding: "0 10px 0 10px",
                            }}
                          >
                            <Row style={{ width: "100%" }}>
                              <Col span={4}>
                                <img
                                  style={{ height: "41px", width: "59px" }}
                                  src={
                                    displayXrayData.file_mime_type === imageJPEG
                                      ? jpegimagedatabaseurl +
                                        displayXrayData.report_image
                                      : pngimagedatabaseurl +
                                        displayXrayData.report_image
                                  }
                                  alt=""
                                />
                              </Col>
                              <Col
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                                span={17}
                              >
                                <span
                                  style={{
                                    fontWeight: "600",
                                    fontSize: "14px",
                                    color: "#2CA3FA",
                                  }}
                                >
                                  {displayXrayData.title}
                                </span>
                              </Col>
                              <Col
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                                span={3}
                              >
                                <img
                                  style={{ height: "15px" }}
                                  src={deletexrayicon}
                                  alt=""
                                  onClick={() =>
                                    handleDeletingXrayFromInitialList(i)
                                  }
                                />
                              </Col>
                            </Row>
                            <Row
                              style={{
                                margin: "17px 0 0 0",
                                width: "100%",
                                height: "1px",
                                border: "1px solid #E8E8E8",
                                background: "#E8E8E8",
                              }}
                            ></Row>
                          </Row>
                        );
                      })}

                    {/* .............................................................. ............................................................................. */}

                    {/* ......................................For uploading Reports  ........................................................... */}

                    <Row style={{ width: "100%" }}>
                      <span
                        style={{
                          fontWeight: "700",
                          fontSize: "18px",
                          margin: "50px 0 0 0",
                        }}
                      >
                        Add Other Reports
                      </span>
                    </Row>
                    <Row
                      style={{
                        margin: "6px 0 0 0",
                        width: "100%",
                        padding: "0 0 12px 0",
                        background: "#F8F8F8",
                        border: "1px solid #E3E3E3",
                        borderRadius: "3px",
                      }}
                    >
                      <Col span={24} style={{ padding: "7.5px 8px 0 8px" }}>
                        <Form
                          onFinish={handleAddReportsToDrawer}
                          form={otherform}
                        >
                          <Row>
                            <Form.Item className="w-100" name="other_report">
                              <Input
                                label="other_report"
                                suffix={browseReportButton}
                                style={{
                                  width: "100%",
                                  height: "42px",
                                  color: "#7D7D7D",
                                }}
                                disabled={true}
                                placeholder={
                                  reportFileName && reportFileName
                                    ? reportFileName.name
                                    : "Browse X-Ray"
                                }
                              />
                            </Form.Item>
                          </Row>
                          <Row style={{ margin: "6.5px 0 0 0" }}>
                            <Form.Item
                              initialValue={xrayFileName && xrayFileName.name}
                              className="w-100"
                              name="report_title"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter title",
                                },
                              ]}
                            >
                              <Input
                                label="report_title"
                                style={{
                                  background: "#FFFFFF",
                                  border: "1px solid #E3E3E3",
                                  borderRadius: "3px",
                                  width: "100%",
                                  height: "42px",
                                  color: "#525252",
                                }}
                                value={titleForUploadingReportImages}
                                onChange={(e) =>
                                  setTitleForUploadingReportImages(
                                    e.target.value
                                  )
                                }
                                placeholder="Report Title"
                              />
                            </Form.Item>
                          </Row>
                          <Row
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              margin: "9px 0 0 0",
                            }}
                          >
                            <Form.Item>
                              <Button
                                htmlType="submit"
                                style={{
                                  height: "30px",
                                  width: "66px",
                                  background: "#ECFEFF",
                                  border: "1px solid #29C3C1",
                                  borderRadius: "30px",
                                  fontWeight: "600",
                                  fontSize: "14px",
                                  color: "#29C3C1",
                                }}
                              >
                                Add
                              </Button>
                            </Form.Item>
                          </Row>
                        </Form>
                      </Col>
                    </Row>
                    {reportArrayStore &&
                      reportArrayStore.map((displayReportData, i) => {
                        return (
                          <Row
                            style={{
                              width: "100%",
                              margin: "27.5px 0 0 0",
                              padding: "0 10px 0 10px",
                            }}
                          >
                            <Row style={{ width: "100%" }}>
                              <Col span={4}>
                                <img
                                  style={{ height: "41px", width: "59px" }}
                                  src={
                                    displayReportData.file_mime_type ===
                                    imageJPEG
                                      ? jpegimagedatabaseurl +
                                        displayReportData.report_image
                                      : pngimagedatabaseurl +
                                        displayReportData.report_image
                                  }
                                  alt=""
                                />
                              </Col>
                              <Col
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                                span={17}
                              >
                                <span
                                  style={{
                                    fontWeight: "600",
                                    fontSize: "14px",
                                    color: "#2CA3FA",
                                  }}
                                >
                                  {displayReportData.title}
                                </span>
                              </Col>
                              <Col
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                                span={3}
                              >
                                <img
                                  style={{ height: "15px" }}
                                  src={deletexrayicon}
                                  alt=""
                                  onClick={() =>
                                    handleDeletingReportFromInitialList(i)
                                  }
                                />
                              </Col>
                            </Row>
                            <Row
                              style={{
                                margin: "17px 0 0 0",
                                width: "100%",
                                height: "1px",
                                border: "1px solid #E8E8E8",
                                background: "#E8E8E8",
                              }}
                            ></Row>
                          </Row>
                        );
                      })}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: "10vh",
                    }}
                  >
                    <Button
                      style={{
                        height: "30px",
                        width: "85px",
                        background: "#E0F2FF",
                        border: "1px solid #009DF7",
                        borderRadius: "30px",
                        color: "#2CA3FA",
                        fontWeight: "600",
                        fontSize: "14px",
                      }}
                      onClick={addXRayAndReportImage}
                    >
                      Submit
                    </Button>
                  </div>

                  {/* .............................................................. ............................................................................. */}
                </Drawer>
              </div>
            </Row>
            {/* xray and other reports map */}
            {patientXrayImageDetails && patientXrayImageDetails.length > 0 ? (
              patientXrayImageDetails.map((xrayAndReportData, id) => {
                return (
                  <Row style={{ margin: "10px 0 0 0" }}>
                    <div
                      style={{
                        width: "100%",
                        background: "#F9F9F9",
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                        padding: "17.5px 0",
                      }}
                    >
                      {/* xrays map */}
                      <div
                        style={{
                          padding: "0 13px",
                          display: "flex",
                          flexDirection: "column",
                          gap: 12,
                        }}
                      >
                        {xrayAndReportData.xray_reports &&
                          xrayAndReportData.xray_reports.map((xrayData) => {
                            return (
                              <Row
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  width: "100%",
                                }}
                              >
                                <Col span={3}>
                                  <img
                                    src={
                                      xrayData.report_type === "xray"
                                        ? XRayTextIcon
                                        : ReportTextIcon
                                    }
                                    alt=""
                                    style={{ height: "24px" }}
                                  />
                                </Col>
                                <Col
                                  span={18}
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontWeight: "500",
                                      fontSize: "14px",
                                      lineHeight: "17px",
                                    }}
                                  >
                                    {xrayData.title}
                                  </span>
                                  <span
                                    style={{
                                      fontWeight: "400",
                                      fontSize: "13px",
                                      lineHeight: "17px",
                                    }}
                                  >
                                    {xrayData.uploaded_at &&
                                      moment(xrayData.uploaded_at).format(
                                        "ddd, DD/MM/YYYY HH:mm A"
                                      )}
                                  </span>
                                </Col>
                                <Col
                                  span={3}
                                  style={{
                                    display: "flex",
                                    justifyContent: "end",
                                  }}
                                >
                                  <img
                                    style={{
                                      cursor: "pointer",
                                    }}
                                    src={XMarkIcon}
                                    alt=""
                                    onClick={() =>
                                      deleteUploadedXrayImg(xrayData.id)
                                    }
                                  />
                                </Col>
                              </Row>
                            );
                          })}
                      </div>
                      {/* other reports map */}
                      <div
                        style={{
                          padding: "0 13px",
                          display: "flex",
                          flexDirection: "column",
                          gap: 12,
                        }}
                      >
                        {xrayAndReportData.other_reports &&
                          xrayAndReportData.other_reports.map((reportsData) => {
                            return (
                              <Row
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  width: "100%",
                                  height: "30px",
                                }}
                              >
                                <Col span={3}>
                                  <img
                                    src={
                                      reportsData.report_type === "other"
                                        ? ReportTextIcon
                                        : XRayTextIcon
                                    }
                                    alt=""
                                    style={{ height: "24px" }}
                                  />
                                </Col>
                                <Col
                                  span={18}
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontWeight: "500",
                                      fontSize: "14px",
                                      lineHeight: "17px",
                                    }}
                                  >
                                    {reportsData.title}
                                  </span>
                                  <span
                                    style={{
                                      fontWeight: "400",
                                      fontSize: "13px",
                                      lineHeight: "17px",
                                    }}
                                  >
                                    {reportsData.uploaded_at &&
                                      moment(reportsData.uploaded_at).format(
                                        "ddd, DD/MM/YYYY HH:mm A"
                                      )}
                                    {/* Sat, 23/01/2023 09:30 AM */}
                                  </span>
                                </Col>
                                <Col
                                  span={3}
                                  style={{
                                    display: "flex",
                                    justifyContent: "end",
                                  }}
                                >
                                  <img
                                    src={XMarkIcon}
                                    alt=""
                                    onClick={() =>
                                      deleteUploadedXrayImg(reportsData.id)
                                    }
                                  />
                                </Col>
                              </Row>
                            );
                          })}
                      </div>
                    </div>
                  </Row>
                );
              })
            ) : (
              <div
                className="d-flex jc-center ai-center"
                style={{
                  height: "50vh",
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
                  }}
                >
                  You have No Xrays Upload Here
                </span>
              </div>
            )}
          </div>
        </Col>
      </Row>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "19px",
          margin: "20px 0 50px 0",
        }}
      >
        <Button
          style={{
            height: "30px",
            width: "64px",
            border: "1px solid #009DF7",
            borderRadius: "30px",
            color: "#009DF7",
          }}
          onClick={enableFormFields}
        >
          Edit
        </Button>
        <Button
          style={{
            height: "30px",
            width: "64px",
            border: "1px solid #29C3C1",
            borderRadius: "30px",
            color: "#29C3C1",
            background: "#ECFEFF",
          }}
          htmlType="submit"
          onClick={uploadProfilePic}
        >
          Save
        </Button>
      </Row>
    </Form>
  );
};

export default MyAccount;
