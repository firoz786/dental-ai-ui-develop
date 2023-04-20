import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import ClinicAdminNavbar from "./clinic_admin_navbar/ClinicAdminNavbar";

const ClinicAdmin = () => {
  return (
    <Layout>
      <ClinicAdminNavbar />
      <Outlet />
    </Layout>
  );
};

export default ClinicAdmin;
