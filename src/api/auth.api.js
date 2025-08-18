import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

console.log("base url----------->", baseUrl);

const registerVehicleOwner = async (formData) => {
  try {
    const response = await axios.post(
      `${baseUrl}/vehicle/registerVehicleAndOwner`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("response ----------------------->", response);
    return response.data;
  } catch (error) {
    console.error("Error while registering vehilce&owner", error);
    throw error;
  }
};

const loginOwner = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/vehicle/ownerLogin`, data, {
      withCredentials: true,
    });
    console.log("login response ----------------------->", response.data);
    return response.data;
  } catch (error) {
    console.error("Error while logging the owner", error);
    throw error;
  }
};

const createRenter = async (data) => {
  try {
    console.log("renter data-------------------->", data);
    const response = await axios.post(`${baseUrl}/renter/createRenter`, data);
    console.log("renter crated ----------------->", response);
    return response.data;
  } catch (error) {
    console.error("Error while creating the renter", error);
    throw error;
  }
};

const loginRenter = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/renter/loginRenter`, data, {
      withCredentials: true,
    });
    console.log("login response ----------------------->", response.data);
    return response.data;
  } catch (error) {
    console.error("Error while logging the owner", error);
    throw error;
  }
};

export { registerVehicleOwner, loginOwner, createRenter, loginRenter };
