import { useQuery } from "@tanstack/react-query";
import { getOwnerVehicles } from "../api/owner.api";
export const useOwnerGetVehiclesQuery = () => {
  return useQuery({
    queryKey: ["ownerVehicles"],
    queryFn: getOwnerVehicles,
  });
};
