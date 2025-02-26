import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout as logoutAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.removeQueries();
      navigate("/home", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message || "Error logging out!");
    },
  });

  return { logout, isLoading };
}
