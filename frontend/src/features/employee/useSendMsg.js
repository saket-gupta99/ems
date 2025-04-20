import { useMutation } from "@tanstack/react-query";
import { sendMessage as sendMessageAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSendMsg() {
  const { mutate: sendMessage, isLoading } = useMutation({
    mutationFn: ({ data }) => sendMessageAPI({ data }),
    onSuccess: (data) => {
      toast.success(data.message || "Email sent");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to send Email!");
    },
  });

  return { sendMessage, isLoading };
}
