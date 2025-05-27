import { ProjectMode } from "../types/enums.ts";

export const BackendUrl = import.meta.env.VITE_BACKEND_URL;
export const SupabaseUrl = import.meta.env.VITE_SUPABASE_URL;
export const SupabaseKey = import.meta.env.VITE_SUPABASE_KEY;
export const TokenName = import.meta.env.VITE_TOKEN_NAME;
export const Mode: ProjectMode = import.meta.env.VITE_MODE
