import { useMutation } from "@tanstack/react-query";
import { verifyOTP as verifyOtpAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useVerifyOtp() {
  const navigate = useNavigate();

  const { mutate: verifyOtp, isLoading } = useMutation({
    mutationFn: ({ data }) => verifyOtpAPI({ data }),
    onSuccess: (data) => {
      toast.success(data.message || "verified otp. Now set your password");
      if (!data.isForgotPassword) navigate("/set-password", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message || "failed verifying otp");
    },
  });

  return { verifyOtp, isLoading };
}
