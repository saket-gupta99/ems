import { useMutation } from "@tanstack/react-query";
import { setAbsent as setAbsentAPI } from "../../services/apiAttendance";
import toast from "react-hot-toast";

export function useSetAbsent() {
  const { mutate: setAbsent, isLoading } = useMutation({
    mutationFn: ({ data }) => setAbsentAPI({ data }),
    onSuccess: () => {
      toast.success("set to absent");
    },
    onError: (err) => {
      toast.error(err.message || "checkout failed");
    },
  });

  return { setAbsent, isLoading };
}
