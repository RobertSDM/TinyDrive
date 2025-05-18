// Enviroment variables
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
export const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

// JWT Token
export const TOKEN_NAME = import.meta.env.VITE_TOKEN_NAME;

/// Settings variables
export const MAX_DIR_DEPTH = 3;
export const MAX_FILE_SIZE = 15_000_000; // MBs
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const DELAY_TO_SEARCH_CONTENT = 150;

// Pagination
export const PAGINATION_ITEMS_PER_PAGE = 10;
