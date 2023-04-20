import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import Articles from "./components/home/modules/articles/Articles";
import Clinics from "./components/home/modules/clinics/Clinics";
import MlAnalysis from "./components/home/modules/ml_analysis/MlAnalysis";
import MyAccount from "./components/home/modules/my_account/MyAccount";
import PatientDashboard from "./components/home/modules/patient_dashboard/PatientDashboard";
import Surveys from "./components/home/modules/surveys/Surveys";
import PatientLogin from "./components/login/Login";
import {
  routes_home,
  routes_patientlogin,
  routes_patientsignup,
} from "./utils/patient_navbar_constants/PatientNavbarConstants";
import { AuthContextProvider } from "./context_api/ContextApi";
import ProtectedRoute from "./protected_route/ProtectedRoute";
import AppointmentPage from "./components/home/modules/appointment_page/AppointmentPage";
import PatientNotifications from "./components/home/modules/patient_notifications/PatientNotifications";
import Help from "./components/home/modules/help/Help";
import {
  routes_clinic_user_add_patient,
  routes_clinic_user_appointments,
  routes_clinic_user_dashboard,
  routes_clinic_user_edit_patient,
  routes_clinic_user_home,
  routes_clinic_user_patients,
  routes_clinic_user_view_patient_by_id,
} from "./utils/clinic_user_constants/ClinicUserConstants";
import PatientSignup from "./components/home/patient_signup/PatientSignup";
import ClinicUserDashboard from "./components/clinic_user/modules/clinic_user_dashboard/ClinicUserDashboard";
import {
  routes_ading_new_staff,
  routes_clinic_admin_add_admin,
  routes_clinic_admin_add_patient,
  routes_clinic_admin_administrator,
  routes_clinic_admin_administrator_profile,
  routes_clinic_admin_dashboard,
  routes_clinic_admin_home,
  routes_clinic_admin_ml_analysis,
  routes_clinic_admin_patients,
  routes_clinic_admin_staff,
  routes_clinic_appointments,
} from "./utils/clinic_admin_constants/ClinicAdminConstants";
import ClinicUser from "./components/clinic_user/ClinicUser";
import ClinicAdmin from "./components/clinic_admin/ClinicAdmin";
import ClinicAdminDashboard from "./components/clinic_admin/modules/clinic_admin_dashboard/ClinicAdminDashboard";
import AdminMlAnalysis from "./components/clinic_admin/modules/ml_analysis/AdminMlAnalysis";
import AdminPatients from "./components/clinic_admin/modules/admin_patients/AdminPatients";
import AdminStaff from "./components/clinic_admin/modules/admin_staff/AdminStaff";
import AdminAppointment from "./components/clinic_admin/modules/admin_appointments/AdminAppointment";
import AddingNewStaff from "./components/clinic_admin/modules/admin_staff/adding_new_staff/AddingNewStaff";
import ClinicUserPatientModule from "./components/clinic_user/modules/clinic_user_patients/ClinicUserPatientModule";
import ClinicUserAppointment from "./components/clinic_user/modules/clinic_user_appointments/ClinicUserAppointment";
import ViewPatientById from "./components/clinic_user/modules/clinic_user_patients/view_patient_by_id/ViewPatientById";
import AddPatient from "./components/clinic_user/modules/clinic_user_patients/add_clinic_user_patient/AddClinicUserPatient";
import AddAdminPatient from "./components/clinic_admin/modules/admin_patients/add_admin_patient/AddAdminPatient";
import AdministratorModule from "./components/clinic_admin/clinic_admin_navbar/administrator_page/AdministratorModule";
import AdministratorProfile from "./components/clinic_admin/clinic_admin_navbar/administrator_profile/AdministratorProfile";
import AddAdmin from "./components/clinic_admin/clinic_admin_navbar/administrator_page/add_new_admin/AddAdmin";
import AddClinicUserPatient from "./components/clinic_user/modules/clinic_user_patients/add_clinic_user_patient/AddClinicUserPatient";
import EditClinicUserPatient from "./components/clinic_user/modules/clinic_user_patients/edit_clinic_user_patient/EditClinicUserPatient";

function App() {
  // const role = localStorage.getItem("role");
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<PatientLogin />} />
          <Route
            exact
            path={routes_patientsignup}
            element={<PatientSignup />}
          />
          <Route exact path={routes_patientlogin} element={<PatientLogin />} />
          {/* patient routes */}

          {/* {role === "STANDARD" && ( */}
          <Route
            exact
            path={routes_home}
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          >
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <PatientDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="my-account"
              element={
                <ProtectedRoute>
                  <MyAccount />
                </ProtectedRoute>
              }
            />
            <Route
              path="ml-analysis"
              element={
                <ProtectedRoute>
                  <MlAnalysis />
                </ProtectedRoute>
              }
            />
            <Route
              path="clinics"
              element={
                <ProtectedRoute>
                  <Clinics />
                </ProtectedRoute>
              }
            />
            <Route
              path="surveys"
              element={
                <ProtectedRoute>
                  <Surveys />
                </ProtectedRoute>
              }
            />
            <Route
              path="appointments"
              element={
                <ProtectedRoute>
                  <AppointmentPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="articles"
              element={
                <ProtectedRoute>
                  <Articles />
                </ProtectedRoute>
              }
            />
            <Route
              path="notifications"
              element={
                <ProtectedRoute>
                  <PatientNotifications />
                </ProtectedRoute>
              }
            />
            <Route
              path="help"
              element={
                <ProtectedRoute>
                  <Help />
                </ProtectedRoute>
              }
            />
          </Route>
          {/* )} */}
          {/* clinic user */}
          {/* {role === "CLINIC" && ( */}
          <Route
            exact
            path={routes_clinic_user_home}
            element={
              <ProtectedRoute>
                <ClinicUser />
              </ProtectedRoute>
            }
          >
            <Route
              path={routes_clinic_user_dashboard}
              element={<ClinicUserDashboard />}
            />
            <Route
              path={routes_clinic_user_patients}
              element={<ClinicUserPatientModule />}
            />
            <Route
              path={routes_clinic_user_appointments}
              element={<ClinicUserAppointment />}
            />
            <Route
              path={routes_clinic_user_add_patient}
              element={<AddClinicUserPatient />}
            />
            <Route
              path={routes_clinic_user_edit_patient}
              element={<EditClinicUserPatient />}
            />
            <Route
              path={routes_clinic_user_view_patient_by_id}
              element={<ViewPatientById />}
            />
          </Route>
          {/* )} */}
          {/* clinic admin */}
          {/* {role === "ADMIN" && ( */}
          <Route
            exact
            path={routes_clinic_admin_home}
            element={
              <ProtectedRoute>
                <ClinicAdmin />
              </ProtectedRoute>
            }
          >
            <Route
              path={routes_clinic_admin_dashboard}
              element={<ClinicAdminDashboard />}
            />
            <Route
              path={routes_clinic_admin_ml_analysis}
              element={<AdminMlAnalysis />}
            />
            <Route
              path={routes_clinic_admin_patients}
              element={<AdminPatients />}
            />
            <Route path={routes_clinic_admin_staff} element={<AdminStaff />} />
            <Route
              path={routes_clinic_appointments}
              element={<AdminAppointment />}
            />
            <Route path={routes_ading_new_staff} element={<AddingNewStaff />} />
            <Route
              path={routes_clinic_admin_add_patient}
              element={<AddAdminPatient />}
            />
            <Route
              path={routes_clinic_admin_administrator}
              element={<AdministratorModule />}
            />
            <Route
              path={routes_clinic_admin_administrator_profile}
              element={<AdministratorProfile />}
            />
            <Route
              path={routes_clinic_admin_add_admin}
              element={<AddAdmin />}
            />
          </Route>
          {/* )} */}
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
