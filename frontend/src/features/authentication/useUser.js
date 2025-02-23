import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    onError: (error) => {
      console.error(error);
    },
  });

  return {
    user,
    isLoading,
    error,
  };
}
