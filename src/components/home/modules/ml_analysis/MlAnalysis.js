import { Button, Col, Drawer, Form, Input, Pagination, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import "./MlAnalysis.css";
import xray from "../../../../assets/xray.png";
import docdownloadicon from "../../../../assets/add-report-icon.png";
import { SearchOutlined } from "@ant-design/icons";
import { EllipsisOutlined } from "@ant-design/icons/lib/icons";
import axios from "axios";
import XrayAndReportDetails from "./xray_and_report_details/XrayAndReportDetails";
import { Helmet } from "react-helmet";
import deletexrayicon from "../../../../assets/delete-xray-icon.png";
import RedXMarkIcon from "../../../../assets/red-X-mark-Icon.png";

const MlAnalysis = () => {
  const patientid = localStorage.getItem("PatientID");
  const Token = localStorage.getItem("Token");

  const [xrayform] = Form.useForm();
  const [otherform] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [xrayAndReportsDetails, setXrayAndReportsDetails] = useState([]);
  const [xrayArrayId, setXrayArrayId] = useState();
  const [ReportArrayId, setReporArraytId] = useState();
  const [imgUrl, setImgUrl] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [xRayArrayStore, setXrayArrayStore] = useState([]);
  const [getXRayImageDetailsToStore, setGetXRayImageDetailsToStore] =
    useState("");
  const [titleForUploadingXrayImages, setTitleForUploadingXrayImages] =
    useState("");
  const [xrayFileName, setXrayFileName] = useState(null);
  const [reportArrayStore, setReportArrayStore] = useState([]);
  const [getReportImageDetailsToStore, setGetReportImageDetailsToStore] =
    useState("");
  const [titleForUploadingReportImages, setTitleForUploadingReportImages] =
    useState("");
  const [reportFileName, setReportFileName] = useState(null);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const onClose = () => {
    setOpenDrawer(false);
  };

  const imageJPEG = "image/jpeg";
  const imagePNG = "image/png";
  const jpegimagedatabaseurl = "data:image/jpeg;base64,/9j/";
  const pngimagedatabaseurl = "data:image/png;base64,";

  // for Uploading Xray and report
  const hiddenXrayFileInput = useRef(null);
  const hiddenReportFileInput = useRef(null);

  const handleXrayUpload = () => {
    hiddenXrayFileInput.current.click();
  };

  const handleReportUpload = () => {
    hiddenReportFileInput.current.click();
  };

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

  const handleDeletingXrayFromInitialList = (index) => {
    const newItems = xRayArrayStore.filter((item, i) => i !== index);
    setXrayArrayStore(newItems);
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

  const handleGettingMLDetails = async () => {
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
        setXrayAndReportsDetails(res.data.data);
      });
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
      handleGettingMLDetails();
    }
  };

  const deleteUploadedXrayImg = async (reportid) => {
    let config = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };
    await axios
      .delete(
        `http://ec2-3-6-218-218.ap-south-1.compute.amazonaws.com:8080/api/v1/report/${reportid}`,
        config
      )
      .then((res) => {
        handleGettingMLDetails();
      });
  };

  const xraydata = [
    {
      id: 1,
      clinic: "Happy Smile Clinic",
      clinicid: "Cln ID: # 365-546",
      timestamp: "Sat, 23/01/2023 09:30 AM",
      documents: [
        { doc: "Document name 1" },
        { doc: "Document name 2" },
        { doc: "Document name 3" },
        { doc: "Document name 4" },
        { doc: "Document name 5" },
        { doc: "Document name 6" },
        { doc: "Document name 7" },
      ],
    },
    {
      id: 2,
      clinic: "Happy Smile Clinic",
      clinicid: "Cln ID: # 365-546",
      timestamp: "Sat, 23/01/2023 09:30 AM",
      documents: [
        { doc: "Document name 1" },
        { doc: "Document name 2" },
        { doc: "Document name 3" },
      ],
    },
    {
      id: 3,
      clinic: "Self",
      clinicid: "Cln ID: # 365-546",
      timestamp: "Sat, 23/01/2023 09:30 AM",
      documents: [
        { doc: "Document name 1" },
        { doc: "Document name 2" },
        { doc: "Document name 3" },
        { doc: "Document name 3" },
        { doc: "Document name 3" },
      ],
    },
    {
      id: 4,
      clinic: "Happy Smile Clinic",
      clinicid: "Cln ID: # 365-546",
      timestamp: "Sat, 23/01/2023 09:30 AM",
      documents: [{ doc: "Document name 1" }, { doc: "Document name 3" }],
    },
    {
      id: 5,
      clinic: "Happy Smile Clinic",
      clinicid: "Cln ID: # 365-546",
      timestamp: "Sat, 23/01/2023 09:30 AM",
      documents: [
        { doc: "Document name 1" },
        { doc: "Document name 2" },
        { doc: "Document name 3" },
        { doc: "Document name 3" },
      ],
    },
    {
      id: 6,
      clinic: "Happy Smile Clinic",
      clinicid: "Cln ID: # 365-546",
      timestamp: "Sat, 23/01/2023 09:30 AM",
      documents: [{ doc: "Document name 1" }, { doc: "Document name 3" }],
    },
    {
      id: 7,
      clinic: "Self",
      clinicid: "Cln ID: # 365-546",
      timestamp: "Sat, 23/01/2023 09:30 AM",
      documents: [{ doc: "Document name 2" }, { doc: "Document name 3" }],
    },
  ];
  const pageSize = 6;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentXrayData = xraydata && xraydata.slice(startIndex, endIndex);

  useEffect(() => {
    handleGettingMLDetails();
  }, []);

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

  return (
    <div className="ml-analysis-main-div">
      <Helmet>
        <title>ML Analysis</title>
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
          ML Analysis
        </span>
        {xrayAndReportsDetails.length > 0 && (
          <Button
            style={{
              display: "flex",
              alignItems: "center",
              height: "32px",
              width: "127px",
              border: "1px solid #009DF7",
              borderRadius: "30px",
              fontWeight: "600",
              fontSize: "16px",
              color: "#2CA3FA",
            }}
            onClick={showDrawer}
          >
            Add Reports
          </Button>
        )}
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
        {xrayAndReportsDetails.length > 0 && (
          <Row
            className="xray-details"
            style={{
              width: "100%",
              padding: "0 13px",
              margin: "23px 15px 15px 0",
            }}
          >
            <Col sm={4} md={4} lg={4}>
              <span className="xray-details-heading">Upload Date</span>
            </Col>
            <Col sm={8} md={11} lg={13} xxl={14}>
              <span className="xray-details-heading">Clinic Name / Self</span>
            </Col>
            <Col sm={4} md={4} lg={3} xxl={2}>
              <span className="xray-details-heading">Xray Reports</span>
            </Col>
            <Col sm={3} md={4} lg={3}>
              <span className="xray-details-heading">Other Reports</span>
            </Col>
          </Row>
        )}
        <Row className="w-100">
          {xrayAndReportsDetails.length > 0 ? (
            xrayAndReportsDetails.map((xayandreport, id) => {
              return (
                <XrayAndReportDetails
                  xayandreport={xayandreport}
                  xrayAndReportsDetails={xrayAndReportsDetails}
                  setXrayArrayId={setXrayArrayId}
                  xrayArrayId={xrayArrayId}
                  xrayAndReportId={id}
                  ReportArrayId={ReportArrayId}
                  setReporArraytId={setReporArraytId}
                  deleteUploadedXrayImg={deleteUploadedXrayImg}
                />
              );
            })
          ) : (
            <Row
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
                onClick={showDrawer}
              >
                Add Reports
              </Button>
            </Row>
          )}
        </Row>
      </Row>
      <Row
        className="d-flex ai-center jc-end"
        style={{
          margin: "23px",
        }}
      >
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={xraydata && xraydata.length}
          onChange={onPageChange}
        />
      </Row>
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
                            : pngimagedatabaseurl + displayXrayData.report_image
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
                        onClick={() => handleDeletingXrayFromInitialList(i)}
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
              <Form onFinish={handleAddReportsToDrawer} form={otherform}>
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
                        setTitleForUploadingReportImages(e.target.value)
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
                          displayReportData.file_mime_type === imageJPEG
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
                        onClick={() => handleDeletingReportFromInitialList(i)}
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
  );
};

export default MlAnalysis;
