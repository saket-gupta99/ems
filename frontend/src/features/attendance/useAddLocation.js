import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLocation as addLocationAPI } from "../../services/apiLocation";
import toast from "react-hot-toast";

export function useAddLocation() {
  const queryClient = useQueryClient();
  const { mutate: addLocation, isLoading } = useMutation({
    mutationFn: ({ data }) => addLocationAPI({ data }),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["getLocation"]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { addLocation, isLoading };
}
