import { CloseOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row } from "antd";
import React from "react";
import ImageComponent from "../xray_image_component/XrayImageComponent";

const XrayAnalysisModal = (props) => {
  const { IsOpenFullXrayModal, setIsOpenFullXrayModal, xrayAndReportData } =
    props;

  const imageJPEG = "image/jpeg";
  const imagePNG = "image/png";
  const jpegimagedatabaseurl = "data:image/jpeg;base64,/9j/";
  const pngimagedatabaseurl = "data:image/png;base64,";
  return (
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
        {xrayAndReportData &&
          xrayAndReportData.xray_reports.map((xrayImagesdata) => {
            return (
              <Row
                style={{
                  width: "100%",
                  margin: "25px 0 0 0",
                  gap: "10px",
                }}
              >
                <Col span={7}>
                  {xrayAndReportData.xray_reports &&
                    xrayAndReportData.xray_reports
                      .map((xrayimages) => {
                        return (
                          <>
                            <img
                              src={
                                xrayimages.file_mime_type === imageJPEG
                                  ? jpegimagedatabaseurl +
                                    xrayimages.report_image
                                  : pngimagedatabaseurl +
                                    xrayimages.report_image
                              }
                              alt=""
                              style={{
                                width: "4.21875vw",
                                height: " 5.743589743589744vh",
                                cursor: "pointer",
                              }}
                            />
                          </>
                        );
                      })}

                  {xrayAndReportData &&
                    xrayAndReportData.xray_reports.map((xrayImagesdata) => {
                      return (
                        <Col
                          span={24}
                          style={{
                            margin: "5px 0 0 0",
                          }}
                        >
                          <Row
                            style={{
                              display: "flex",
                              alignItems: "center",
                              background: "#F1FBFF",
                              height: "72px",
                            }}
                          >
                            <Col
                              span={9}
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <img
                                style={{
                                  height: "41px",
                                  width: "59px",
                                }}
                                src={
                                  xrayImagesdata.file_mime_type === imageJPEG
                                    ? jpegimagedatabaseurl +
                                      xrayImagesdata.report_image
                                    : pngimagedatabaseurl +
                                      xrayImagesdata.report_image
                                }
                                alt=""
                                // onClick={() =>
                                //   handleSendingImageUrl(
                                //     xrayImagesdata.file_mime_type,
                                //     xrayImagesdata.report_image
                                //   )
                                // }
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
                                {/* {xrayImagesdata.title} */}
                              </span>
                            </Col>
                          </Row>
                        </Col>
                      );
                    })}
                </Col>
                <Col
                  span={16}
                  style={{
                    margin: "5px 0 0 0",
                  }}
                >
                  <ImageComponent
                  // ImageMimeType={xrayMimeType}
                  // ImageUrl={xrayImageUrl}
                  />
                </Col>
              </Row>
            );
          })}
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
  );
};

export default XrayAnalysisModal;

