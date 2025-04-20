import { useMutation } from "@tanstack/react-query";
import { resetPassword as resetPasswordAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useResetPassword() {
  const { mutate: resetPassword, isLoading } = useMutation({
    mutationFn: ({ data }) => resetPasswordAPI({ data }),
    onSuccess: (data) => toast.success(data.message),
    onError: (err) => toast.error(err.message),
  });

  return { resetPassword, isLoading };
}
