import { RequestConfig, HTTPMethods } from "@/types.ts";

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





