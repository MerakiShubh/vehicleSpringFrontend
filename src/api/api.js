import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;
const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const ownerToken = localStorage.getItem("owner_jwt");
  const renterToken = localStorage.getItem("renter_jwt");

  if (config.url.includes("/owner")) {
    config.headers.Authorization = `Bearer ${ownerToken}`;
  } else if (config.url.includes("/vehicle")) {
    config.headers.Authorization = `Bearer ${ownerToken}`;
  } else if (config.url.includes("/renter")) {
    config.headers.Authorization = `Bearer ${renterToken}`;
  }
  return config;
});

export { api };
