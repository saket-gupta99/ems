import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getBankDetails } from "../../services/apiEmployee";
import toast from "react-hot-toast";

export function useBankDetails() {
    const queryClient = useQueryClient();
  const { mutate: bankDetails, isLoading } = useMutation({
    mutationFn: ({ data }) => getBankDetails({ data }),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["getEmployees"]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { bankDetails, isLoading };
}
