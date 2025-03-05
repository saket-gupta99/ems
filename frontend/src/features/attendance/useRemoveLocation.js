import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeLocation as removeLocationAPI } from "../../services/apiLocation";
import toast from "react-hot-toast";

export function useRemoveLocation() {
  const queryClient = useQueryClient();
  const { mutate: removeLocation, isLoading } = useMutation({
    mutationFn: (id) => removeLocationAPI(id),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["getLocation"]);
    },
    onError: (err) => toast.error(err.message),
  });

  return { removeLocation, isLoading };
}
