import { useQuery } from "@tanstack/react-query";
import { getSalaryData as getSalaryDataAPI } from "../../services/apiSalary";

export function useGetSalaryData() {
  const { data: getSalaryData, isLoading } = useQuery({
    queryKey: ["getSalary"],
    queryFn: getSalaryDataAPI,
  });

  return { getSalaryData, isLoading };
}
