import { useGetAttendance } from "../features/attendance/useGetAttendance";
import {
  extractDate,
  formatDataForTable,
  formatDateToISO,
  tableColumns,
} from "../utils/helper";
import FullScreenSpinner from "../ui/FullScreenSpinner";
import SearchBar from "../ui/SearchBar";
import Table from "../ui/Table";
import { useGetAllEmployees } from "../features/employee/useGetAllEmployees";
import { useState } from "react";
import SearchByDate from "../ui/SearchByDate";
import { MdCoPresent } from "react-icons/md";

function EmployeesAttendance() {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState(formatDateToISO(new Date()));
  const { getAttendance, isLoading } = useGetAttendance();
  const { allEmployees, isLoading: isLoading2 } = useGetAllEmployees();

  if (isLoading || isLoading2 || !allEmployees?.data) {
    return <FullScreenSpinner />;
  }

  function getAttendanceForDate(selectedDate) {
    if (new Date(selectedDate) < new Date("2025-02-20")) return false;

    const dateToCheck = new Date(selectedDate);
    dateToCheck.setUTCHours(0, 0, 0, 0);

    const presentEmployees = getAttendance.data
      .filter((el) => {
        const checkInDate = new Date(el.checkIn);
        checkInDate.setUTCHours(0, 0, 0, 0);
        return checkInDate.getTime() === dateToCheck.getTime();
      })
      .map((el) => formatDataForTable(el));

    const presentEmployeeIds = new Set(
      presentEmployees.map((el) => el.employeeId)
    );

    const absentEmployees = allEmployees.data
      .map((el) => ({
        employeeId: el.general.employeeId,
        name: el.general.firstName + " " + el.general.lastName,
        attendance: "absent",
        date: extractDate(new Date(date)),
        checkInTime: "-",
        checkOutTime: "-",
      }))
      .filter((el) => !presentEmployeeIds.has(el.employeeId));

    return [...presentEmployees, ...absentEmployees];
  }

  const attendanceData = getAttendanceForDate(date);

  const searchedEmployee = search
    ? getAttendance.data
        .filter((el) => el.employeeId === search)
        .map((el) => formatDataForTable(el))
    : [];

  return (
    <>
      <h1 className="flex font-semibold gap-3 text-lg sm:text-xl sm:p-3 p-2 w-full shadow-xl items-center">
        <MdCoPresent className="h-10 w-10 sm:h-8 sm:w-8" /> Employees Attendance
      </h1>
      <div className="grid grid-cols-3 grid-rows-[auto_1fr] w-full shadow-2xl p-5">
        <SearchByDate date={date} setDate={setDate} />
        <SearchBar search={search} setSearch={setSearch} />
        {search && searchedEmployee.length > 0 && (
          <Table
            columns={tableColumns}
            data={searchedEmployee}
            text={`Employee Record of ${search}`}
          />
        )}
        {!search &&
          date &&
          attendanceData.length > 0 &&
          !searchedEmployee.length &&
          new Date(date).getTime() < new Date().getTime() && (
            <Table
              columns={tableColumns}
              data={attendanceData}
              text={`${extractDate(new Date(date))}'s Attendance`}
            />
          )}
        {(search && !searchedEmployee.length) ||
        new Date(date).getTime() > new Date().getTime() ||
        new Date(date).getTime() < new Date("2025-02-20") ? (
          <Table text="No Record Found" />
        ) : null}
      </div>
    </>
  );
}

export default EmployeesAttendance;
