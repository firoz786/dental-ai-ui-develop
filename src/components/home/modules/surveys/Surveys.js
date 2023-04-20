import { CloseOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Row,
  Spin,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "./Surveys.css";

const Surveys = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const patientid = localStorage.getItem("PatientID");
  const Token = localStorage.getItem("Token");
  const [surveyTopicId, setSurveyTopicId] = useState(1);
  const [patientSurveyDataMap, setPatientSurveyDataMap] = useState([]);
  const [defaultSurveyData, setDefaultSurveyData] = useState();
  const [allSurveyDataMap, setAllSurveyDataMap] = useState([]);
  const [isOpenSurveySuccessModal, setIsOpenSurveySuccessModal] =
    useState(false);
  const [searchInput, setSearchInput] = useState("");
  let SurveyDefaultData;
  const SurveyTopicIdMap = allSurveyDataMap.map((item) => item.id);
  const SurveyTopicTitleMap = allSurveyDataMap.map((item) => item.text);
  const SurveyQuestionIdMap = patientSurveyDataMap.map((item) => item.id);
  const SurveyQuestionMap = patientSurveyDataMap.map((item) => item.text);
  const SurveyQuestionOrderMap = patientSurveyDataMap.map(
    (item) => item.question_order
  );
  const SurveyQuestionTypeMap = patientSurveyDataMap.map(
    (item) => item.survey_question_type
  );
  const SurveyAnswersIdMap = patientSurveyDataMap.map((item) =>
    item.survey_answers.map((item) => item.id)
  );
  const SurveyAnswersMap = patientSurveyDataMap.map((item) =>
    item.survey_answers.map((item) => item.text)
  );
  const SurveyAnswersOrderMap = patientSurveyDataMap.map((item) =>
    item.survey_answers.map((item) => item.answer_order)
  );

  // submits the patients survey
  const handleSubmitPatientSurveyDetails = (values) => {
    let payload;
    // first topic
    if (surveyTopicId === SurveyTopicIdMap[0]) {
      payload = {
        user_id: patientid,
        survey_details: [
          {
            id: SurveyTopicIdMap[0],
            text: SurveyTopicTitleMap[0],
            survey_questions: [
              {
                id: SurveyQuestionIdMap[0],
                text: SurveyQuestionMap[0],
                survey_question_type: SurveyQuestionTypeMap[0],
                mandatory: true,
                randomize_options: false,
                survey_answers: [
                  {
                    id: SurveyAnswersIdMap[0][0],
                    text: SurveyAnswersMap[0][0],
                    answer_order: SurveyAnswersOrderMap[0][0],
                    answered:
                      values[1] === undefined
                        ? defaultSurveyData[0] === SurveyAnswersMap[0][0]
                          ? true
                          : false
                        : values[1] === SurveyAnswersMap[0][0]
                        ? true
                        : false,
                  },
                  {
                    id: SurveyAnswersIdMap[0][1],
                    text: SurveyAnswersMap[0][1],
                    answer_order: SurveyAnswersOrderMap[0][1],
                    answered:
                      values[1] === undefined
                        ? defaultSurveyData[0] === SurveyAnswersMap[0][1]
                          ? true
                          : false
                        : values[1] === SurveyAnswersMap[0][1]
                        ? true
                        : false,
                  },
                  {
                    id: SurveyAnswersIdMap[0][2],
                    text: SurveyAnswersMap[0][2],
                    answer_order: SurveyAnswersOrderMap[0][2],
                    answered:
                      values[1] === undefined
                        ? defaultSurveyData[0] === SurveyAnswersMap[0][2]
                          ? true
                          : false
                        : values[1] === SurveyAnswersMap[0][2]
                        ? true
                        : false,
                  },
                  {
                    id: SurveyAnswersIdMap[0][3],
                    text: SurveyAnswersMap[0][3],
                    answer_order: SurveyAnswersOrderMap[0][3],
                    answered:
                      values[1] === undefined
                        ? defaultSurveyData[0] === SurveyAnswersMap[0][3]
                          ? true
                          : false
                        : values[1] === SurveyAnswersMap[0][3]
                        ? true
                        : false,
                  },
                  {
                    id: SurveyAnswersIdMap[0][4],
                    text: SurveyAnswersMap[0][5],
                    answer_order: SurveyAnswersOrderMap[0][4],
                    answered:
                      values[1] === undefined
                        ? defaultSurveyData[0] === SurveyAnswersMap[0][5]
                          ? true
                          : false
                        : values[1] === SurveyAnswersMap[0][5]
                        ? true
                        : false,
                  },
                  {
                    id: SurveyAnswersIdMap[0][5],
                    text: SurveyAnswersMap[0][5],
                    answer_order: SurveyAnswersOrderMap[0][5],
                    answered:
                      values[1] === undefined
                        ? defaultSurveyData[0] === SurveyAnswersMap[0][5]
                          ? true
                          : false
                        : values[1] === SurveyAnswersMap[0][5]
                        ? true
                        : false,
                  },
                ],
                question_order: SurveyQuestionOrderMap[0],
              },
              {
                id: SurveyQuestionIdMap[1],
                text: SurveyQuestionMap[1],
                survey_question_type: SurveyQuestionTypeMap[1],
                mandatory: true,
                randomize_options: false,
                survey_answers: [
                  {
                    id: SurveyAnswersIdMap[1][0],
                    text: SurveyAnswersMap[1][0],
                    answer_order: SurveyAnswersOrderMap[1][0],
                    answered:
                      values[2] === undefined
                        ? defaultSurveyData[1] === SurveyAnswersMap[1][0]
                          ? true
                          : false
                        : values[2] === SurveyAnswersMap[1][0]
                        ? true
                        : false,
                  },
                  {
                    id: SurveyAnswersIdMap[1][1],
                    text: SurveyAnswersMap[1][1],
                    answer_order: SurveyAnswersOrderMap[1][1],
                    answered:
                      values[2] === undefined
                        ? defaultSurveyData[1] === SurveyAnswersMap[1][1]
                          ? true
                          : false
                        : values[2] === SurveyAnswersMap[1][1]
                        ? true
                        : false,
                  },
                  {
                    id: SurveyAnswersIdMap[1][2],
                    text: SurveyAnswersMap[1][2],
                    answer_order: SurveyAnswersOrderMap[1][2],
                    answered:
                      values[2] === undefined
                        ? defaultSurveyData[1] === SurveyAnswersMap[1][2]
                          ? true
                          : false
                        : values[2] === SurveyAnswersMap[1][2]
                        ? true
                        : false,
                  },
                  {
                    id: SurveyAnswersIdMap[1][3],
                    text: SurveyAnswersMap[1][3],
                    answer_order: SurveyAnswersOrderMap[1][3],
                    answered:
                      values[2] === undefined
                        ? defaultSurveyData[1] === SurveyAnswersMap[1][3]
                          ? true
                          : false
                        : values[2] === SurveyAnswersMap[1][3]
                        ? true
                        : false,
                  },
                  {
                    id: SurveyAnswersIdMap[1][4],
                    text: SurveyAnswersMap[1][4],
                    answer_order: SurveyAnswersOrderMap[1][4],
                    answered:
                      values[2] === undefined
                        ? defaultSurveyData[1] === SurveyAnswersMap[1][4]
                          ? true
                          : false
                        : values[2] === SurveyAnswersMap[1][4]
                        ? true
                        : false,
                  },
                ],
                question_order: SurveyQuestionOrderMap[1],
              },
              {
                id: SurveyQuestionIdMap[2],
                text: SurveyQuestionMap[2],
                survey_question_type: SurveyQuestionTypeMap[2],
                mandatory: true,
                randomize_options: false,
                survey_answers: [
                  {
                    id: SurveyAnswersIdMap[2][0],
                    text: SurveyAnswersMap[2][0],
                    answer_order: SurveyAnswersOrderMap[2][0],
                    answered:
                      values[3] === undefined
                        ? defaultSurveyData[2] === SurveyAnswersMap[2][0]
                          ? true
                          : false
                        : values[3] === SurveyAnswersMap[2][0]
                        ? true
                        : false,
                  },
                  {
                    id: SurveyAnswersIdMap[2][1],
                    text: SurveyAnswersMap[2][1],
                    answer_order: SurveyAnswersOrderMap[2][1],
                    answered:
                      values[3] === undefined
                        ? defaultSurveyData[2] === SurveyAnswersMap[2][1]
                          ? true
                          : false
                        : values[3] === SurveyAnswersMap[2][1]
                        ? true
                        : false,
                  },
                  {
                    id: SurveyAnswersIdMap[2][2],
                    text: SurveyAnswersMap[2][2],
                    answer_order: SurveyAnswersOrderMap[2][2],
                    answered:
                      values[3] === undefined
                        ? defaultSurveyData[2] === SurveyAnswersMap[2][2]
                          ? true
                          : false
                        : values[3] === SurveyAnswersMap[2][2]
                        ? true
                        : false,
                  },
                  {
                    id: SurveyAnswersIdMap[2][3],
                    text: SurveyAnswersMap[2][3],
                    answer_order: SurveyAnswersOrderMap[2][3],
                    answered:
                      values[3] === undefined
                        ? defaultSurveyData[2] === SurveyAnswersMap[2][3]
                          ? true
                          : false
                        : values[3] === SurveyAnswersMap[2][3]
                        ? true
                        : false,
                  },
                  {
                    id: SurveyAnswersIdMap[2][4],
                    text: SurveyAnswersMap[2][4],
                    answer_order: SurveyAnswersOrderMap[2][4],
                    answered:
                      values[3] === undefined
                        ? defaultSurveyData[2] === SurveyAnswersMap[2][4]
                          ? true
                          : false
                        : values[3] === SurveyAnswersMap[2][4]
                        ? true
                        : false,
                  },
                  {
                    id: SurveyAnswersIdMap[2][5],
                    text: SurveyAnswersMap[2][5],
                    answer_order: SurveyAnswersOrderMap[2][5],
                    answered:
                      values[3] === undefined
                        ? defaultSurveyData[2] === SurveyAnswersMap[2][5]
                          ? true
                          : false
                        : values[3] === SurveyAnswersMap[2][5]
                        ? true
                        : false,
                  },
                ],
                question_order: SurveyQuestionOrderMap[2],
              },
              {
                id: SurveyQuestionIdMap[3],
                text: SurveyQuestionMap[3],
                survey_question_type: SurveyQuestionTypeMap[3],
                mandatory: true,
                randomize_options: false,
                survey_answers: [
                  {
                    id: SurveyAnswersIdMap[3][0],
                    text: SurveyAnswersMap[3][0],
                    answer_order: SurveyAnswersOrderMap[3][0],
                    answered:
                      values[4] === undefined
                        ? defaultSurveyData[3] === SurveyAnswersMap[3][0]
                          ? true
                          : false
                        : values[4] === SurveyAnswersMap[3][0]
                        ? true
                        : false,
                  },
                  {
                    id: SurveyAnswersIdMap[3][1],
                    text: SurveyAnswersMap[3][1],
                    answer_order: SurveyAnswersOrderMap[3][1],
                    answered:
                      values[4] === undefined
                        ? defaultSurveyData[3] === SurveyAnswersMap[3][1]
                          ? true
                          : false
                        : values[4] === SurveyAnswersMap[3][1]
                        ? true
                        : false,
                  },
                  {
                    id: SurveyAnswersIdMap[3][2],
                    text: SurveyAnswersMap[3][2],
                    answer_order: SurveyAnswersOrderMap[3][2],
                    answered:
                      values[4] === undefined
                        ? defaultSurveyData[3] === SurveyAnswersMap[3][2]
                          ? true
                          : false
                        : values[4] === SurveyAnswersMap[3][2]
                        ? true
                        : false,
                  },
                  {
                    id: SurveyAnswersIdMap[3][3],
                    text: SurveyAnswersMap[3][3],
                    answer_order: SurveyAnswersOrderMap[3][3],
                    answered:
                      values[4] === undefined
                        ? defaultSurveyData[3] === SurveyAnswersMap[3][3]
                          ? true
                          : false
                        : values[4] === SurveyAnswersMap[3][3]
                        ? true
                        : false,
                  },
                  {
                    id: SurveyAnswersIdMap[3][4],
                    text: SurveyAnswersMap[3][4],
                    answer_order: SurveyAnswersOrderMap[3][4],
                    answered:
                      values[4] === undefined
                        ? defaultSurveyData[3] === SurveyAnswersMap[3][4]
                          ? true
                          : false
                        : values[4] === SurveyAnswersMap[3][4]
                        ? true
                        : false,
                  },
                ],
                question_order: SurveyQuestionOrderMap[3],
              },
            ],
          },
        ],
      };
    }
    // second topic
    if (surveyTopicId === SurveyTopicIdMap[1]) {
      payload = {
        user_id: patientid,
        survey_details: [
          {
            id: SurveyTopicIdMap[1],
            text: SurveyTopicTitleMap[1],
            survey_questions: [
              {
                id: SurveyQuestionIdMap[0],
                text: SurveyQuestionMap[0],
                survey_question_type: SurveyQuestionTypeMap[0],
                mandatory: true,
                randomize_options: false,
                survey_answers: [
                  {
                    id: SurveyAnswersIdMap[0][0],
                    text: SurveyAnswersMap[0][0],
                    answer_order: SurveyAnswersOrderMap[0][0],
                    answered:
                      values[5] === undefined
                        ? defaultSurveyData[0] === SurveyAnswersMap[0][0]
                          ? true
                          : false
                        : values[5] === SurveyAnswersMap[0][0]
                        ? true
                        : false,
                  },
                  {
                    id: SurveyAnswersIdMap[0][1],
                    text: SurveyAnswersMap[0][1],
                    answer_order: SurveyAnswersOrderMap[0][1],
                    answered:
                      values[5] === undefined
                        ? defaultSurveyData[0] === SurveyAnswersMap[0][1]
                          ? true
                          : false
                        : values[5] === SurveyAnswersMap[0][1]
                        ? true
                        : false,
                  },
                  {
                    id: SurveyAnswersIdMap[0][2],
                    text: SurveyAnswersMap[0][2],
                    answer_order: SurveyAnswersOrderMap[0][2],
                    answered:
                      values[5] === undefined
                        ? defaultSurveyData[0] === SurveyAnswersMap[0][2]
                          ? true
                          : false
                        : values[5] === SurveyAnswersMap[0][2]
                        ? true
                        : false,
                  },
                  {
                    id: SurveyAnswersIdMap[0][3],
                    text: SurveyAnswersMap[0][3],
                    answer_order: SurveyAnswersOrderMap[0][3],
                    answered:
                      values[5] === undefined
                        ? defaultSurveyData[0] === SurveyAnswersMap[0][3]
                          ? true
                          : false
                        : values[5] === SurveyAnswersMap[0][3]
                        ? true
                        : false,
                  },
                ],
                question_order: SurveyQuestionOrderMap[0],
              },
              {
                id: SurveyQuestionIdMap[1],
                text: SurveyQuestionMap[1],
                survey_question_type: SurveyQuestionTypeMap[1],
                mandatory: true,
                randomize_options: false,
                survey_answers: [
                  {
                    id: SurveyAnswersIdMap[1][0],
                    text: SurveyAnswersMap[1][0],
                    answer_order: SurveyAnswersOrderMap[1][0],
                    answered:
                      values[6] === undefined
                        ? defaultSurveyData[1] === SurveyAnswersMap[1][0]
                          ? true
                          : false
                        : values[6] === SurveyAnswersMap[1][0]
                        ? true
                        : false,
                  },
                  {
                    id: SurveyAnswersIdMap[1][1],
                    text: SurveyAnswersMap[1][1],
                    answer_order: SurveyAnswersOrderMap[1][1],
                    answered:
                      values[6] === undefined
                        ? defaultSurveyData[1] === SurveyAnswersMap[1][1]
                          ? true
                          : false
                        : values[6] === SurveyAnswersMap[1][1]
                        ? true
                        : false,
                  },
                  {
                    id: SurveyAnswersIdMap[1][2],
                    text: SurveyAnswersMap[1][2],
                    answer_order: SurveyAnswersOrderMap[1][2],
                    answered:
                      values[6] === undefined
                        ? defaultSurveyData[1] === SurveyAnswersMap[1][2]
                          ? true
                          : false
                        : values[6] === SurveyAnswersMap[1][2]
                        ? true
                        : false,
                  },
                  {
                    id: SurveyAnswersIdMap[1][3],
                    text: SurveyAnswersMap[1][3],
                    answer_order: SurveyAnswersOrderMap[1][3],
                    answered:
                      values[6] === undefined
                        ? defaultSurveyData[1] === SurveyAnswersMap[1][3]
                          ? true
                          : false
                        : values[6] === SurveyAnswersMap[1][3]
                        ? true
                        : false,
                  },
                ],
                question_order: SurveyQuestionOrderMap[1],
              },
              {
                id: SurveyQuestionIdMap[2],
                text: SurveyQuestionMap[2],
                survey_question_type: SurveyQuestionTypeMap[2],
                mandatory: true,
                randomize_options: false,
                survey_answers: [],
                question_order: SurveyQuestionOrderMap[2],
                answered_text: values.oral_condition,
              },
            ],
          },
        ],
      };
    }
    if (defaultSurveyData[0] === "" || defaultSurveyData[0] === null) {
      // runs on initial signup
      const config = {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      };
      axios
        .post(
          `http://ec2-3-6-218-218.ap-south-1.compute.amazonaws.com:8080/api/v1/survey`,
          payload,
          config
        )
        .then((res) => {
          setIsOpenSurveySuccessModal(true);
        });
    } else {
      // updates the existing values
      const config = {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      };
      axios
        .put(
          `http://ec2-3-6-218-218.ap-south-1.compute.amazonaws.com:8080/api/v1/survey`,
          payload,
          config
        )
        .then((res) => {
          setIsOpenSurveySuccessModal(true);
        });
    }
  };
  //

  // Patient specific survey details on opening the survey module
  const handleGetPatientSurveyDetails = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };
    axios
      .get(
        `http://ec2-3-6-218-218.ap-south-1.compute.amazonaws.com:8080/api/v1/survey/${surveyTopicId}?user_id=${patientid}`,
        config
      )
      .then((res) => {
        setPatientSurveyDataMap(res.data.data.survey_questions);
        SurveyDefaultData = res.data.data.survey_questions.map((item) =>
          item.survey_answers
            .filter((item) => item.answered === true)
            .map((item) => item.text)
            .toString()
        );
        setDefaultSurveyData(SurveyDefaultData);
      });
  };
  //

  // Retireves the survey details based on the selected survey topic
  const handleSelectTopicGetPatientSurveyDetails = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };
    axios
      .get(
        `http://ec2-3-6-218-218.ap-south-1.compute.amazonaws.com:8080/api/v1/survey/${id}?user_id=${patientid}`,
        config
      )
      .then((res) => {
        setPatientSurveyDataMap(res.data.data.survey_questions);
        SurveyDefaultData = res.data.data.survey_questions.map((item) =>
          item.survey_answers
            .filter((item) => item.answered === true)
            .map((item) => item.text)
            .toString()
        );
        setDefaultSurveyData(SurveyDefaultData);
        setLoading(false);
      });
  };
  //

  // Initaial default / All survey details when user signs up
  const handleGetAllSurveyDetails = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };
    axios
      .get(
        `http://ec2-3-6-218-218.ap-south-1.compute.amazonaws.com:8080/api/v1/survey`,
        config
      )
      .then((res) => {
        setAllSurveyDataMap(res.data.data);
      });
  };
  //

  useEffect(() => {
    handleGetPatientSurveyDetails();
  }, []);

  useEffect(() => {
    handleGetAllSurveyDetails();
  }, []);

  return (
    <div className="survey-page-main-div">
      <Helmet>
        <title>Patient Survey</title>
      </Helmet>
      <Row
        style={{
          height: "6.564102564102564vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontWeight: 700,
            fontSize: 22,
            margin: "0 0 0 22px",
            color: "#525252",
          }}
        >
          Surveys
        </span>
      </Row>
      <Row className="d-flex jc-evenly">
        <Col sm={10} lg={6} style={{ display: "flex", justifyContent: "end" }}>
          <div className="survey-topic-div">
            <div className="survey-sidebar">
              <Row
                style={{
                  height: "82px",
                }}
                className="d-flex jc-center ai-center"
              >
                <Input
                  type="search"
                  placeholder="input search text"
                  style={{
                    width: "100%",
                    height: 40,
                    background: "#FFFFFF",
                    border: "1px solid #E3E3E3",
                    borderRadius: 3,
                  }}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </Row>
              <Row
                className="w-100 d-flex"
                style={{
                  gap: "8px",
                }}
              >
                {allSurveyDataMap &&
                  allSurveyDataMap
                    .filter((item) =>
                      item.text
                        .toLowerCase()
                        .includes(searchInput.toLowerCase())
                    )
                    .map((item) => {
                      return (
                        <>
                          {surveyTopicId === item.id ? (
                            <Row className="survey-tabs-selected">
                              <Col>
                                <span
                                  style={{
                                    fontWeight: 600,
                                    fontSize: 16,
                                    color: "#525252",
                                    padding: "0 0 0 16px",
                                  }}
                                >
                                  {item.text}
                                </span>
                              </Col>
                              <Col>
                                <Button className="survey-participate-btn">
                                  Participate
                                </Button>
                              </Col>
                            </Row>
                          ) : (
                            <Row className="survey-tabs">
                              <Col>
                                <span
                                  style={{
                                    fontWeight: 600,
                                    fontSize: 16,
                                    color: "#525252",
                                    padding: "0 0 0 16px",
                                  }}
                                >
                                  {item.text}
                                </span>
                              </Col>
                              <Col>
                                <Button
                                  className="survey-participate-btn"
                                  onClick={() => {
                                    setSurveyTopicId(item.id);
                                    setLoading(true);
                                    setTimeout(() => {
                                      handleSelectTopicGetPatientSurveyDetails(
                                        item.id
                                      );
                                    }, 500);
                                  }}
                                >
                                  Participate
                                </Button>
                              </Col>
                            </Row>
                          )}
                        </>
                      );
                    })}
              </Row>
            </div>
          </div>
        </Col>
        <Col
          sm={14}
          lg={18}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className="survey-questions-div">
            <Spin indicator={antIcon} spinning={loading}>
              <Form form={form} onFinish={handleSubmitPatientSurveyDetails}>
                {allSurveyDataMap.map((item) => {
                  return (
                    surveyTopicId === item.id && (
                      <div className="survey-content" key={item.id}>
                        <Row>
                          <span className="survey-topic-name-text">
                            {item.text}
                          </span>
                        </Row>
                        {patientSurveyDataMap.length > 0 &&
                          patientSurveyDataMap
                            .sort((a, b) => a.question_order - b.question_order)
                            .map((item) => {
                              return (
                                <>
                                  <Form.Item name={item.id} key={item.id}>
                                    <Radio.Group key={item.id}>
                                      <>
                                        <Row>
                                          <span className="survey-question-text">
                                            {item.text}
                                          </span>
                                        </Row>
                                        {item.survey_answers
                                          .sort(
                                            (a, b) =>
                                              a.answer_order - b.answer_order
                                          )
                                          .map((it) => {
                                            return (
                                              <Row>
                                                <div className="d-flex ai-center survey-answers-options-div">
                                                  <Radio
                                                    value={
                                                      it.answered === true
                                                        ? item.survey_answers
                                                            .text
                                                        : it.text
                                                    }
                                                    style={{
                                                      margin: "0 12px",
                                                    }}
                                                  >
                                                    <span
                                                      style={{
                                                        fontWeight: 400,
                                                        fontSize: 16,
                                                        color: "#7D7D7D",
                                                      }}
                                                      className="survey-answer-options-text"
                                                    >
                                                      {it.text}
                                                    </span>
                                                  </Radio>
                                                </div>
                                              </Row>
                                            );
                                          })}
                                      </>
                                    </Radio.Group>
                                  </Form.Item>
                                  {item.survey_question_type ===
                                    "OPEN_RESPONSE" && (
                                    <Form.Item
                                      initialValue={item.answered_text}
                                      style={{ margin: 0 }}
                                      name="oral_condition"
                                    >
                                      <TextArea
                                        style={{
                                          margin: "0 45px",
                                          width: "50%",
                                          height: "10vh",
                                          borderRadius: "5px",
                                          background: "#F9F9F9",
                                          border: "1px solid #ccc",
                                        }}
                                        bordered={false}
                                      />
                                    </Form.Item>
                                  )}
                                </>
                              );
                            })}

                        <Form.Item
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "20px 0 66px 0",
                          }}
                        >
                          <Button
                            style={{
                              width: 85,
                              height: 30,
                              background: "#E0F2FF",
                              border: "1px solid #009DF7",
                              borderRadius: 30,
                              fontWeight: 600,
                              fontSize: 14,
                              color: "#2CA3FA",
                            }}
                            type="primary"
                            htmlType="submit"
                          >
                            Submit
                          </Button>
                        </Form.Item>
                      </div>
                    )
                  );
                })}
              </Form>
              {/* <Form initialValues={initialValues}>
                <Form.Item name="myRadioGroup">
                  <Radio.Group>
                    <Radio value="option1">Option 1</Radio>
                    <Radio value="option2">Option 2</Radio>
                    <Radio value="option3">Option 3</Radio>
                  </Radio.Group>
                </Form.Item>
              </Form> */}
            </Spin>
          </div>
        </Col>
      </Row>
      <Modal
        width={"647px"}
        open={isOpenSurveySuccessModal}
        closable={false}
        footer={false}
        centered
        destroyOnClose={true}
      >
        <div
          style={{
            height: 305,
            background: "#FFFFFF",
            borderRadius: 5,
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
              Survey
            </span>
            <CloseOutlined
              style={{
                fontSize: "20px",
                color: "red",
              }}
            />
          </Row>
          <Row
            style={{
              margin: "70px 0",
            }}
          >
            <div
              className="d-flex jc-center ai-center"
              style={{
                margin: "0 102px",
                width: 404,
                height: 57,
                background: "#F9F9F9",
                borderRadius: 5,
              }}
            >
              <span
                style={{
                  fontWeight: 400,
                  fontSize: 20,
                  color: "#7D7D7D",
                }}
              >
                Thank you for Participating in the Survey
              </span>
            </div>
          </Row>
          <Row className="d-flex jc-center">
            <Button
              className="survey-close-btn"
              onClick={() => {
                setIsOpenSurveySuccessModal(false);
                setLoading(true);
                setTimeout(() => {
                  window.location.reload(false);
                }, 300);
              }}
            >
              Close
            </Button>
          </Row>
        </div>
      </Modal>
    </div>
  );
};

export default Surveys;
