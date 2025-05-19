import { HTTPMethods } from "@/shared/types/enums.ts";
import { RequestConfig } from "@/shared/types/index.ts";

export function ItemDownload(
    ownerid: string,
    id: string,
    accessToken: string
): RequestConfig {
    return {
        path: `item/download/${ownerid}/${id}`,
        method: HTTPMethods.GET,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
}

export function ItemSaveFolderConfig(accessToken: string): RequestConfig {
    return {
        path: "/item/save/folder",
        method: HTTPMethods.POST,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
}

export function ItemUpdateNameConfig(
    id: string,
    ownerid: string,
    accessToken: string
): RequestConfig {
    return {
        path: `/item/update/${ownerid}/${id}/name`,
        method: HTTPMethods.PUT,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
}

export function ItemSaveConfig(accessToken: string): RequestConfig {
    return {
        path: "/item/save",
        method: HTTPMethods.POST,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
        },
    };
}

export function ItemDeleteConfig(
    ownerid: string,
    id: string,
    accessToken: string
): RequestConfig {
    return {
        path: `item/delete/${ownerid}/${id}`,
        method: HTTPMethods.DELETE,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
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
