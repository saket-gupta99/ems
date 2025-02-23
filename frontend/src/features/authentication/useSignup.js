import { useMutation } from "@tanstack/react-query";
import { signup as signupAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ data }) => signupAPI({ data }),
    onSuccess: () => {
      toast.success("Added employee successfully!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to add an employee");
    },
  });

  return { signup, isLoading };
}
