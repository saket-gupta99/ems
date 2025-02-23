const validatePersonalInput = (data) => {
  const { dateOfBirth, bloodGroup, gender, aadharNo, panNo, maritalStatus } = data;

  const errors = {};

  if (!dateOfBirth) errors.dateOfBirth = "date of birth is required";
  if (!bloodGroup) errors.bloodGroup = "blood group is required";
  if (!gender) errors.gender = "gender is required";
  if (!aadharNo) errors.aadharNo = "aadhar no is required";
  if (!panNo) errors.panNo = "pan no is required";

  if (
    bloodGroup &&
    !["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].includes(
      bloodGroup.toUpperCase()
    )
  ) {
    errors.bloodGroup = "Invalid blood group";
  }
  if (
    maritalStatus &&
    !["married", "unmarried"].includes(maritalStatus.toLowerCase())
  ) {
    errors.maritalStatus = "Invalid marital status";
  }
  if (gender && !["male", "female", "other"].includes(gender.toLowerCase())) {
    errors.gender = "Invalid gender";
  }
  if (aadharNo && aadharNo.toString().length !== 12) {
    errors.aadharNo = "Enter a valid 12-digit aadhar no";
  }

  return { errors, isValid: Object.keys(errors).length === 0 };
};

module.exports = validatePersonalInput;