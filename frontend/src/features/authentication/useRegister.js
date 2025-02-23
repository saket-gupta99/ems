import { useMutation } from "@tanstack/react-query";
import { register as registerAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useRegister() {
  const { mutate: register, isLoading } = useMutation({
    mutationFn: ({ data }) => registerAPI({ data }),
    onSuccess: (data) => {
      toast.success(data.message || "OTP sent to your email");
    },
    onError: (err) => {
      toast.error(err.message || "failed to register");
    },
  });

  return { register, isLoading };
}
