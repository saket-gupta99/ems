import { useMutation } from "@tanstack/react-query";
import { setPassword as setPasswordAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSetPassword() {
  const navigate = useNavigate();

  const { mutate: setPassword, isLoading } = useMutation({
    mutationFn: ({ data }) => setPasswordAPI({ data }),
    onSuccess: (data) => {
      toast.success(data.message || "password set successfully");
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message || "failed to set password");
    },
  });

  return { setPassword, isLoading };
}
