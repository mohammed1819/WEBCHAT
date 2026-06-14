import axios from "axios";

const rawApiBase =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001"
    : import.meta.env.VITE_API_URL || "https://webchat-4fs4.onrender.com";

const apiBase = rawApiBase.replace(/\/api\/?$/, "").replace(/\/$/, "") + "/api";

export const axiosInstance = axios.create({
  baseURL: apiBase,
  withCredentials: true,
});
