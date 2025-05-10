import { HTTPMethods } from "@/shared/types/enums.ts";
import { RequestConfig } from "@/shared/types/index.ts";

export const ItemRootAllConfig: RequestConfig = {
    path: "/item/root/all/",
    method: HTTPMethods.GET,
};

export const ItemCreateConfig: RequestConfig = {
    path: "/item/save",
    method: HTTPMethods.POST,
};
