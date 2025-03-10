import { FaList } from "react-icons/fa";
import { useGetAllEmployees } from "../features/employee/useGetAllEmployees";
import FullScreenSpinner from "../ui/FullScreenSpinner";
import Table from "../ui/Table";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import EmployeeDetails from "./EmployeeDetails";

const columns = [
  { key: "employeeId", label: "Employee ID" },
  { key: "name", label: "Full Name" },
  { key: "designation", label: "Designation" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone No." },
  {key: "isVerified", label: "Is Verified"}
];

const formdatData = (el) => {
  const { firstName, lastName, employeeId, email, phone, designation, isVerified } =
    el.general;

  return {
    employeeId,
    name: firstName + " " + lastName,
    designation,
    email,
    phone,
    isVerified: isVerified ? "Yes" : "No"
  };
};

function EmployeeList() {
  const { allEmployees, isLoading, refetch } = useGetAllEmployees();
  const [openDialog, setOpenDialog] = useState(false);
  const [empId, setEmpId] = useState({});

  function handleOpen(emp) {
    setOpenDialog(true);
    setEmpId(emp);
  }
  function handleClose() {
    setOpenDialog(false);
  }

  if (isLoading || !allEmployees.data) {
    return <FullScreenSpinner />;
  }

  const currentEmployee = allEmployees.data.filter(
    (el) => el.general.employeeId === empId
  )[0];

  const data = allEmployees.data.map((el) => formdatData(el)).sort((a,b) => a.employeeId.localeCompare(b.employeeId));

  return (
    <>
      <h1 className="flex font-semibold gap-3 text-lg sm:text-xl sm:p-3 p-2 w-full shadow-xl items-center">
        <FaList className="h-10 w-10 sm:h-8 sm:w-8" />
        Employee List
      </h1>
      <div className="grid grid-cols-1 w-full shadow-2xl p-5 min-h-screen">
        <Table columns={columns} data={data} onClick={handleOpen} />
      </div>
      {openDialog && (
        <div className="bg-gray-900/80 z-10000 min-h-screen fixed inset-0 grid place-items-center">
          <div className="bg-white shadow-xl rounded-md w-full max-w-[85%] h-[95%] p-2 relative flex flex-col">
            <RxCross1
              className="absolute right-0 top-0 h-8 w-8 hover:cursor-pointer"
              onClick={handleClose}
            />
            <EmployeeDetails
              employee={currentEmployee}
              onUpdate={() => refetch()}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default EmployeeList;
