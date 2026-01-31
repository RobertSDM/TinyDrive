export const BackendURL: string = import.meta.env.VITE_BACKEND_URL;
export const SupabaseURL: string = import.meta.env.VITE_SUPABASE_URL;
export const SupabaseKey: string = import.meta.env.VITE_SUPABASE_KEY;
export const CookieTokenName: string = import.meta.env.VITE_TOKEN_NAME;
export const Mode: "prod" | "dev" = import.meta.env.VITE_MODE;

export const MaxDirDepth = 3;
export const MaxFileSize = 15 * 1024 * 1024; // 15Mbs
export const DelayToSearchContent = 150;
export const PaginationItemPerPage = 10;
