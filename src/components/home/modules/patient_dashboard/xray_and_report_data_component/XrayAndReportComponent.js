import { Button, Col, Modal, Row } from "antd";
import React, { useState } from "react";
import moment from "moment";
import { CloseOutlined } from "@ant-design/icons";
import ImageComponent from "../xray_image_component/XrayImageComponent";
import ReportImageComponent from "../report_image_component/ReportImageComponent";

export const XrayAndReportComponent = (props) => {
  const {
    patientDashboardReportsDetails,
    xrayAndReportData,
    xrayAndReportId,
    xrayArrayId,
    setXrayArrayId,
    setReporArraytId,
    ReportArrayId,
  } = props;

  const [IsOpenFullXrayModal, setIsOpenFullXrayModal] = useState(false);
  const [downloadDocModal, setDownloadDocModal] = useState(false);

  const [xrayMimeType, setxrayMimeType] = useState("");
  const [xrayImageUrl, setXrayImageUrl] = useState("");

  const imageJPEG = "image/jpeg";
  const imagePNG = "image/png";
  const jpegimagedatabaseurl = "data:image/jpeg;base64,/9j/";
  const pngimagedatabaseurl = "data:image/png;base64,";

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

  return (
    <>
      <Row
        style={{
          width: "100%",
          background: "#FBFBFB",
          borderRadius: 5,
          height: "10vh",
          padding: "0 13px",
          margin: "0 0 5px 0",
        }}
      >
        <Col
          span={4}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <span className="xray-timestamp">
            {xrayAndReportData.uploaded_at &&
              moment(xrayAndReportData.uploaded_at).format(
                "ddd, DD/MM/YYYY HH:mm A"
              )}
          </span>
        </Col>
        <Col
          span={11}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {xrayAndReportData.uploaded_by === "Self" ? (
            <span className="self-clinic">{xrayAndReportData.uploaded_by}</span>
          ) : (
            <span className="dashboard-clinic-name">
              {xrayAndReportData.uploaded_by}
            </span>
          )}
          {xrayAndReportData.uploaded_by === "Self" ? (
            <span
              style={{
                fontWeight: "600",
                fontSize: "14px",
                color: "#7D7D7D",
              }}
            >
              Clid {xrayAndReportData.uploader_id}
            </span>
          ) : (
            <span className="dashboard-clinic-name">
              id{xrayAndReportData.uploader_id}
            </span>
          )}
        </Col>
        <Col
          span={5}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {xrayAndReportData.xray_reports &&
            xrayAndReportData.xray_reports.slice(0, 1).map((xrayimages) => {
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
                      width: "4.21875vw",
                      height: " 5.743589743589744vh",
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
                        {patientDashboardReportsDetails &&
                          patientDashboardReportsDetails
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
            <u>{"(" + xrayAndReportData.xray_reports.length + ")"}</u>
          </span>
        </Col>
        <Col
          span={4}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ cursor: "pointer" }}>
            <img
              alt=""
              style={{
                width: "14px",
              }}
            />
            &nbsp;
            {xrayAndReportData.other_reports &&
              xrayAndReportData.other_reports
                .slice(0, 1)
                .map((reportImages) => {
                  return (
                    <span>
                      <img
                        src={
                          reportImages.file_mime_type === imageJPEG
                            ? jpegimagedatabaseurl + reportImages.report_image
                            : pngimagedatabaseurl + reportImages.report_image
                        }
                        alt=""
                        onClick={() =>
                          openReportModalAndSendingImageUrl(
                            reportImages.file_mime_type,
                            reportImages.report_image,
                            setReporArraytId(xrayAndReportId)
                          )
                        }
                        style={{ display: "none" }}
                      />
                      <span
                        onClick={() =>
                          openReportModalAndSendingImageUrl(
                            reportImages.file_mime_type,
                            reportImages.report_image,
                            setReporArraytId(xrayAndReportId)
                          )
                        }
                      >
                        <u style={{ color: "#2CA3FA" }}>Attachments</u>
                      </span>
                      <Modal
                        width={"753px"}
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
                            height: "747px",
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
                          <Row
                            style={{
                              width: "100%",
                              height: "600px",
                              margin: "25px 0 0 0",
                              gap: "18px",
                            }}
                          >
                            {patientDashboardReportsDetails &&
                              patientDashboardReportsDetails
                                .filter((item, id) => id === ReportArrayId)
                                .map((item, id) => {
                                  return (
                                    <Col span={7}>
                                      {item.other_reports.map((item) => {
                                        return (
                                          <Row
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                              background: "#F1FBFF",
                                              height: "72px",
                                              margin: "5px 0 0 0",
                                            }}
                                          >
                                            <span
                                              style={{
                                                fontWeight: "600",
                                                fontSize: "14px",
                                                cursor: "pointer",
                                              }}
                                              onClick={() =>
                                                handleSendingReportImageUrl(
                                                  item.file_mime_type,
                                                  item.report_image
                                                )
                                              }
                                            >
                                              {item.title}
                                            </span>
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
                              <ReportImageComponent
                                ImageMimeType={xrayMimeType}
                                ImageUrl={xrayImageUrl}
                              />
                            </Col>
                          </Row>
                          <Row
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "107px",
                            }}
                          >
                            <Button
                              style={{
                                fontWeight: "600",
                                fontSize: "14px",
                                color: "#D35850",
                                border: "1px solid #D35850",
                                borderRadius: "16px",
                              }}
                              onClick={() => setDownloadDocModal(false)}
                            >
                              Close
                            </Button>
                          </Row>
                        </div>
                      </Modal>
                    </span>
                  );
                })}
            <span>
              <u style={{ color: "#2CA3FA" }}>
                {"(" + xrayAndReportData.other_reports.length + ")"}
              </u>
            </span>
          </div>
        </Col>
      </Row>
    </>
  );
};
