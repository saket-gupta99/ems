import { useState } from "react";
import { useRegister } from "./useRegister";
import { useVerifyOtp } from "./useVerifyOtp";
import FullScreenSpinner from "../../ui/FullScreenSpinner";
import toast from "react-hot-toast";

function Register() {
  const [formData, setFormData] = useState({
    employeeId: "",
    email: "",
    otp: "",
  });
  const [allowOTP, setAllowOTP] = useState(false);
  const { register, isLoading } = useRegister();
  const { verifyOtp, isLoading: isLoading2 } = useVerifyOtp();

  if (isLoading || isLoading2) return <FullScreenSpinner />;

  function handleGetOtp() {
    if (!formData.employeeId || !formData.email)
      return toast.error("Enter employeeId and email both");

    register(
      {
        data: { employeeId: formData.employeeId, email: formData.email },
      },
      {
        onSuccess: () => {
          setAllowOTP(true);
        },
      }
    );
  }

  function handleVerifyOtp() {
    if (!formData.otp || !formData.email) {
      return toast.error("Enter otp or email");
    }

    verifyOtp({ data: { otp: formData.otp, email: formData.email } });
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div className="flex flex-col gap-2 m-2 w-full">
      <input
        type="text"
        placeholder="Enter your Employee ID"
        className="border border-gray-400 rounded-sm p-0.5 sm:p-1"
        name="employeeId"
        value={formData.employeeId.toUpperCase() || ""}
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder="Enter your email"
        className="border border-gray-400 rounded-sm p-0.5 sm:p-1"
        name="email"
        value={formData.email || ""}
        onChange={handleChange}
      />
      {allowOTP && (
        <input
          type="text"
          className="border border-gray-400 rounded-sm p-0.5 sm:p-1"
          placeholder="Enter OTP"
          name="otp"
          value={formData.otp || ""}
          onChange={handleChange}
        />
      )}
      {!allowOTP ? (
        <button
          className="p-1 text-base xs:text-xl bg-black text-white rounded-sm mt-3 hover:cursor-pointer hover:bg-gray-800 font-semibold"
          onClick={handleGetOtp}
        >
          Get OTP
        </button>
      ) : (
        <button
          className="p-1 text-base xs:text-xl bg-black text-white rounded-sm mt-3 hover:cursor-pointer hover:bg-gray-800 font-semibold"
          onClick={handleVerifyOtp}
        >
          Register
        </button>
      )}
    </div>
  );
}

export default Register;
