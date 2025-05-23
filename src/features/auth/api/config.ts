import { HTTPMethods } from "@/shared/types/enums.ts";
import { RequestConfig } from "@/shared/types/index.ts";

export function registerConfig(): RequestConfig {
    return { path: "/auth/register", method: HTTPMethods.POST };
}

