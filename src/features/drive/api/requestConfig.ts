import { HTTPMethods } from "@/shared/types/enums.ts";
import { RequestConfig } from "@/shared/types/types.ts";

export function ItemDownloadConfig(
    ownerid: string,
    id: string,
    accessToken: string
): RequestConfig {
    return {
        path: `/item/download/${ownerid}/${id}`,
        method: HTTPMethods.GET,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
}

export function BreadcrumbConfig(
    ownerid: string,
    parentid: string,
    accessToken: string
): RequestConfig {
    return {
        path: `/item/breadcrumb/${ownerid}/${parentid}`,
        method: HTTPMethods.GET,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
}

export function ItemImagePreviewConfig(
    ownerid: string,
    id: string,
    accessToken: string
): RequestConfig {
    return {
        path: `item/preview/img/${ownerid}/${id}`,
        method: HTTPMethods.GET,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
}

export function ItemSearch(
    ownerid: string,
    query: string,
    accessToken: string,
    type: string | null
): RequestConfig {
    return {
        path: `item/search/${ownerid}?q=${query}&${type ? `type=${type}` : ""}`,
        method: HTTPMethods.GET,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
}

export function ItemDownloadFolderConfig(
    ownerid: string,
    parentid: string,
    accessToken: string
): RequestConfig {
    return {
        path: `item/download/folder/${ownerid}/${parentid}`,
        method: HTTPMethods.GET,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        blob: true,
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
    accessToken: string
): RequestConfig {
    return {
        path: `item/delete/${ownerid}`,
        method: HTTPMethods.DELETE,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
}

export function ItemAllFromFolder(
    ownerid: string,
    parentid: string | null,
    accessToken: string,
    page: number = 1
): RequestConfig {
    return {
        path: `/item/all/${ownerid}/${parentid}?p=${page}`,
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
