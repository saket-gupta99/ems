import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editEmployeeLocation as editEmployeeLocationAPI } from "../../services/apiLocation";
import toast from "react-hot-toast";

export function useEditEmployeeLocation() {
  const queryClient = useQueryClient();
  const { mutate: editEmployeeLocation, isLoading } = useMutation({
    mutationFn: ({ data }) => editEmployeeLocationAPI({ data }),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["getLocation"]);
    },
    onError: (err) => toast.error(err.message),
  });

  return { editEmployeeLocation, isLoading };
}
