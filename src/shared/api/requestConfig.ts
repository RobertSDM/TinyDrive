import { HTTPMethods } from "../types/enums.ts";
import { RequestConfig } from "../types/types.ts";

export function GetAccountConfig(
    id: string,
    accessToken: string
): RequestConfig {
    return {
        path: `account/${id}`,
        method: HTTPMethods.GET,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
}
