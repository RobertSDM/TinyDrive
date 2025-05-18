import { HTTPMethods } from "../types/enums.ts";
import { RequestConfig } from "../types/index.ts";

export function AccountGet(id: string, accessToken: string): RequestConfig {
    return {
        path: `account/${id}`,
        method: HTTPMethods.GET,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
}
