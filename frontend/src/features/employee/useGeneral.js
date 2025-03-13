import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserGeneralData } from "../../services/apiEmployee";
import toast from "react-hot-toast";

export function useGeneral() {
  const queryClient = useQueryClient();
  const {
    mutate: general,
    isLoading,
    error,
  } = useMutation({
    mutationFn: ({ data }) => getUserGeneralData({ data }),
    onSuccess: (data) => {
      toast.success(data.message || "General data updated successfully");
      queryClient.invalidateQueries(["getEmployees"]);
    },
    onError: (err) => {
      toast.error(err.message || "Updating user's general data Failed!");
    },
  });

  return { general, isLoading, error };
}
