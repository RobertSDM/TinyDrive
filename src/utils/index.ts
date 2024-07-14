import axios from "axios";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const VITE_URL = import.meta.env.VITE_URL || "http://localhost:5173";

export const beAPI = axios.create({
    baseURL: BACKEND_URL,
});

// Setting variables
export const MAX_DIR_DEPTH = 3;
export const MAX_FILE_SIZE = 5_000_000; // MBs
