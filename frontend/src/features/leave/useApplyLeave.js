import { useMutation } from "@tanstack/react-query";
import { applyLeave as applyLeaveAPI } from "../../services/apiLeave";
import toast from "react-hot-toast";

export function useApplyLeave() {
  const { mutate: applyLeave, isLoading } = useMutation({
    mutationFn: ({ data }) => applyLeaveAPI({ data }),
    onSuccess: () => {
      toast.success("Leave applied");
    },
    onError: (err) => {
      toast.error(err.message || "Applying leave failed!");
    },
  });

  return { applyLeave, isLoading };
}
