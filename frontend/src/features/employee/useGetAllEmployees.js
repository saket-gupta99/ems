import { useQuery } from "@tanstack/react-query";
import { getAllEmployees } from "../../services/apiEmployee";

export function useGetAllEmployees() {
  const { data: allEmployees, isLoading, refetch } = useQuery({
    queryKey: ["getEmployees"],
    queryFn: getAllEmployees,
  });

  return { allEmployees, isLoading, refetch };
}
