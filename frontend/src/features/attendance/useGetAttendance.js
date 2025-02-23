import { useQuery } from "@tanstack/react-query";
import { getAttendance as getAttendanceAPI } from "../../services/apiAttendance";

export function useGetAttendance() {
  const { data: getAttendance, isLoading } = useQuery({
    queryKey: ["getAttendance"],
    queryFn: getAttendanceAPI,
  });

  return { getAttendance, isLoading };
}
