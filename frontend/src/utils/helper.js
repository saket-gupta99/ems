export const formatDateToISO = (date) => {
  return new Date(date).toISOString().split("T")[0];
};

export const convertToIst = (utcDate) => {
  return new Date(utcDate.getTime() + 5.5 * 60 * 60 * 1000);
};

export const extractDate = (istDate) => {
  return istDate.toISOString().split("T")[0].split("-").reverse().join("-");
};

export const extractTime = (istDate) => {
  return istDate.toISOString().split("T")[1].slice(0, 8);
};

export const differenceInDays = (startDate, endDate) => {
  return Math.floor(
    (new Date(endDate) - new Date(startDate)) / (24 * 60 * 60 * 1000)
  );
};

export function formatDataForTable(el) {
  const { employeeId, firstName, lastName, checkIn, checkOut, attendance } = el;
  const name = firstName + " " + lastName;

  const istDateCheckIn = new Date(checkIn);
  const istDateCheckOut = checkOut ? new Date(checkOut) : null;

  return {
    employeeId,
    name,
    date: extractDate(istDateCheckIn),
    checkInTime: extractTime(istDateCheckIn),
    checkOutTime: istDateCheckOut
      ? extractTime(istDateCheckOut)
      : "Not Checked Out",
    attendance,
  };
}

export const tableColumns = [
  { key: "date", label: "Date" },
  { key: "employeeId", label: "Employee ID" },
  { key: "name", label: "Name" },
  { key: "checkInTime", label: "Check-in Time" },
  { key: "checkOutTime", label: "Check-out Time" },
  { key: "attendance", label: "Status" },
];


