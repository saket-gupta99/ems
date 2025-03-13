import {  useState } from "react";
import { useGetAttendance } from "../features/attendance/useGetAttendance";
import { useUser } from "../features/authentication/useUser";
import FullScreenSpinner from "../ui/FullScreenSpinner";
import Table from "../ui/Table";
import SortButtons from "../ui/SortButtons";
import { MdGridView } from "react-icons/md";
import { convertToIst, extractDate, extractTime } from "../utils/helper";

const tableColumns = [
  { key: "date", label: "Date" },
  { key: "checkIn", label: "Check-in Time" },
  { key: "checkOut", label: "Check-out Time" },
  { key: "locationName", label: "Assigned Location" },
];

function formatDataForTable(el) {
  const { date, checkIn, checkOut, locationName } = el;
  return {
    date: extractDate(new Date(date)),
    checkIn: extractTime(new Date(checkIn)),
    checkOut:
      checkOut !== null ? extractTime(new Date(checkOut)) : "Not Checked out",
    locationName: locationName ? locationName : "-",
  };
}

function ViewAttendance() {
  const [selectedDays, setSelectedDays] = useState(0);
  const { getAttendance, isLoading } = useGetAttendance();
  const { user, isLoading: isLoading2 } = useUser();

  if (isLoading || !getAttendance?.data || isLoading2 || !user?.data?.general) {
    return <FullScreenSpinner />;
  }

  function getAttendanceForDate(selectedDays) {
    const today = convertToIst(new Date());
    today.setUTCHours(0, 0, 0, 0);

    const startDate = new Date();
    selectedDays > 1 && startDate.setDate(today.getDate() - selectedDays + 1);
    startDate.setUTCHours(0, 0, 0, 0);

    const attendance = getAttendance?.data
      .filter((el) => {
        const checkInDate = new Date(el.checkIn);
        checkInDate.setUTCHours(0, 0, 0, 0);

        return (
          checkInDate.getTime() >= startDate.getTime() &&
          checkInDate.getTime() <= today.getTime() &&
          el.employeeId === user?.data?.general.employeeId
        );
      })
      .map((el) => formatDataForTable(el))
      .reverse();

    return attendance;
  }

  const data = getAttendanceForDate(selectedDays);

  return (
    <>
      <h1 className="flex font-semibold gap-3 text-lg sm:text-xl sm:p-3 p-2 w-full shadow-xl items-center">
        <MdGridView className="h-10 w-10 sm:h-8 sm:w-8" /> View Attendance
      </h1>
      <div className="grid grid-cols-3 grid-rows-[auto_1fr] w-full shadow-2xl p-5 min-h-screen">
        <SortButtons
          setSelectedDays={setSelectedDays}
          selectedDays={selectedDays}
        />
        {!data.length && <Table text="No Record" />}
        {data.length > 0 && (
          <Table
            columns={tableColumns}
            data={data}
            text={`${
              selectedDays !== 0
                ? "Last " + selectedDays + " days Record"
                : "Today's Record"
            }`}
          />
        )}
      </div>
    </>
  );
}

export default ViewAttendance;
