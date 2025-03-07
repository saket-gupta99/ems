import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import ProtectedRoute from "./ui/ProtectedRoute";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import FullScreenSpinner from "./ui/FullScreenSpinner";

const Profile = lazy(() => import("./pages/Profile"));
const AddSalary = lazy(() => import("./pages/AddSalary"));
const AddEmployee = lazy(() => import("./pages/AddEmployee"));
const ViewAttendance = lazy(() => import("./pages/ViewAttendance"));
const ManageAttendance = lazy(() => import("./pages/ManageAttendance"));
const EmployeesAttendance = lazy(() => import("./pages/EmployeesAttendance"));
const ApplyLeaves = lazy(() => import("./pages/ApplyLeave"));
const EmployeesLeaves = lazy(() => import("./pages/EmployeesLeaves"));
const ApproveLeaves = lazy(() => import("./pages/ApproveLeaves"));
const SetPassword = lazy(() => import("./features/authentication/SetPassword"));
const SalarySlip = lazy(() => import("./pages/SalarySlip"));
const ViewLeave = lazy(() => import("./pages/ViewLeave"));
const AddLocation = lazy(() => import("./pages/AddLocation"));
const EmployeeList = lazy(() => import("./pages/EmployeeList"));

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {import.meta.env.REACT_ENV !== "PRODUCTION" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
      
      <Router>
        <Suspense fallback={<FullScreenSpinner />}>
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
        </Suspense>
      </Router>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
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
