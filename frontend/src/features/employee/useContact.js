import { useMutation } from "@tanstack/react-query";
import { getUserContactData } from "../../services/apiEmployee";
import toast from "react-hot-toast";

export function useContact() {
  const { mutate: contact, isLoading } = useMutation({
    mutationFn: ({ data }) => getUserContactData({ data }),
    onSuccess: (data) => {
      toast.success(data.message || "Personal user data updated successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Failed updating user's Personal data!");
    },
  });

  return { contact, isLoading };
}
