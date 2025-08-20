import { api } from "./api";

const getAvailableVehicle = async () => {
  try {
    const response = await api.get("/renter/available");
    console.log("avaialbe vehicile ----------->", response);
    return response.data;
  } catch (error) {
    console.error("error while fetching available vehicle", error);
    throw error;
  }
};

const bookVehicle = async ({ vehicleNumber, payload }) => {
  try {
    console.log("Payload -----------------_>", payload);
    const response = await api.post(
      `/renter/booking/${vehicleNumber}`,
      payload
    );
    console.log("resposne for booking -____________-->", response);
    return response;
  } catch (error) {
    console.error("Error while booking", error);
    throw error;
  }
};

export { getAvailableVehicle, bookVehicle };
