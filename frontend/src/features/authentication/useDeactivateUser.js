import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deacitvateEmployee as deactivateEmployeeAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useDeactivateUser() {
  const queryClient = useQueryClient();
  const { mutate: deacitvateEmployee, isLoading } = useMutation({
    mutationFn: ({ data }) => deactivateEmployeeAPI({ data }),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["getEmployees"]);
    },
    onError: (err) => toast.error(err.message),
  });

  return { deacitvateEmployee, isLoading };
}
