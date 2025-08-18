import { mutationOptions, useMutation } from "@tanstack/react-query";
import {
  registerVehicleOwner,
  loginOwner,
  createRenter,
  loginRenter,
} from "../api/auth.api";
import RenterLogin from "../components/RenterLogin";

export const useRegisterVehicleOwnerMutation = () => {
  return useMutation({
    mutationFn: registerVehicleOwner,
    onSuccess: (data) => {
      console.log("owner&vehicle account success:", data);
    },
    onError: (error) => {
      console.error("owner&vehicle account failed:", error);
    },
  });
};

export const useOwnerLoginMutation = () => {
  return useMutation({
    mutationFn: loginOwner,
    onSuccess: (data) => {
      console.log("owner Login success:", data);
      if (data.jwt) {
        localStorage.setItem("owner_jwt", data.jwt);
        localStorage.setItem("owner_id", data.id);
      }
    },
    onError: (error) => {
      console.error("owner Login failed:", error);
      throw error;
    },
  });
};

export const useCreateRenterMutation = () => {
  return useMutation({
    mutationFn: createRenter,
    onSuccess: (data) => {
      console.log("renter creation success:", data);
    },
    onError: (error) => {
      console.error("renter creation failed:", error);
      throw error;
    },
  });
};

export const useLoginRenterMutation = () => {
  return useMutation({
    mutationFn: loginRenter,
    onSuccess: (data) => {
      console.log("renter login success:", data);
      if (data.jwt) {
        localStorage.setItem("renter_jwt", data.jwt);
        localStorage.setItem("renter_id", data.id);
      }
    },
    onError: (error) => {
      console.error("renter login failed:", error);
      throw error;
    },
  });
};
