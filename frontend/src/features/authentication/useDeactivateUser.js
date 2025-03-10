import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deacitvateEmployee as deactivateEmployeeAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useDeactivateUser() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deactivateEmployee, isLoading } = useMutation({
    mutationFn: ({ data }) => deactivateEmployeeAPI({ data }),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["getEmployees"]);
      navigate(-1, { replace: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deactivateEmployee, isLoading };
}
