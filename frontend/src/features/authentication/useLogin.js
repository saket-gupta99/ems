import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { login as loginAPI } from "../../services/apiAuth";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),
    onSuccess: (user) => {
      toast.success(user.message);
      queryClient.setQueryData(["user"], user.data);
      navigate("/profile", { replace: true });
    },
    onError: (err) => {
      toast.error(
        err.message || "Provided email/employee id or password is incorrect"
      );
    },
  });

  return { login, isLoading };
}
