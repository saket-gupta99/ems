const validator = require("validator");

const validateSignupInput = (data) => {
  const errors = {};
  const {
    firstName,
    lastName,
    phone,
    email,
    dateOfJoining,
    employeeId,
    basicSalary,
    totalLeavesAllowed,
  } = data;

  if (!firstName) errors.firstName = "First name is required";
  if (!lastName) errors.lastName = "Last name is required";
  if (!phone) errors.phone = "Phone is required";
  if (!email) errors.email = "Email is required";
  if (!dateOfJoining) errors.dateOfJoining = "Date of joining is required";
  if (!employeeId) errors.employeeId = "Employee ID is required";
  if (!basicSalary) errors.basicSalary = "Basic salary is required";

  if (phone && !validator.isMobilePhone(phone, "en-IN")) {
    errors.phone = "Enter a valid phone number";
  }
  if (employeeId && employeeId === "EMP") {
    errors.employeeId = "employee id should contain EMP followed by a number";
  }
  if (email && !validator.isEmail(email)) {
    errors.email = "Enter a valid email";
  }
  if (totalLeavesAllowed && !Number(totalLeavesAllowed)) {
    errors.totalLeavesAllowed = "totalLeavesAllowed should be number";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

module.exports = validateSignupInput;
