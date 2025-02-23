import { useQuery } from "@tanstack/react-query";
import { getLeaveById as getLeaveByIdAPI } from "../../services/apiLeave";

export function useGetLeaveById(employeeId) {
  const { data: getLeaveById, isLoading } = useQuery({
    queryKey: ["getLeaveById", employeeId],
    queryFn: () => getLeaveByIdAPI(employeeId),
    enabled: !!employeeId,
  });

  return { getLeaveById, isLoading };
}
