import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteVehicle,
  getOwnerVehicles,
  updateOwnerVehicle,
} from "../api/owner.api";
export const useOwnerGetVehiclesQuery = () => {
  return useQuery({
    queryKey: ["ownerVehicles"],
    queryFn: getOwnerVehicles,
  });
};

export const useUpdateOwnerVehicleMutation = () => {
  return useMutation({
    mutationFn: updateOwnerVehicle,
    onSuccess: (data) => {
      console.log("renter creation success:", data);
    },
    onError: (error) => {
      console.error("renter creation failed:", error);
      throw error;
    },
  });
};

export const useDeleteOwnerVehicleMutaion = () => {
  return useMutation({
    mutationFn: deleteVehicle,
    onSuccess: (data) => {
      console.log("renter creation success:", data);
    },
    onError: (error) => {
      console.error("renter creation failed:", error);
      throw error;
    },
  });
};
