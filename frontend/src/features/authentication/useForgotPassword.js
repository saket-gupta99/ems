import { useMutation } from "@tanstack/react-query";
import { forgotPassword as forgotPasswordAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useForgotPassword() {
  const { mutate: forgotPassword, isLoading } = useMutation({
    mutationFn: ({ data }) => forgotPasswordAPI({ data }),
    onSuccess: (data) => toast.success(data.message),
    onError: (err) => toast.error(err.message),
  });

  return { forgotPassword, isLoading };
}
