import { HTTPMethods } from "@/shared/types/enums.ts";
import { RequestConfig } from "@/shared/types/index.ts";

export const registerConfig: RequestConfig = {
    path: "/auth/register",
    method: HTTPMethods.POST,
};
export const loginConfig: RequestConfig = {
    path: "/auth/login",
    method: HTTPMethods.POST,
};
