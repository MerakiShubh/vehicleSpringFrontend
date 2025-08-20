import { useMutation, useQuery } from "@tanstack/react-query";
import { bookVehicle, getAvailableVehicle } from "../api/renter.api";

export const useGetAvailableVehicleQuery = () => {
  return useQuery({
    queryKey: ["availableVehicle"],
    queryFn: getAvailableVehicle,
  });
};

export const useBookVehicleMutation = () => {
  return useMutation({
    mutationFn: bookVehicle,
    onSuccess: (data) => {
      console.log("renter creation success:", data);
    },
    onError: (error) => {
      console.error("renter creation failed:", error);
      throw error;
    },
  });
};
