import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadFile as uploadFileAPI } from "../../services/apiEmployee";
import toast from "react-hot-toast";

export function useAttachment() {
  const queryClient = useQueryClient();
  const {
    mutate: attachFile,
    isLoading,
    isPending,
  } = useMutation({
    mutationFn: ({ data }) => uploadFileAPI({ data }),
    onSuccess: () => {
      toast.success("File/Image uploaded successfully");
      queryClient.invalidateQueries(["user"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to upload file");
    },
  });

  return { attachFile, isLoading, isPending };
}
