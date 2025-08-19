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

export { getOwnerVehicles };
