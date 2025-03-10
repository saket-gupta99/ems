import { useUser } from "../authentication/useUser";
import { formatDateToISO } from "../../utils/helper";
import SaveButton from "../../ui/SaveButton";
import { useEffect, useState } from "react";
import { useGeneral } from "./useGeneral";
import validator from "validator";
import FullScreenSpinner from "../../ui/FullScreenSpinner";

function GeneralTab() {
  const { user, isLoading } = useUser();
  const [formData, setformData] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    reference: "",
    reasonForLeaving: "",
    designation: "",
    dateOfJoining: "",
    dateOfLeaving: "",
    role: "",
  });
  const { general, isLoading: isLoading2 } = useGeneral();
  const errors = {};

  useEffect(() => {
    if (user?.data?.general) {
      setformData({
        ...user.data.general,
        dateOfJoining: user.data.general.dateOfJoining
          ? formatDateToISO(user.data.general.dateOfJoining)
          : "",
        dateOfLeaving: user.data.general.dateOfLeaving
          ? formatDateToISO(user.data.general.dateOfLeaving)
          : "",
      });
    }
  }, [user]);

  function handleChange(e) {
    return setformData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);

    if (Object.keys(errors).length > 0) return;

    const {
      employeeId,
      phone,
      dateOfJoining,
      dateOfLeaving,
      reasonForLeaving,
      reference,
      designation,
    } = formData;

    return general({
      data: {
        employeeId,
        phone,
        dateOfJoining,
        dateOfLeaving,
        reasonForLeaving,
        reference,
        designation,
      },
    });
  }

  if (isLoading || isLoading2 || !user?.data?.general) {
    return <FullScreenSpinner />;
  }

  if (!validator.isMobilePhone(formData.phone, "en-IN")) {
    errors.phone = "Invalid phone";
  }

  return (
    <div className="min-h-screen">
      <form
        className="grid grid-cols-1 sm:grid-cols-2 sm:gap-5"
        onSubmit={handleSubmit}
      >
        <div>
          <label>
            Employee ID:{" "}
            <input
              type="text"
              name="employeeId"
              className="w-full border border-gray-400 p-1 mb-2 disabled:bg-gray-200 disabled:cursor-not-allowed"
              value={formData.employeeId || ""}
              disabled={true}
            />
          </label>
          <label>
            First Name:{" "}
            <input
              type="text"
              name="firstName"
              className="w-full border border-gray-400 p-1 mb-2 capitalize disabled:bg-gray-200 disabled:cursor-not-allowed"
              value={formData.firstName || ""}
              disabled={true}
            />
          </label>
          <label>
            Last Name:{" "}
            <input
              type="text"
              name="lastName"
              className="w-full border border-gray-400 p-1 mb-2 capitalize disabled:bg-gray-200 disabled:cursor-not-allowed"
              value={formData.lastName || ""}
              disabled={true}
            />
          </label>
          <label>
            Phone no:{" "}
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
        </div>

        <div>
          <label>
            Email ID:{" "}
            <input
              type="email"
              name="email"
              className="w-full border border-gray-400 p-1 mb-2 disabled:bg-gray-200 disabled:cursor-not-allowed"
              disabled={true}
              value={formData.email || ""}
            />
          </label>
          <label>
            Date of Joining:{" "}
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
            Date of Leaving:{" "}
            <input
              type="date"
              name="dateOfLeaving"
              className="w-full border border-gray-400 p-1 mb-2"
              value={formData.dateOfLeaving || ""}
              onChange={handleChange}
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
            Reason for leaving:{" "}
            <input
              type="text"
              name="reasonForLeaving"
              className="w-full border border-gray-400 p-1 mb-2"
              value={formData.reasonForLeaving || ""}
              onChange={handleChange}
            />{" "}
          </label>
          <div className="sm:mt-16">
            {formData.role === "admin" && <SaveButton />}
          </div>
        </div>
      </form>
    </div>
  );
}

export default GeneralTab;
