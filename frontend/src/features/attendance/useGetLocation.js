import { useQuery } from "@tanstack/react-query";
import { getLocations as getLocationsAPI } from "../../services/apiLocation";

export function useGetLocation() {
  const { data: getLocation, isLoading } = useQuery({
    queryKey: ["getLocation"],
    queryFn: getLocationsAPI,
  });

  return { getLocation, isLoading };
}
