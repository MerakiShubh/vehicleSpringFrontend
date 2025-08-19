import { api } from "./api";

const getOwnerVehicles = async () => {
  try {
    console.log("api key value pair---->", api.interceptors.request);
    const response = await api.get("/vehicle/getVehicles");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateOwnerVehicle = async (data) => {
  try {
    console.log("Update vehicle -----------_", data);
    const response = await api.put(
      `/vehicle/updateVehicle/${data.vehicleNumber}`,
      data
    );
    console.log("update response --------------------->", response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteVehicle = async (vehicleNumber) => {
  try {
    await api.delete(`/vehicle/delete/${vehicleNumber}`);
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete vehicle");
  }
};

export { getOwnerVehicles, updateOwnerVehicle, deleteVehicle };
