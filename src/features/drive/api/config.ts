import { HTTPMethods } from "@/shared/types/enums.ts";
import { RequestConfig } from "@/shared/types/index.ts";

export const ItemRootAllConfig: RequestConfig = {
    path: "/item/root/all",
    method: HTTPMethods.GET,
    params: ["ownerid"],
};

export const ItemSaveConfig: RequestConfig = {
    path: "/item/save",
    method: HTTPMethods.POST,
};

export const ItemDeleteConfig: RequestConfig = {
    path: "item/delete",
    method: HTTPMethods.DELETE,
    params: ["ownerid", "id"],
};
