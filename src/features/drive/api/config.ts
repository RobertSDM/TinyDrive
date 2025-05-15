import { HTTPMethods } from "@/shared/types/enums.ts";
import { RequestConfig } from "@/shared/types/index.ts";

// export const ItemRootAllConfig: RequestConfig = {
//     path: "/item/all",
//     method: HTTPMethods.GET,
// };

export function ItemUpdateNameConfig(id: number): RequestConfig {
    return {
        path: `/item/update/${id}/name`,
        method: HTTPMethods.PUT,
    };
}

export const ItemSaveConfig: RequestConfig = {
    path: "/item/save",
    method: HTTPMethods.POST,
};

export const ItemDeleteConfig: RequestConfig = {
    path: "item/delete",
    method: HTTPMethods.DELETE,
};

export const ItemAllFromFolder: RequestConfig = {
    path: "/item/all",
    method: HTTPMethods.GET,
};

export const ItemById: RequestConfig = {
    path: "/item",
    method: HTTPMethods.GET,
};
