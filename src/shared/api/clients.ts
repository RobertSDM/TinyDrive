import axios from "axios";
import { BACKEND_URL } from "@/shared/utils/globalVariables.ts";

export const DefaultClient = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});
