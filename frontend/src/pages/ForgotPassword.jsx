import { useState } from "react";
import { TbLockPassword } from "react-icons/tb";
import toast from "react-hot-toast";
import { useForgotPassword } from "../features/authentication/useForgotPassword";
import { useVerifyOtp } from "../features/authentication/useVerifyOtp";
import FullScreenSpinner from "../ui/FullScreenSpinner";
import { useSetPassword } from "../features/authentication/useSetPassword";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [formData, setFormData] = useState({
    employeeId: "",
    email: "",
    otp: "",
    forgotPassword: true,
    password: "",
    confirmPassword: "",
  });
  const [allowOtp, setAllowOtp] = useState(false);
  const [isSettingPassword, setIsSettingPassword] = useState(false);
  const { forgotPassword, isLoading } = useForgotPassword();
  const { verifyOtp, isLoading: isLoading2 } = useVerifyOtp();
  const { setPassword, isLoading: isLoading3 } = useSetPassword();
  const navigate = useNavigate();

  if (isLoading || isLoading2 || isLoading3) return <FullScreenSpinner />;

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleGetOtp() {
    if (!formData.email || !formData.employeeId)
      return toast.error("Enter all fields");

    forgotPassword(
      { data: formData },
      {
        onSuccess: () => {
          setAllowOtp(true);
        },
      }
    );
  }

  function handleVerifyOtp() {
    if (!formData.otp || !formData.email)
      return toast.error("Enter all fields");

    verifyOtp(
      { data: { ...formData, isForgotPassword: true } },
      {
        onSuccess: () => setIsSettingPassword(true),
      }
    );
  }

  function handleSubmitPassword() {
    if (!formData.email || !formData.password || !formData.confirmPassword)
      return toast.error("All fields required");

    setPassword(
      { data: formData },
      {
        onSuccess: () => {
          toast.success("Now login with your new password");
          navigate("/login");
        },
      }
    );
  }

  return (
    <>
      <h1 className="flex font-semibold gap-3 text-lg sm:text-xl sm:p-3 p-2 w-full shadow-xl items-center">
        <TbLockPassword className="h-10 w-10 sm:h-8 sm:w-8" /> Forgot Password
      </h1>

      <h3 className="font-semibold text-center mt-10 text-xl">
        Enter your Provided Employee ID and email registered with us
      </h3>
      <div className="w-full grid grid-cols-3 p-5 shadow-2xl min-h-dvh">
        <div className="col-start-1 col-end-4 sm:col-start-2 sm:col-end-3">
          <label>
            Employee ID*:{" "}
            <input
              type="text"
              name="employeeId"
              className="w-full border border-gray-400 p-1 mb-2"
              value={formData.employeeId.toUpperCase() || ""}
              onChange={handleChange}
              required
            />{" "}
          </label>
          <label>
            Email ID*:{" "}
            <input
              type="text"
              name="email"
              className="w-full border border-gray-400 p-1 mb-2"
              value={formData.email || ""}
              onChange={handleChange}
              required
            />{" "}
          </label>

          {allowOtp && !isSettingPassword && (
            <label>
              OTP*:
              <input
                type="text"
                className="border border-gray-400 rounded-sm p-0.5 sm:p-1"
                placeholder="Enter OTP"
                name="otp"
                value={formData.otp || ""}
                onChange={handleChange}
              />
            </label>
          )}

          {!allowOtp && !isSettingPassword ? (
            <button
              className="p-1 text-base xs:text-xl bg-black text-white rounded-sm mt-3 hover:cursor-pointer hover:bg-gray-800 font-semibold"
              onClick={handleGetOtp}
            >
              Get OTP
            </button>
          ) : (
            !isSettingPassword && (
              <button
                className="p-1 text-base xs:text-xl bg-black text-white rounded-sm mt-3 hover:cursor-pointer hover:bg-gray-800 font-semibold"
                onClick={handleVerifyOtp}
              >
                Verify
              </button>
            )
          )}

          {isSettingPassword && (
            <>
              <label>
                Enter Password:
                <input
                  type="password"
                  placeholder="Enter password"
                  className="border border-gray-400 rounded-sm p-0.5 sm:p-1 w-full"
                  name="password"
                  value={formData.password || ""}
                  onChange={handleChange}
                />
              </label>
              <label>
                Confirm Password:
                <input
                  type="password"
                  placeholder="Enter confirm password"
                  className="border border-gray-400 rounded-sm p-0.5 sm:p-1 w-full"
                  name="confirmPassword"
                  value={formData.confirmPassword || ""}
                  onChange={handleChange}
                />
              </label>

              <button
                className="p-1 text-base xs:text-xl bg-black text-white rounded-sm mt-3 hover:cursor-pointer hover:bg-gray-800 font-semibold"
                onClick={handleSubmitPassword}
              >
                Submit
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
