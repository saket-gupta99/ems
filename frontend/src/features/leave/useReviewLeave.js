import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewLeave as reviewLeaveAPI } from "../../services/apiLeave";
import toast from "react-hot-toast";

export function useReviewLeave() {
  const queryClient = useQueryClient();
  const { mutate: reviewLeave, isLoading } = useMutation({
    mutationFn: ({ data }) => reviewLeaveAPI({ data }),
    onSuccess: () => {
      toast.success("Leave reviewed successfully");
      queryClient.invalidateQueries(["getLeaves"])
    },
    onError: (err) => {
      toast.error(err.message || "Leave review failed");
    },
  });

  return { reviewLeave, isLoading };
}
