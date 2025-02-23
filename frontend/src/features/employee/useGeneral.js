import { useMutation } from "@tanstack/react-query";
import { getUserGeneralData } from "../../services/apiEmployee";
import toast from "react-hot-toast";

export function useGeneral() {
  const {
    mutate: general,
    isLoading,
    error,
  } = useMutation({
    mutationFn: ({ data }) => getUserGeneralData({ data }),
    onSuccess: () => {
      toast.success("General data updated successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Updating user's general data Failed!");
    },
  });

  return { general, isLoading, error };
}
