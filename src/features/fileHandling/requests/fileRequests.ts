import {
    HTTPMethods,
    Item,
    ListItemResponse,
    SingleItemResponse,
} from "@/types.ts";
import { axiosClient } from "@/lib/axios.ts";

export async function deleteFolderById(userid: string, body: Object) {
    const resp = await axiosClient({
        url: `item/delete/${userid}`,
        method: HTTPMethods.DELETE,
        data: body,
    });

    return resp.data;
}

export async function downloadFolder(itemid: string, userid: string) {
    const resp = await axiosClient({
        url: `item/download/folder/${userid}/${itemid}`,
        method: HTTPMethods.GET,
        responseType: "blob",
    });

    return resp.data;
}

export async function downloadFile(
    itemid: string,
    userid: string,
) {
    const resp = await axiosClient({
        url: `/item/download/${userid}/${itemid}`,
        method: HTTPMethods.DELETE,
        responseType: "blob",
    });

    return resp.data;
}

export async function filesFromFolder(
    userid: string,
    parentid: string,
    page: number = 0,
    sort: string = "name"
): Promise<Item[]> {
    const resp = await axiosClient({
        url: `/item/all/${userid}${
            parentid === "" ? "" : `/${parentid}`
        }?p=${page}&sort=${sort}`,
        method: HTTPMethods.DELETE,
    });

    return resp.data.data;
}

export async function search(
    userid: string,
    query: string,
    type: string | null
) {
    const resp = await axiosClient({
        url: `item/search/${userid}?q=${query}&${type ? `type=${type}` : ""}`,
        method: HTTPMethods.GET,
    });

    return resp.data;
}

export async function breadcrumb(
    userid: string,
    parentid: string
): Promise<Item[]> {
    const resp = await axiosClient<ListItemResponse>({
        url: `/item/breadcrumb/${userid}/${parentid}`,
        method: HTTPMethods.GET,
    });

    return resp.data.data;
}

export async function preview(itemid: string, userid: string, body: Object) {
    const resp = await axiosClient({
        url: `item/preview/${userid}/${itemid}`,
        method: HTTPMethods.GET,
        data: body,
    });

    return resp.data;
}

export async function updateName(itemid: string, userid: string, body: Object) {
    const resp = await axiosClient({
        url: `/item/update/${userid}/${itemid}/name`,
        method: HTTPMethods.DELETE,
        data: body,
        responseType: "blob",
    });

    return resp.data;
}

export async function uploadFolder(body: Object) {
    const resp = await axiosClient({
        url: "/item/save/folder",
        method: HTTPMethods.POST,
        data: body,
        responseType: "blob",
    });

    return resp.data;
}

export async function uploadFile(body: Object) {
    const resp = await axiosClient({
        url: "/item/save",
        method: HTTPMethods.POST,
        data: body,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return resp.data;
}

export async function folderById(
    userid: string,
    parentid: string
): Promise<SingleItemResponse> {
    const resp = await axiosClient({
        url: `/item/${userid}${parentid === "" ? "" : "/" + parentid}`,
    });

    return resp.data;
}
