import { Helmet } from "react-helmet";
import { Row, Input, Form, Col, Button, Select, Breadcrumb } from "antd";
import { Option } from "antd/lib/mentions";
import React, { useEffect, useRef, useState } from "react";
import ProfilePic from "../../../../../assets/default-profile-pic.png";
import { routes_clinic_admin_administrator } from "../../../../../utils/clinic_admin_constants/ClinicAdminConstants";

const AddAdmin = () => {
  const [form] = Form.useForm();
  const [inputsEnable, setInputsEnable] = useState(false);
  const [patientUserDetails, setPatientUserDetails] = useState("");

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

  const getPatientDetails = async () => {
    // let config = {
    //   headers: {
    //     Authorization: `Bearer ${Token}`,
    //   },
    // };
    // await axios
    //   .get(
    //     `http://ec2-3-6-218-218.ap-south-1.compute.amazonaws.com:8080/api/v1/patient/${patientid}`,
    //     config
    //   )
    //   .then((res) => {
    //     setPatientUserDetails(res.data.data);
    //   });
  };

  const handleProfilePicUpload = () => {
    hiddenFilesInput.current.click();
  };

  const uploadProfilePic = async (e) => {
    // let formData = new FormData();
    // formData.append("file", getProfilePic);
    // let config = {
    //   headers: {
    //     Authorization: `Bearer ${Token}`,
    //   },
    // };
    // await axios
    //   .post(
    //     `http://ec2-3-6-218-218.ap-south-1.compute.amazonaws.com:8080/api/v1/patient/${patientid}/upload-profile-picture`,
    //     formData,
    //     config
    //   )
    //   .then((res) => console.log(res.data));
    // getPatientDetails();
  };

  /*......................................................................................*/

  // for Uploading Xray Multiple Times
  const handleAddXrayToDrawer = (values) => {
    // if (imgUrl !== null) {
    //   let tempXrayArr = xRayArrayStore;
    //   tempXrayArr.push({
    //     name: getXRayImageDetailsToStore.name.split(`.`)[0],
    //     title: values.xray_title,
    //     file_mime_type: getXRayImageDetailsToStore.type,
    //     report_type: "xray",
    //     report_image: imgUrl,
    //   });
    //   setXrayArrayStore(tempXrayArr);
    //   xrayform.resetFields();
    //   setTitleForUploadingXrayImages("");
    //   setImgUrl(null);
    //   setXrayFileName(null);
    // }
  };

  const handleDeletingXrayFromInitialList = (index) => {
    // const newItems = xRayArrayStore.filter((item, i) => i !== index);
    // setXrayArrayStore(newItems);
  };

  // for Uploading Report Multiple Times
  const handleAddReportsToDrawer = (values) => {
    // if (imgUrl !== null) {
    //   let tempReportArr = reportArrayStore;
    //   tempReportArr.push({
    //     name: getReportImageDetailsToStore.name.split(`.`)[0],
    //     title: values.report_title,
    //     file_mime_type: getReportImageDetailsToStore.type,
    //     report_type: "other",
    //     report_image: imgUrl,
    //   });
    //   setReportArrayStore(tempReportArr);
    //   otherform.resetFields();
    //   setTitleForUploadingReportImages("");
    //   setImgUrl(null);
    //   setReportFileName(null);
    // }
  };

  const handleDeletingReportFromInitialList = (index) => {
    // const newItems = reportArrayStore.filter((item, i) => i !== index);
    // setReportArrayStore(newItems);
  };

  // Button click action for Uploading X-ray Multiple Times
  const handleXrayImageUpload = (e) => {
    // setXrayFileName(e.target.files[0]);
    // const xrayfile = e.target.files[0];
    // setGetXRayImageDetailsToStore(xrayfile);
    // const reader = new FileReader();
    // reader.readAsDataURL(xrayfile);
    // reader.onloadend = () => {
    //   if (xrayfile.type === imageJPEG) {
    //     const base64String = reader.result.split(jpegimagedatabaseurl)[1];
    //     setImgUrl(base64String);
    //   } else if (xrayfile.type === imagePNG) {
    //     const base64String = reader.result.split(pngimagedatabaseurl)[1];
    //     setImgUrl(base64String);
    //   }
    // };
  };

  // Button click action for Uploading Report Multiple Times
  const handleReportImageUpload = (e) => {
    // const otherfile = e.target.files[0];
    // setReportFileName(e.target.files[0]);
    // setGetReportImageDetailsToStore(otherfile);
    // const reader = new FileReader();
    // reader.readAsDataURL(otherfile);
    // reader.onloadend = () => {
    //   if (otherfile.type === imageJPEG) {
    //     const base64String = reader.result.split(jpegimagedatabaseurl)[1];
    //     setImgUrl(base64String);
    //   } else if (otherfile.type === imagePNG) {
    //     const base64String = reader.result.split(pngimagedatabaseurl)[1];
    //     setImgUrl(base64String);
    //   }
    // };
  };

  const addXRayAndReportImage = async () => {
    // onClose();
    // const addingXrayAndReportData = xRayArrayStore.concat(reportArrayStore);
    // let i = 0;
    // for (i = 0; i <= addingXrayAndReportData.length; i++) {
    //   const payload = {
    //     reports: [
    //       {
    //         file_name: addingXrayAndReportData[i].name,
    //         title: addingXrayAndReportData[i].title,
    //         file_mime_type: addingXrayAndReportData[i].file_mime_type,
    //         report_type: addingXrayAndReportData[i].report_type,
    //         report_image: addingXrayAndReportData[i].report_image,
    //       },
    //     ],
    //     patient_id: patientid,
    //     report_image_needed: false,
    //   };
    //   let config = {
    //     headers: {
    //       Authorization: `Bearer ${Token}`,
    //     },
    //   };
    //   await axios
    //     .post(
    //       `http://ec2-3-6-218-218.ap-south-1.compute.amazonaws.com:8080/api/v1/report`,
    //       payload,
    //       config
    //     )
    //     .then((res) => {});
    //   getXrayImageReport();
    // }
  };

  const getXrayImageReport = async () => {
    // let config = {
    //   headers: {
    //     Authorization: `Bearer ${Token}`,
    //   },
    // };
    // await axios
    //   .get(
    //     `http://ec2-3-6-218-218.ap-south-1.compute.amazonaws.com:8080/api/v1/report?patient_id=${patientid}`,
    //     config
    //   )
    //   .then((res) => {
    //     setPatientXrayImageDetails(res.data.data);
    //   });
  };

  const deleteUploadedXrayImg = async (imageid) => {
    // let config = {
    //   headers: {
    //     Authorization: `Bearer ${Token}`,
    //   },
    // };
    // await axios
    //   .delete(
    //     `http://ec2-3-6-218-218.ap-south-1.compute.amazonaws.com:8080/api/v1/report/${imageid}`,
    //     config
    //   )
    //   .then((res) => {
    //     getXrayImageReport();
    //   });
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
    <div className="add-staff-main-div">
      <Helmet>
        <title>Add New Admin</title>
      </Helmet>
      <Row
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "12px 23px",
        }}
      >
        <span
          style={{
            fontWeight: 700,
            fontSize: 22,
            color: "#525252",
          }}
        >
          Add New Admin
        </span>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href={routes_clinic_admin_administrator}>Administrator</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Add New Admin</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row className="w-100" style={{ padding: "0 0 0 23px" }}>
        <Form
          form={form}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          className="w-100"
        >
          <Row className="d-flex">
            {/* profile col */}
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
                            src={ProfilePic}
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
                            // onChange={holdProfilePicFromFiles}
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

                      <Form.Item
                        name="name"
                        //   initialValue={patientUserDetails.name}
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

                      <Form.Item
                        name="patientID"
                        //   initialValue={"PID# " + patientUserDetails.user_id}
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

                      <Form.Item
                        name="Gender"
                        rules={[{ required: true, message: "Select Gender" }]}
                        //   initialValue={patientUserDetails.gender}
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

                  <Form.Item
                    name="email"
                    //   initialValue={patientUserDetails.email}
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

                  <Form.Item
                    name="phone"
                    //   initialValue={patientUserDetails.phone_number}
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
                </div>
              </div>
            </Col>
            {/* address col */}
            <Col xs={24} sm={24} md={12} xl={6}>
              <div className="profile-pic-col-main-div">
                <Row
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5vh",
                    padding: "53px 23px",
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
                      Designation
                    </span>
                    <Form.Item
                      name="address"
                      rules={[{ required: true, message: "Enter Address" }]}
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
                  </Row>
                </Row>
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
                border: "1px solid #F7927E",
                borderRadius: "30px",
                color: "#F7927E",
                background: "#FFF6F2",
              }}
              //   onClick={enableFormFields}
            >
              Cancel
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
              //   onClick={uploadProfilePic}
            >
              Add
            </Button>
          </Row>
        </Form>
      </Row>
    </div>
  );
};

export default AddAdmin;
