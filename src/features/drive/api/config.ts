import { HTTPMethods } from "@/shared/types/enums.ts";
import { RequestConfig } from "@/shared/types/index.ts";

export const ItemConfig: RequestConfig = {
    path: "/item/root/all/",
    method: HTTPMethods.GET,
};
