import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import ProtectedRoute from "./ui/ProtectedRoute";
import AppLayout from "./ui/AppLayout";
import Profile from "./pages/Profile";
import AddSalary from "./pages/AddSalary";
import AddEmployee from "./pages/AddEmployee";
import ViewAttendance from "./pages/ViewAttendance";
import ManageAttendance from "./pages/ManageAttendance";
import EmployeesAttendance from "./pages/EmployeesAttendance";
import ApplyLeaves from "./pages/ApplyLeave";
import EmployeesLeaves from "./pages/EmployeesLeaves";
import ApproveLeaves from "./pages/ApproveLeaves";
import EmployeeList from "./pages/EmployeeList";
import SetPassword from "./features/authentication/SetPassword";
import SalarySlip from "./pages/SalarySlip";
import ViewLeave from "./pages/ViewLeave";
import Home from "./pages/Home";
import AddLocation from "./pages/AddLocation";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {import.meta.env.REACT_ENV === "PRODUCTION" && <ReactQueryDevtools initialIsOpen={false} />}
      <Router>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="profile" />} />
            <Route path="profile" element={<Profile />} />
            <Route path="add-location" element={<AddLocation />} />
            <Route path="manage-attendance" element={<ManageAttendance />} />
            <Route path="view-attendance" element={<ViewAttendance />} />
            <Route
              path="employees-attendance"
              element={<EmployeesAttendance />}
            />
            <Route path="apply-leave" element={<ApplyLeaves />} />
            <Route path="view-leave" element={<ViewLeave />} />
            <Route path="approve-leaves" element={<ApproveLeaves />} />
            <Route path="employees-leaves" element={<EmployeesLeaves />} />
            <Route path="add-salary" element={<AddSalary />} />
            <Route path="salary-slip" element={<SalarySlip />} />
            <Route path="add-employee" element={<AddEmployee />} />
            <Route path="employee-list" element={<EmployeeList />} />
          </Route>

          <Route path="home" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="set-password" element={<SetPassword />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "black",
            color: "white",
          },
        }}
      />
    </QueryClientProvider>
  );
}
