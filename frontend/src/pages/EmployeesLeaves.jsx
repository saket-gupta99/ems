import { FaRegCalendarXmark } from "react-icons/fa6";
import { useGetLeaves } from "../features/leave/useGetLeaves";
import FullScreenSpinner from "../ui/FullScreenSpinner";
import Table from "../ui/Table";
import { differenceInDays, extractDate } from "../utils/helper";
import SearchBar from "../ui/SearchBar";
import { useState } from "react";

const columns = [
  { key: "employeeId", label: "Applied by" },
  { key: "name", label: "Name" },
  { key: "appliedOn", label: "Applied On" },
  { key: "onLeave", label: "On Leave" },
  { key: "duration", label: "Duration" },
  { key: "status", label: "Status" },
];

const formatData = (el) => {
  const {
    firstName,
    lastName,
    status,
    createdAt,
    startDate,
    endDate,
    employeeId,
  } = el;

  return {
    employeeId,
    name: `${firstName} ${lastName}`,
    duration: differenceInDays(startDate, endDate) + 1,
    appliedOn: extractDate(new Date(createdAt)),
    status,
    onLeave:
      extractDate(new Date(startDate)) +
      " to " +
      extractDate(new Date(endDate)),
  };
};

function EmployeesLeaves() {
  const [currEmp, setCurrEmp] = useState("");
  const { getLeaves, isLoading } = useGetLeaves();

  if (isLoading || !getLeaves.data) {
    return <FullScreenSpinner />;
  }

  const data = getLeaves.data.map((el) => formatData(el));
  const searchData = getLeaves.data
    .filter((el) => el.employeeId === currEmp)
    .map((el) => formatData(el));

  return (
    <>
      <h1 className="flex font-semibold gap-3 text-lg sm:text-xl sm:p-3 p-2 w-full shadow-xl items-center">
        <FaRegCalendarXmark className="h-10 w-10 sm:h-8 sm:w-8" /> Employee
        Leaves
      </h1>
      <div className="grid grid-cols-3 grid-rows-[auto_1fr] w-full shadow-2xl p-5 min-h-screen">
        <SearchBar search={currEmp} setSearch={setCurrEmp} />
        {!currEmp && <Table columns={columns} data={data} text="All Leaves" />}
        {currEmp && searchData.length > 0 && (
          <Table
            columns={columns}
            data={searchData}
            text={`${currEmp} Record`}
          />
        )}
        {currEmp && !searchData?.length && <Table text="No Record found" />}
      </div>
    </>
  );
}

export default EmployeesLeaves;
