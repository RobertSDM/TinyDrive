import axios from "axios";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const VITE_URL = import.meta.env.VITE_URL || "http://localhost:5173";

axios.defaults.withCredentials = true;
export const beAPI = axios.create({
    baseURL: BACKEND_URL
});
