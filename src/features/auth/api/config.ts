import { RequestConfig } from "@/shared/types/types.ts";

export const registerConfig: RequestConfig = {
    path: "/auth/register",
    method: "POST",
};
export const loginConfig: RequestConfig = {
    path: "/auth/login",
    method: "POST",
};
