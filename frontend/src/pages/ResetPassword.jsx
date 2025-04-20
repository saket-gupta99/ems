import { useState } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import validator from "validator";
import SaveButton from "../ui/SaveButton";
import { useResetPassword } from "../features/authentication/useResetPassword";
import FullScreenSpinner from "../ui/FullScreenSpinner";

function ResetPassword() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });
  const { resetPassword, isLoading } = useResetPassword();

  function handleChange(e) {
    return setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  }

  if (isLoading) return <FullScreenSpinner />;

  const errors = {};

  if (formData.password && !validator.isStrongPassword(formData.password)) {
    errors.password = "Enter new password";
  }
  if (formData.password && formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Enter old password";
  }

  function handleSubmit(e) {
    e.preventDefault();
    resetPassword(
      { data: formData },
      {
        onSuccess: () =>
          setFormData({
            oldPassword: "",
            password: "",
            confirmPassword: "",
          }),
      }
    );
  }

  return (
    <>
      <h1 className="flex font-semibold gap-3 text-lg sm:text-xl sm:p-3 p-2 w-full shadow-xl items-center">
        <RiLockPasswordFill className="h-10 w-10 sm:h-8 sm:w-8" /> Reset
        Password
      </h1>
      <div className="w-full grid grid-cols-3 p-5 shadow-2xl min-h-dvh">
        <form
          className="col-start-1 col-end-4 sm:col-start-2 sm:col-end-3"
          onSubmit={handleSubmit}
        >
          <label>
            Old Password*:{" "}
            <input
              type="password"
              name="oldPassword"
              className="w-full border border-gray-400 p-1 mb-2"
              value={formData.oldPassword || ""}
              onChange={handleChange}
              required
            />{" "}
          </label>

          <label>
            New Password*:{" "}
            <input
              type="password"
              name="password"
              className="w-full border border-gray-400 p-1 mb-2"
              value={formData.password || ""}
              onChange={handleChange}
              required
            />{" "}
            {errors?.password && (
              <p className="block text-red-500">{errors.password}</p>
            )}
          </label>

          <label>
            Confirm Password*:{" "}
            <input
              type="password"
              name="confirmPassword"
              className="w-full border border-gray-400 p-1 mb-2"
              value={formData.confirmPassword || ""}
              onChange={handleChange}
              required
            />{" "}
            {errors?.confirmPassword && (
              <p className="block text-red-500">{errors.confirmPassword}</p>
            )}
          </label>

          <SaveButton />
        </form>
      </div>
    </>
  );
}

export default ResetPassword;
