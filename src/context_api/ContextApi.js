import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { tabs_admin_dashboard } from "../utils/clinic_admin_constants/ClinicAdminConstants";
import { tabs_dashboard } from "../utils/patient_navbar_constants/PatientNavbarConstants";

const UserContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const patientid = localStorage.getItem("PatientID");
  const Token = localStorage.getItem("Token");
  const [tabActiveKey, setTabActiveKey] = useState(tabs_dashboard);
  const [adminTabActiveKey, setAdminTabActiveKey] =
    useState(tabs_admin_dashboard);
  const [inputsEnable, setInputsEnable] = useState(true);
  const [allPatientNotificationsMap, setAllPatientNotificationsMap] =
    useState();
  const [clinicDetails, setClinicDetails] = useState();
  const handleGetAllPatientNotifications = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };
    axios
      .get(
        `http://ec2-3-6-218-218.ap-south-1.compute.amazonaws.com:8080/api/v1/notification/patient/${patientid}`,
        config
      )
      .then((res) => {
        setAllPatientNotificationsMap(res.data.data);
      });
  };
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

  return (
    <UserContext.Provider
      value={{
        setTabActiveKey,
        tabActiveKey,
        setInputsEnable,
        inputsEnable,
        allPatientNotificationsMap,
        setAllPatientNotificationsMap,
        handleGetAllPatientNotifications,
        handleGetAllClinicDetails,
        clinicDetails,
        setAdminTabActiveKey,
        adminTabActiveKey,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const UserAuth = () => {
  return useContext(UserContext);
};
