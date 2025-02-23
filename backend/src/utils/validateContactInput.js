const validator = require("validator");

const validateContactInput = (data) => {
  const {
    presentAddress,
    presentCity,
    presentPinCode,
    presentState,
    permanentAddress,
    permanentCity,
    permanentPinCode,
    permanentState,
    emergencyContact,
  } = data;

  const errors = {};

  if (!presentCity) errors.presentCity = "present city is required";
  if (!presentPinCode) errors.presentPinCode = "present pin code is required";
  if (!presentState) errors.presentState = "present state is required";
  if (!presentAddress) errors.presentAddress = "present address is required";
  if (!permanentCity) errors.permanentCity = "permanent city is required";
  if (!permanentPinCode)
    errors.permanentPinCode = "permanent pin code is required";
  if (!permanentState) errors.permanentState = "permanent state is required";
  if (!permanentAddress)
    errors.permanentAddress = "permanent address is required";
  if (!emergencyContact)
    errors.emergencyContact = "emergency contact is required";

  if (emergencyContact && !validator.isMobilePhone(emergencyContact, "en-IN")) {
    errors.emergencyContact = "Enter a valid phone no";
  }

  if (presentPinCode && presentPinCode.toString().length !== 6) {
    errors.presentPinCode = "present pincode should be of length 6";
  }
  if (permanentPinCode && permanentPinCode.toString().length !== 6) {
    errors.presentPinCode = "permanent pincode should be of length 6";
  }

  return { errors, isValid: Object.keys(errors).length === 0 };
};

module.exports = validateContactInput;
