import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const VITE_URL = import.meta.env.VITE_URL || "http://localhost:5173"

export const beAPI = axios.create({
    baseURL: BACKEND_URL
})
