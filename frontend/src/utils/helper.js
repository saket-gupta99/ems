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

