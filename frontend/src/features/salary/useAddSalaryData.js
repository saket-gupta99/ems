import { useMutation } from "@tanstack/react-query";
import { addSalaryData as addSalaryDataAPI } from "../../services/apiSalary";
import toast from "react-hot-toast";

export function useAddSalaryData() {
  const { mutate: addSalaryData, isLoading } = useMutation({
    mutationFn: ({ data }) => addSalaryDataAPI({ data }),
    onSuccess: (data) => {
      toast.success(data.message || "added salary data successfully");
    },
    onError: (err) => {
      toast.error(err.message || "salary adding failed");
    },
  });
  
  return { addSalaryData, isLoading };
}
