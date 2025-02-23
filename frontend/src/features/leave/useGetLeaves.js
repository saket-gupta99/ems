import { useQuery } from "@tanstack/react-query";
import { getLeaves as getLeavesAPI } from "../../services/apiLeave";

export function useGetLeaves() {
  const { data: getLeaves, isLoading } = useQuery({
    queryKey: ["getLeaves"],
    queryFn: getLeavesAPI,
  });

  return { getLeaves, isLoading };
}
