import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkIn as checkinAPI } from "../../services/apiAttendance";
import toast from "react-hot-toast";

export function useCheckin() {
  const queryClient = useQueryClient();

  const { mutate: checkIn, isLoading } = useMutation({
    mutationFn: ({ data }) => checkinAPI({ data }),
    onSuccess: () => {
      toast.success("Attendance for today taken");
      queryClient.invalidateQueries(["getAttendance"]);
    },
    onError: (err) => {
      toast.error(err.message || "Error taking attendance!");
    },
  });

  return { checkIn, isLoading };
}
