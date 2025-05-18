import { HTTPMethods } from "@/shared/types/enums.ts";
import { RequestConfig } from "@/shared/types/index.ts";

export function ItemUpdateNameConfig(id: string): RequestConfig {
    return {
        path: `/item/update/${id}/name`,
        method: HTTPMethods.PUT,
    };
}

export function ItemSaveConfig(): RequestConfig {
    return { path: "/item/save", method: HTTPMethods.POST };
}

export function ItemDeleteConfig(ownerid: string, id: string): RequestConfig {
    return { path: `item/delete/${ownerid}/${id}`, method: HTTPMethods.DELETE };
}

export function ItemAllFromFolder(
    ownerid: string,
    parentid: string | null,
    accessToken: string
): RequestConfig {
    return {
        path: `/item/all/${ownerid}/${parentid}`,
        method: HTTPMethods.GET,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
}

export function ItemById(
    userid: string,
    id: string,
    accessToken: string
): RequestConfig {
    return {
        path: `/item/${userid}/${id}`,
        method: HTTPMethods.GET,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
}
