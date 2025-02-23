import { useEffect, useState } from "react";
import { useUser } from "../authentication/useUser";
import { formatDateToISO } from "../../utils/helper";
import SaveButton from "../../ui/SaveButton";
import { usePersonal } from "./usePersonal";
import FullScreenSpinner from "../../ui/FullScreenSpinner";

function PersonalTab() {
  const { user, isLoading } = useUser();
  const [formData, setFormData] = useState({
    dateOfBirth: "",
    bloodGroup: "",
    maritalStatus: "",
    gender: "",
    aadharNo: "",
    panNo: "",
  });
  const { personal, isLoading: isLoading2 } = usePersonal();
  const errors = {};

  useEffect(() => {
    if (user?.data?.personal) {
      setFormData({
        ...user.data.personal,
        dateOfBirth: user.data.personal.dateOfBirth
          ? formatDateToISO(user.data.personal.dateOfBirth)
          : "",
      });
    }
  }, [user]);

  function handleChange(e) {
    return setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (Object.keys(errors).length > 0) return;

    return personal({ data: formData });
  }

  if (isLoading || isLoading2 || !user?.data?.personal) {
    return <FullScreenSpinner />;
  }

  if (
    formData.maritalStatus &&
    !["unmarried", "married"].includes(formData.maritalStatus.toLowerCase())
  ) {
    errors.maritalStatus =
      "Invalid marital status. It can only be married or unmarried";
  }
  if (
    formData.bloodGroup &&
    !["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].includes(
      formData.bloodGroup.toUpperCase()
    )
  ) {
    errors.bloodGroup = "Invalid blood group";
  }
  if (formData.aadharNo && formData.aadharNo.toString().length !== 12) {
    errors.aadharNo = "Invalid aadhar no";
  }
  if (formData.panNo && formData.panNo.length !== 10) {
    errors.panNo = "Invalid pan no";
  }

  return (
    <form
      className="grid grid-cols-1 sm:grid-cols-2 sm:gap-5"
      onSubmit={handleSubmit}
    >
      <div>
        <label>
          Date of Birth*:{" "}
          <input
            type="date"
            name="dateOfBirth"
            className="w-full border border-gray-400 p-1 mb-2 disabled:bg-gray-200 disabled:cursor-not-allowed"
            value={formData.dateOfBirth || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Aadhar Number*:{" "}
          <input
            type="number"
            name="aadharNo"
            className="w-full border border-gray-400 p-1 mb-2"
            value={formData.aadharNo || ""}
            onChange={handleChange}
            required
          />
        </label>
        {errors.aadharNo && (
          <p className="block text-red-500">{errors.aadharNo}</p>
        )}
        <label>
          Pan Number:{" "}
          <input
            type="text"
            name="panNo"
            className="w-full border border-gray-400 p-1 mb-2 uppercase"
            value={formData.panNo || ""}
            onChange={handleChange}
          />
        </label>
        {errors.panNo && <p className="block text-red-500">{errors.panNo}</p>}
      </div>

      <div>
        <label className="w-full">
          {" "}
          Gender*:
          <div className="block w-full mb-4.5">
            {["male", "female", "other"].map((option) => (
              <label key={option} className="p-1 sm:px-3 w-full">
                <input
                  type="radio"
                  name="gender"
                  value={option}
                  checked={formData.gender === option}
                  onChange={handleChange}
                />
                {option}
              </label>
            ))}
          </div>
        </label>
        <label className="w-full">
          {" "}
          Blood Group*:
          <div className="block w-full mb-4.5">
            {["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-"].map(
              (option) => (
                <label key={option} className="p-1 sm:px-2 w-full">
                  <input
                    type="radio"
                    name="bloodGroup"
                    value={option}
                    checked={formData.bloodGroup === option}
                    onChange={handleChange}
                  />
                  {option}
                </label>
              )
            )}
          </div>
        </label>
        {errors.bloodGroup && (
          <p className="block text-red-500">{errors.bloodGroup}</p>
        )}
        <label className="w-full">
          {" "}
          Marital Status*:
          <div className="block w-full mb-4.5">
            {["married", "unmarried"].map((option) => (
              <label key={option} className="p-1 sm:px-3 w-full">
                <input
                  type="radio"
                  name="maritalStatus"
                  value={option}
                  checked={formData.maritalStatus === option}
                  onChange={handleChange}
                />
                {option}
              </label>
            ))}
          </div>
        </label>
        {errors.maritalStatus && (
          <p className="block text-red-500">{errors.maritalStatus}</p>
        )}
      </div>
      <SaveButton />
    </form>
  );
}

export default PersonalTab;
