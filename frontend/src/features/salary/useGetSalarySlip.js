import { useMutation } from "@tanstack/react-query";
import { getSalarySlip as getSalarySlipAPI } from "../../services/apiSalary";
import toast from "react-hot-toast";

export function useGetSalarySlip() {
  const { mutate: getSalarySlip, isLoading } = useMutation({
    mutationFn: ({ data }) => getSalarySlipAPI({ data }),
    onSuccess: (data) => {
        toast.success(data.message);
    },
    onError: (err) => {
        toast.error(err.message);
    },
  });

  return { getSalarySlip, isLoading };
}
