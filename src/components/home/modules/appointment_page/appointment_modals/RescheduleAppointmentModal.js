import React, { useEffect, useState } from "react";
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
import { CloseOutlined } from "@ant-design/icons";
import calendar_icon from "../../../../../assets/calendar-icon.png";
import axios from "axios";
import moment from "moment";
import {
  DATETIME_FORMAT_AMPM,
  DATETIME_FORMAT_FULLDATE,
  DATETIME_FORMAT_FULLDATE_WITHDAY,
  DATETIME_FORMAT_WITHZONE,
  _scheduled_by_patient,
  _status_scheduled,
} from "../../../../../utils/appointment_constants/AppointmentConstants";

const RescheduleAppointmentModal = (props) => {
  const {
    treatmentTypes,
    openRescheduleAppointmentModal,
    setOpenRescheduleAppointmentModal,
    defaultDate,
    treatmentTypeId,
    handleGetAllAppointments,
    appointment_id,
    clinic_name,
  } = props;

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

  // const time = moment(from_date).format("")
  const patientId = localStorage.getItem("PatientID");
  const Token = localStorage.getItem("Token");
  const [form] = Form.useForm();

  // for displaying in the modal
  const [appointmentTime, setAppointmentTime] = useState(
    defaultDate && defaultDate.format(DATETIME_FORMAT_AMPM)
  );
  const [appointmentDate, setAppointmentDate] = useState(
    defaultDate && defaultDate.format(DATETIME_FORMAT_FULLDATE_WITHDAY)
  );

  // for sending to payload to update
  const [editAppointmentTime, setEditAppointmentTime] = useState(
    defaultDate && defaultDate.format(DATETIME_FORMAT_WITHZONE)
  );
  const [editAppointmentDate, setEditAppointmentDate] = useState(
    defaultDate && defaultDate.format(DATETIME_FORMAT_FULLDATE)
  );
  const [clinicName, setClinicName] = useState();

  const defaultTreatment =
    treatmentTypes &&
    treatmentTypes
      .filter((item) => treatmentTypeId === item.id)
      .map((item) => item.name);

  const handleTimeRangeChange = (time, value) => {
    setAppointmentTime(moment(time).format(DATETIME_FORMAT_AMPM));
    setEditAppointmentTime(moment(time).format(DATETIME_FORMAT_WITHZONE));
  };
  const onDateChange = (value) => {
    setAppointmentDate(value.format(DATETIME_FORMAT_FULLDATE_WITHDAY));
    setEditAppointmentDate(value.format(DATETIME_FORMAT_FULLDATE));
  };

  const handleRescheduleClinicAppointment = (values) => {
    const payload = {
      patient_id: patientId,
      clinic_id: values.clinicName,
      treatment_type_id:
        values.treatmentTypeId === undefined
          ? treatmentTypeId
          : values.treatmentTypeId,
      from_date: editAppointmentDate + editAppointmentTime,
      scheduled_by: _scheduled_by_patient,
      status: _status_scheduled,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };
    axios
      .put(
        `http://ec2-3-6-218-218.ap-south-1.compute.amazonaws.com:8080/api/v1/appointment/${appointment_id}`,
        payload,
        config
      )
      .then((res) => {
        setTimeout(() => {
          handleGetAllAppointments();
        }, 300);
      });
    setOpenRescheduleAppointmentModal(false);
  };

  const disabledDate = (current) => {
    return current && current < moment().startOf("day");
  };

  useEffect(() => {
    handleGetAllClinicDetails();
  }, []);

  return (
    <Modal
      width={"647px"}
      open={openRescheduleAppointmentModal}
      closable={false}
      destroyOnClose={true}
      footer={false}
      centered
      className="appointment-scheduler-modal"
    >
      <div style={{ height: "596px", overflowY: "auto", overflowX: "hidden" }}>
        <Form
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          name="calendarform"
          form={form}
          onFinish={handleRescheduleClinicAppointment}
        >
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
              onClick={() => setOpenRescheduleAppointmentModal(false)}
            />
          </Row>
          <Row style={{ margin: "20px 0 0 0" }}>
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
              <Form.Item name="date">
                <Calendar
                  disabledDate={disabledDate}
                  className="datepicker"
                  fullscreen={false}
                  defaultValue={defaultDate}
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

              <Row className="reschedule-appointment-details">
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
                    <Form.Item name="appoitmentTime" className="w-100">
                      <TimePicker
                        bordered={false}
                        onChange={handleTimeRangeChange}
                        format="HH:mm"
                        defaultValue={defaultDate}
                        clearIcon={false}
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
                    <Form.Item name="treatmentTypeId" className="w-100">
                      <Select
                        bordered={false}
                        style={{
                          width: "100%",
                          background: "#FFFFFF",
                          border: "1px solid #E3E3E3",
                          borderRadius: 3,
                          color: "#7D7D7D",
                        }}
                        placeholder="Select Treatment"
                        defaultValue={defaultTreatment}
                      >
                        {treatmentTypes &&
                          treatmentTypes.map((item) => {
                            return (
                              <Select.Option value={item.id} key={item.id}>
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
                    <Form.Item name="clinicName">
                      <Select
                        bordered={false}
                        name="clinicName"
                        style={{
                          width: "100%",
                          background: "#FFFFFF",
                          border: "1px solid #E3E3E3",
                          borderRadius: 3,
                          color: "#7D7D7D",
                        }}
                        defaultValue={clinic_name}
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
                {clinic_name ? (
                  <span
                    style={{
                      fontWeight: "400",
                      fontSize: "14px",
                      color: "#7D7D7D",
                    }}
                  >
                    {clinic_name}
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
                <img style={{ height: "15px" }} src={calendar_icon} alt="" />
              </Col>
              <Col xs={22} sm={11} md={7}>
                {appointmentDate && appointmentDate ? (
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
                {appointmentTime && appointmentTime ? (
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

export default RescheduleAppointmentModal;
