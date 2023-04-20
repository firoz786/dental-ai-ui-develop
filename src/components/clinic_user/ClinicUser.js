import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import ClinicUserNavbar from "./clinic_user_navbar/ClinicUserNavbar";

const ClinicUser = () => {
  return (
    <Layout>
      <ClinicUserNavbar />
      <Outlet />
    </Layout>
  );
};

export default ClinicUser;
