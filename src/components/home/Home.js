import React, { useState } from "react";
import PatientNavbar from "./patient_navbar/PatientNavbar";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";

const Home = () => {
  const [toggleNavbarTabs, settoggleNavbarTabs] = useState("Dashboard");

  return (
    <Layout>
      <PatientNavbar
        toggleNavbarTabs={toggleNavbarTabs}
        settoggleNavbarTabs={settoggleNavbarTabs}
      />
      <Outlet />
    </Layout>
  );
};

export default Home;
