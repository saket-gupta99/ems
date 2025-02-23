import { useState } from "react";
import SaveButton from "../ui/SaveButton";
import validator from "validator";
import { useSignup } from "../features/authentication/useSignup";
import FullScreenSpinner from "../ui/FullScreenSpinner";
import { IoIosAddCircle } from "react-icons/io";
import toast from "react-hot-toast";

function AddEmployee() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    designation: "",
    email: "",
    dateOfJoining: "",
    role: "",
    employeeId: "EMP",
    reference: "",
    basicSalary: "",
    totalLeavesAllowed: "12",
    bankName: "",
    bankAccountNo: "",
    bankIFSCCode: "",
  });
  const { signup, isLoading } = useSignup();
  const errors = {};

  function handleChange(e) {
    return setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    if (Object.keys(errors).length > 0) {
      return toast.error("Fix form errors before submitting.");
    }

    signup(
      { data: formData },
      {
        onSuccess: () => {
          setFormData({
            firstName: "",
            lastName: "",
            phone: "",
            designation: "",
            email: "",
            dateOfJoining: "",
            role: "",
            employeeId: "EMP",
            reference: "",
            basicSalary: "",
            bankName: "",
            bankAccountNo: "",
            bankIFSCCode: "",
            totalLeavesAllowed: "12",
          });
        },
      }
    );
  }

  if (isLoading) {
    return <FullScreenSpinner />;
  }

  if (formData.phone && !validator.isMobilePhone(formData.phone, "en-IN")) {
    errors.phone = "Enter a valid phone number";
  }
  if (formData.email && !validator.isEmail(formData.email)) {
    errors.email = "Enter a valid email id";
  }
  if (formData.password && !validator.isStrongPassword(formData.password)) {
    errors.password = "Enter a strong password";
  }
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "password and confirm password do not match";
  }
  if (formData.employeeId && !formData.employeeId.startsWith("EMP")) {
    errors.employeeId = "employee id should start with the prefix EMP";
  }

  return (
    <>
      <h1 className="flex font-semibold gap-3 text-lg sm:text-xl sm:p-3 p-2 w-full shadow-xl items-center">
        <IoIosAddCircle className="h-10 w-10 sm:h-8 sm:w-8" /> Add an Employee
      </h1>
      <div className="w-full flex flex-col items-center p-5 shadow-2xl">
        <form
          className="grid grid-cols-1 sm:grid-cols-2 sm:gap-5 pt-5"
          onSubmit={handleSubmit}
        >
          <div>
            <label>
              First Name*:{" "}
              <input
                type="text"
                name="firstName"
                className="w-full border border-gray-400 p-1 mb-2 capitalize disabled:bg-gray-200 disabled:cursor-not-allowed"
                value={formData.firstName || ""}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Last Name*:{" "}
              <input
                type="text"
                name="lastName"
                className="w-full border border-gray-400 p-1 mb-2 capitalize disabled:bg-gray-200 disabled:cursor-not-allowed"
                value={formData.lastName || ""}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Phone no*:{" "}
              <input
                type="text"
                name="phone"
                className="w-full border border-gray-400 p-1 mb-2"
                value={formData.phone || ""}
                onChange={handleChange}
                required
              />
            </label>
            {errors?.phone && (
              <p className="block text-red-500">{errors.phone}</p>
            )}
            <label>
              Designation*:{" "}
              <input
                type="text"
                name="designation"
                className="w-full border border-gray-400 p-1 mb-2 capitalize"
                value={formData.designation || ""}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Total Leaves Allowed:{" "}
              <input
                type="number"
                name="totalLeavesAllowed"
                className="w-full border border-gray-400 p-1 mb-2 capitalize"
                value={formData.totalLeavesAllowed || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Basic Salary:{" "}
              <input
                type="number"
                name="basicSalary"
                className="w-full border border-gray-400 p-1 mb-2 capitalize"
                value={formData.basicSalary || ""}
                onChange={handleChange}
                required
              />
            </label>
            <label className="block sm:flex items-center w-full p-1">
              Role*:
              <div className="w-full">
                {["admin", "employee"].map((option) => {
                  return (
                    <label key={option} className="sm:pl-4 p-1">
                      <input
                        type="radio"
                        name="role"
                        value={option}
                        checked={formData.role === option}
                        onChange={handleChange}
                        required
                      />{" "}
                      {option}
                    </label>
                  );
                })}
              </div>
            </label>
          </div>

          <div>
            <label>
              Email ID*:{" "}
              <input
                type="email"
                name="email"
                className="w-full border border-gray-400 p-1 mb-2 disabled:bg-gray-200 disabled:cursor-not-allowed"
                value={formData.email || ""}
                onChange={handleChange}
                required
              />
            </label>
            {errors?.email && (
              <p className="block text-red-500">{errors.email}</p>
            )}
            <label>
              Date of Joining*:{" "}
              <input
                type="date"
                name="dateOfJoining"
                className="w-full border border-gray-400 p-1 mb-2"
                value={formData.dateOfJoining || ""}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Reference:{" "}
              <input
                type="text"
                name="reference"
                className="w-full border border-gray-400 p-1 mb-2 capitalize"
                value={formData.reference || ""}
                onChange={handleChange}
              />{" "}
            </label>
            <label>
              Employee ID*:{" "}
              <input
                type="text"
                name="employeeId"
                className="w-full border border-gray-400 p-1 mb-2"
                value={formData.employeeId || ""}
                onChange={handleChange}
                required
              />{" "}
            </label>
            {errors?.employeeId && (
              <p className="block text-red-500">{errors.employeeId}</p>
            )}
            <label>
              Bank Name:{" "}
              <input
                type="text"
                name="bankName"
                className="w-full border border-gray-400 p-1 mb-2"
                value={formData.bankName || ""}
                onChange={handleChange}
              />{" "}
            </label>
            <label>
              Bank Account No:{" "}
              <input
                type="number"
                name="bankAccountNo"
                className="w-full border border-gray-400 p-1 mb-2"
                value={formData.bankAccountNo || ""}
                onChange={handleChange}
              />{" "}
            </label>
            <label>
              Bank IFSC Code:{" "}
              <input
                type="text"
                name="bankIFSCCode"
                className="w-full border border-gray-400 p-1 mb-2"
                value={formData.bankIFSCCode || ""}
                onChange={handleChange}
              />{" "}
            </label>
          </div>
          <SaveButton />
        </form>
      </div>
    </>
  );
}

export default AddEmployee;
