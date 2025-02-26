import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkOut as checkoutAPI } from "../../services/apiAttendance";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkOut, isLoading } = useMutation({
    mutationFn: ({ data }) => checkoutAPI({ data }),
    onSuccess: (data) => {
      toast.success(data.message || "checkout successfull");
      queryClient.invalidateQueries(["getAttendance"]);
    },
    onError: (err) => {
      toast.error(err.message || "checkout failed");
    },
  });

  return { checkOut, isLoading };
}
