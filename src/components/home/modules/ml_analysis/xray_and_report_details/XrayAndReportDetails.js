import { CloseOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, Modal, Radio, Row } from "antd";
import React, { useState } from "react";
import docdownloadicon from "../../../../../assets/add-report-icon.png";
import moment from "moment";
import ImageComponent from "../../patient_dashboard/xray_image_component/XrayImageComponent";
import xray from "../../../../../assets/xray.png";

const XrayAndReportDetails = (props) => {
  const {
    xayandreport,
    xrayAndReportsDetails,
    xrayArrayId,
    setXrayArrayId,
    xrayAndReportId,
    ReportArrayId,
    setReporArraytId,
    deleteUploadedXrayImg,
  } = props;
  const [IsOpenFullXrayModal, setIsOpenFullXrayModal] = useState(false);
  const [downloadDocModal, setDownloadDocModal] = useState(false);
  const [xrayMimeType, setxrayMimeType] = useState("");
  const [xrayImageUrl, setXrayImageUrl] = useState("");

  const openXrayModalAndSendingImageUrl = (fileMimeType, imageUrl) => {
    setIsOpenFullXrayModal(true);
    setxrayMimeType(fileMimeType);
    setXrayImageUrl(imageUrl);
  };

  const handleSendingImageUrl = (fileMimeType, imageUrl) => {
    setxrayMimeType(fileMimeType);
    setXrayImageUrl(imageUrl);
  };

  const openReportModalAndSendingImageUrl = (fileMimeType, imageurl) => {
    setDownloadDocModal(true);
    setxrayMimeType(fileMimeType);
    setXrayImageUrl(imageurl);
  };

  const handleSendingReportImageUrl = (fileMimeType, imageUrl) => {
    setxrayMimeType(fileMimeType);
    setXrayImageUrl(imageUrl);
  };
  const imageJPEG = "image/jpeg";
  const imagePNG = "image/png";
  const jpegimagedatabaseurl = "data:image/jpeg;base64,/9j/";
  const pngimagedatabaseurl = "data:image/png;base64,";
  return (
    <Row
      style={{
        width: "94vw",
        background: "#FBFBFB",
        borderRadius: 5,
        padding: "16px 13px",
        margin: "0 0 5px 0",
      }}
    >
      <Col
        xxl={4}
        md={4}
        lg={4}
        xs={24}
        sm={4}
        style={{
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
          // justifyContent: "space-between",
        }}
      >
        <span className="xray-timestamp">
          {xayandreport.uploaded_at &&
            moment(xayandreport.uploaded_at).format("ddd, DD/MM/YYYY ")}
        </span>
        <span className="xray-timestamp">
          {xayandreport.uploaded_at &&
            moment(xayandreport.uploaded_at).format("HH:mm A")}
        </span>
        <EllipsisOutlined
          rotate={90}
          style={{
            fontSize: "22px",
            display: window.innerWidth > 576 && "none",
          }}
        />
      </Col>
      <Col
        xxl={14}
        md={11}
        lg={13}
        xs={24}
        sm={8}
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        {xayandreport.uploaded_by === "Self" ? (
          <span className="self-clinic">{xayandreport.uploaded_by}</span>
        ) : (
          <span className="dashboard-clinic-name">
            {xayandreport.uploaded_by}
          </span>
        )}

        <span className="clinic-id">cid{xayandreport.uploader_id}</span>
      </Col>
      <Col
        md={4}
        lg={3}
        // xs={2}
        xxl={2}
        sm={5}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {xayandreport.xray_reports &&
          xayandreport.xray_reports.slice(0, 1).map((xrayimages) => {
            return (
              <>
                <img
                  src={
                    xrayimages.file_mime_type === imageJPEG
                      ? jpegimagedatabaseurl + xrayimages.report_image
                      : pngimagedatabaseurl + xrayimages.report_image
                  }
                  alt=""
                  style={{
                    margin: window.innerWidth < 576 && "10px",
                    width: "81px",
                    height: "56px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setXrayArrayId(xrayAndReportId);
                    openXrayModalAndSendingImageUrl(
                      xrayimages.file_mime_type,
                      xrayimages.report_image
                    );
                  }}
                />
                {/* Modal for displaying multiple Xrays */}

                <Modal
                  open={IsOpenFullXrayModal}
                  centered
                  footer={false}
                  closable={false}
                  width={"51.145833333333336vw"}
                  mask={false}
                >
                  <div
                    style={{
                      height: "75.07692307692308vh",
                    }}
                  >
                    <Row className="d-flex jc-between ai-center">
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: 22,
                          color: "#525252",
                        }}
                      >
                        ML Analysis
                      </span>
                      <CloseOutlined
                        style={{
                          color: "red",
                          fontSize: "16px",
                        }}
                        onClick={() => setIsOpenFullXrayModal(false)}
                      />
                    </Row>
                    <Row
                      style={{
                        width: "100%",
                        margin: "25px 0 0 0",
                        gap: "10px",
                      }}
                    >
                      {xrayAndReportsDetails &&
                        xrayAndReportsDetails
                          .filter((item, id) => id === xrayArrayId)
                          .map((item, id) => {
                            return (
                              <Col span={7}>
                                {item.xray_reports.map((item) => {
                                  return (
                                    <Row
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        background: "#F1FBFF",
                                        height: "72px",
                                        margin: "5px 0 0 0",
                                      }}
                                    >
                                      <Col
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                        }}
                                        span={9}
                                      >
                                        <img
                                          style={{
                                            height: "41px",
                                            width: "59px",
                                            cursor: "pointer",
                                          }}
                                          src={
                                            item.file_mime_type === imageJPEG
                                              ? jpegimagedatabaseurl +
                                                item.report_image
                                              : pngimagedatabaseurl +
                                                item.report_image
                                          }
                                          alt=""
                                          onClick={() =>
                                            handleSendingImageUrl(
                                              item.file_mime_type,
                                              item.report_image
                                            )
                                          }
                                        />
                                      </Col>
                                      <Col>
                                        <span
                                          style={{
                                            fontWeight: "600",
                                            fontSize: "14px",
                                            color: "#525252",
                                          }}
                                        >
                                          {item.title}
                                        </span>
                                      </Col>
                                    </Row>
                                  );
                                })}
                              </Col>
                            );
                          })}
                      <Col
                        span={16}
                        style={{
                          margin: "5px 0 0 0",
                        }}
                      >
                        <ImageComponent
                          ImageMimeType={xrayMimeType}
                          ImageUrl={xrayImageUrl}
                        />
                      </Col>
                    </Row>
                    <Row
                      style={{
                        margin: "18px 0 0 0",
                        height: "258px",
                      }}
                    ></Row>
                    <Row
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "85px",
                      }}
                    >
                      <Button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontWeight: "600",
                          fontSize: "16px",
                          color: "#D35850",
                          border: "1px solid #D35850",
                          borderRadius: "16px",
                        }}
                        onClick={() => setIsOpenFullXrayModal(false)}
                      >
                        Close
                      </Button>
                    </Row>
                  </div>
                </Modal>
              </>
            );
          })}
        <span
          style={{
            margin: "0 0 0 10px",
            color: "#2CA3FA",
            fontWeight: "400",
            fontSize: "14px",
          }}
        >
          <u>{"(" + xayandreport.xray_reports.length + ")"}</u>
        </span>
      </Col>
      <Col
        md={4}
        lg={3}
        // xs={7}
        sm={6}
        style={{ display: "flex", alignItems: "center" }}
      >
        <div style={{ cursor: "pointer" }}>
          <img
            src={docdownloadicon}
            alt=""
            style={{
              width: "14px",
            }}
          />
          &nbsp;
          {xayandreport.other_reports &&
            xayandreport.other_reports.slice(0, 1).map((reportImages) => {
              return (
                <>
                  <span
                    onClick={() =>
                      openReportModalAndSendingImageUrl(
                        reportImages.title,
                        setReporArraytId(ReportArrayId)
                      )
                    }
                  >
                    <u style={{ color: "#2CA3FA" }}>
                      Attachments {"(" + xayandreport.other_reports.length + ")"}
                    </u>
                  </span>
                  <Modal
                    width={"466px"}
                    open={downloadDocModal}
                    centered
                    footer={false}
                    closable={false}
                    mask={false}
                  >
                    <div
                      className="download-docs-modal d-flex flex-col ai-center"
                      style={{
                        background: "#FFF",
                        height: "305px",
                      }}
                    >
                      <Row className="d-flex ai-center jc-between w-100">
                        <span
                          style={{
                            fontWeight: 700,
                            fontSize: 22,
                            color: "#525252",
                          }}
                        >
                          Dental Report Title
                        </span>
                        <CloseOutlined
                          style={{ color: "red", fontSize: "19px" }}
                          onClick={() => setDownloadDocModal(false)}
                        />
                      </Row>
                      <div
                        style={{
                          height: "170px",
                          margin: "18px 0 0 0",
                          width: "100%",
                        }}
                      >
                        {xayandreport &&
                          xayandreport.other_reports.map((item) => {
                            return (
                              <Row
                                style={{
                                  height: "39px",
                                  margin: "4px 0 0 0",
                                  background: "#F9F9F9",
                                }}
                              >
                                <Col
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                  span={4}
                                >
                                  <Radio.Group>
                                    <Radio></Radio>
                                  </Radio.Group>
                                </Col>
                                <Col
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontWeight: "400",
                                      fontSize: "16px",
                                      color: "#7D7D7D",
                                    }}
                                  >
                                    {item.title}
                                  </span>
                                </Col>
                              </Row>
                            );
                          })}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          height: "70px",
                        }}
                      >
                        <Button
                          style={{
                            fontWeight: "600",
                            fontSize: "14px",
                            color: "#2CA3FA",
                          }}
                        >
                          Download
                        </Button>
                      </div>
                    </div>
                  </Modal>
                </>
              );
            })}
        </div>
      </Col>
      <Col
        md={1}
        lg={1}
        // xs={1}
        sm={1}
        style={{ display: "flex", alignItems: "center" }}
      >
        <Dropdown
          overlay={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "35px",
                width: "140px",
                background: "#FFFFFF",
                boxShadow: "0px 4px 4px rgba(0,0, 0, 0.25)",
                border: "1px solid #D1DCD4",
                borderRadius: "4px",
              }}
            >
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
                onClick={() => deleteUploadedXrayImg(xrayArrayId)}
              >
                Delete
              </span>
            </div>
          }
          placement="bottomRight"
        >
          <EllipsisOutlined
            rotate={90}
            style={{
              fontSize: "22px",
              display: window.innerWidth < 576 && "none",
            }}
          />
        </Dropdown>
      </Col>
    </Row>
  );
};

export default XrayAndReportDetails;
