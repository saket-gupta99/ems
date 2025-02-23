import { useMutation } from "@tanstack/react-query";
import { getUserPersonalData } from "../../services/apiEmployee";
import toast from "react-hot-toast";

export function usePersonal() {
  const { mutate: personal, isLoading } = useMutation({
    mutationFn: ({ data }) => getUserPersonalData({ data }),
    onSuccess: () => {
      toast.success("Personal user data updated successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Failed updating user's Personal data!");
    },
  });

  return { personal, isLoading };
}
