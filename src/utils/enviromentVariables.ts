import axios from "axios";

// Enviroment variables
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const VITE_URL = import.meta.env.VITE_URL || "http://localhost:5173";
export const beAPI = axios.create({
    baseURL: BACKEND_URL,
});

/// Settings variables
export const MAX_DIR_DEPTH = 3;
export const MAX_FILE_SIZE = 15_000_000; // MBs
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const DELAY_TO_SEARCH_CONTENT = 200;
// Pagination
export const ITEMS_PER_PAGE = 8;
