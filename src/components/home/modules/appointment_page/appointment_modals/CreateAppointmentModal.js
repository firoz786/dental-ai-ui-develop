import React, { useEffect } from "react";
import {
  Button,
  Calendar,
  Col,
  Form,
  Modal,
  Row,
  Select,
  TimePicker,
  Tooltip,
} from "antd";
import { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import CalendarIcon from "../../../../../assets/calendar-icon.png";
import moment from "moment";
import {
  _scheduled_by_patient,
  _status_scheduled,
} from "../../../../../utils/appointment_constants/AppointmentConstants";
import axios from "axios";

const CreateAppointmentModal = (props) => {
  const patientid = localStorage.getItem("PatientID");
  const Token = localStorage.getItem("Token");
  const [form] = Form.useForm();
  const {
    setOpenCreateAppointmentModal,
    openCreateAppointmentModal,
    handleGetAllAppointments,
    treatmentTypes,
  } = props;
  const defaultValue = moment();
  const [appointmentDate, setAppointmentDate] = useState(
    defaultValue.format("ddd, YYYY-MM-DD")
  );
  const [appointmentTime, setAppointmentTime] = useState("");
  const [sendAppointmentTime, setSendAppointmentTime] = useState("");
  const [clinicName, setClinicName] = useState("");
  const closeCreateAppointmentModal = () => {
    setOpenCreateAppointmentModal(false);
    form.resetFields();
    setAppointmentDate("");
    setAppointmentTime("");
    setClinicName("");
  };

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

  const onDateChange = (value) => {
    setAppointmentDate(value.format("ddd, YYYY-MM-DD"));
  };

  const handleTimeRangeChange = (time, value) => {
    setAppointmentTime(moment(time).format("hh:mm a"));
    setSendAppointmentTime(moment(time).format("THH:mm:ss.SSS[Z]"));
  };

  const handleCreateAppoinment = (value) => {
    const payload = {
      patient_id: patientid,
      clinic_id: value.clinicId,
      treatment_type_id: value.treatmentTypeId,
      from_date: value.date.format("YYYY-MM-DD") + sendAppointmentTime,
      scheduled_by: _scheduled_by_patient,
      status: _status_scheduled,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };
    axios
      .post(
        "http://ec2-3-6-218-218.ap-south-1.compute.amazonaws.com:8080/api/v1/appointment",
        payload,
        config
      )
      .then((res) => {
        form.resetFields();
        setTimeout(() => {
          handleGetAllAppointments();
          setAppointmentDate("");
          setAppointmentTime("");
          setClinicName("");
        }, 300);
      });
    setOpenCreateAppointmentModal(false);
  };
  useEffect(() => {
    handleGetAllClinicDetails();
  }, []);

  const disabledDate = (current) => {
    return current && current < moment().startOf("day");
  };

  return (
    <Modal
      width={"647px"}
      open={openCreateAppointmentModal}
      closable={false}
      footer={false}
      centered
      className="appointment-scheduler-modal"
      destroyOnClose={true}
    >
      <div style={{ height: "596px", overflowY: "auto", overflowX: "hidden" }}>
        <Row
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontWeight: "700",
              fontSize: "22px",
              color: "#525252",
            }}
          >
            Appointment Scheduler
          </span>
          <CloseOutlined
            style={{ color: "#FF0000", fontSize: 20 }}
            onClick={closeCreateAppointmentModal}
          />
        </Row>
        <Form
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          name="calendarform"
          form={form}
          onFinish={handleCreateAppoinment}
        >
          <Row style={{ gap: "", margin: "20px 0 0 0" }}>
            <Col xs={24} sm={24} md={12}>
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "12px",
                  color: "#525252",
                }}
              >
                Select Day
              </span>
              <Form.Item
                name="date"
                rules={[{ required: true, message: "Select Date" }]}
              >
                <Calendar
                  defaultValue={defaultValue}
                  disabledDate={disabledDate}
                  className="datepicker"
                  fullscreen={false}
                  onChange={onDateChange}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "12px",
                  color: "#525252",
                }}
              >
                Time
              </span>

              <Row className="create-appointment-details">
                {/* Time picker */}
                <Row
                  className="d-flex jc-center w-100"
                  style={{ padding: "24px 21px 0 21px" }}
                >
                  <div className="w-100">
                    <span
                      style={{
                        fontWeight: "400",
                        fontSize: "12px",
                        color: "#A5A4A4",
                      }}
                    >
                      From
                    </span>
                    <Form.Item
                      name="appoitmentTime"
                      className="w-100"
                      rules={[{ required: true, message: "Select Time" }]}
                    >
                      <TimePicker
                        bordered={false}
                        onChange={handleTimeRangeChange}
                        format="HH:mm"
                      />
                    </Form.Item>
                  </div>
                </Row>
                {/* treatement types */}
                <Row
                  className="d-flex jc-center w-100"
                  style={{ padding: "0 21px" }}
                >
                  <div className="w-100">
                    <span
                      style={{
                        fontWeight: "400",
                        fontSize: "12px",
                        color: "#A5A4A4",
                      }}
                    >
                      Treatment Type
                    </span>
                    <Form.Item
                      name="treatmentTypeId"
                      className="w-100"
                      rules={[{ required: true, message: "Select Treatment" }]}
                    >
                      <Select
                        placeholder="Select Treatment"
                        bordered={false}
                        style={{
                          width: "100%",
                          background: "#FFFFFF",
                          border: "1px solid #E3E3E3",
                          borderRadius: 3,
                          color: "#7D7D7D",
                        }}
                      >
                        {treatmentTypes &&
                          treatmentTypes.map((item) => {
                            return (
                              <Select.Option value={item.id}>
                                <Tooltip
                                  title={item.description}
                                  placement="right"
                                >
                                  <span
                                    style={{
                                      fontWeight: 400,
                                      fontSize: "14px",
                                      color: "#7D7D7D",
                                    }}
                                  >
                                    {item.name}
                                  </span>
                                </Tooltip>
                              </Select.Option>
                            );
                          })}
                      </Select>
                    </Form.Item>
                  </div>
                </Row>
                {/* clinic names dropdown */}
                <Row
                  className="d-flex jc-center w-100"
                  style={{ padding: "0 21px" }}
                >
                  <div className="w-100">
                    <span
                      style={{
                        fontWeight: "400",
                        fontSize: "12px",
                        color: "#A5A4A4",
                      }}
                    >
                      Clinic Name
                    </span>
                    <Form.Item
                      name="clinicId"
                      rules={[{ required: true, message: "Select Clinic" }]}
                    >
                      <Select
                        bordered={false}
                        name="clinicId"
                        style={{
                          width: "100%",
                          background: "#FFFFFF",
                          border: "1px solid #E3E3E3",
                          borderRadius: 3,
                          color: "#7D7D7D",
                        }}
                        placeholder="Select Clinic"
                        value={clinicName}
                        onChange={(value) => setClinicName(value)}
                      >
                        {clinicDetails &&
                          clinicDetails.map((item) => {
                            return (
                              <Select.Option value={item.user_id}>
                                {item.name}
                              </Select.Option>
                            );
                          })}
                      </Select>
                    </Form.Item>
                  </div>
                </Row>
              </Row>
            </Col>
          </Row>

          {/* values printing row */}
          <Row className="d-flex jc-center ai-center values-priting-outer-row">
            <Row className="values-priting-inner-row">
              <Col xs={24} sm={12} md={11}>
                {clinicName ? (
                  <span
                    style={{
                      fontWeight: "400",
                      fontSize: "14px",
                      color: "#7D7D7D",
                    }}
                  >
                    {clinicDetails &&
                      clinicDetails
                        .filter((item) => item.user_id === clinicName)
                        .map((item) => {
                          return <>{item.name}</>;
                        })}
                  </span>
                ) : (
                  <span
                    style={{
                      fontWeight: "400",
                      fontSize: "14px",
                      color: "#7D7D7D",
                    }}
                  >
                    Clinic Name
                  </span>
                )}
              </Col>
              <Col
                xs={2}
                sm={1}
                md={1}
                style={{ display: "flex", alignItems: "center" }}
              >
                <img style={{ height: "15px" }} src={CalendarIcon} alt="" />
              </Col>
              <Col xs={22} sm={11} md={7}>
                {appointmentDate ? (
                  <span
                    style={{
                      fontWeight: "400",
                      fontSize: "14px",
                      color: "#858585",
                    }}
                  >
                    {appointmentDate}
                  </span>
                ) : (
                  <span
                    style={{
                      fontWeight: "400",
                      fontSize: "14px",
                      color: "#858585",
                    }}
                  >
                    Date DD/MM/YYYY
                  </span>
                )}
              </Col>
              <Col>
                {appointmentTime ? (
                  <span
                    style={{
                      fontWeight: "400",
                      fontSize: "14px",
                      color: "#858585",
                    }}
                  >
                    {appointmentTime}
                  </span>
                ) : (
                  <span
                    style={{
                      fontWeight: "400",
                      fontSize: "14px",
                      color: "#858585",
                    }}
                  >
                    Time 00:00
                  </span>
                )}
              </Col>
            </Row>
          </Row>

          {/* create button row */}
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "15px 0 0 0",
            }}
          >
            <Form.Item>
              <Button
                style={{
                  width: "203px",
                  height: "30px",
                  borderRadius: "30px",
                  border: "1px solid #009DF7",
                  color: "#2CA3FA",
                }}
                htmlType="submit"
              >
                Send Schedule Request
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateAppointmentModal;
