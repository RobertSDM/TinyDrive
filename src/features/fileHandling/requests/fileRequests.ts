import {
    HTTPMethods,
    File,
    FileResponse,
    FilenameRequest,
    BreadcrumbResponse,
    UrlResponse,
} from "@/types.ts";
import { axiosClient } from "@/lib/axios.ts";

export async function deleteFile(
    userid: string,
    fileids: string[]
): Promise<File[]> {
    const resp = await axiosClient<FileResponse>({
        url: `/files/account/${userid}`,
        method: HTTPMethods.DELETE,
        data: {
            fileids,
        },
    });

    return resp.data.files;
}

export async function downloadFile(fileids: string[], userid: string) {
    const resp = await axiosClient<Blob>({
        url: `/files/account/${userid}/download`,
        method: HTTPMethods.POST,
        responseType: "blob",
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            fileids,
        },
    });

    let filename = (resp.headers["content-disposition"] as string)
        .split("=")[1]
        .replaceAll('"', "")
        .trim();

    let a = document.createElement("a");
    a.href = URL.createObjectURL(resp.data);
    a.download = filename;
    a.hidden = true;

    a.click();
    a.remove();

    return;
}

export async function filesInFolder(
    userid: string,
    parentid: string,
    page: number = 0,
    sort: string = "name"
): Promise<File[]> {
    const resp = await axiosClient<FileResponse>({
        url: `/files/account/${userid}/parent${
            parentid === "" ? "" : `/${parentid}`
        }?p=${page}&sort=${sort}`,
        method: HTTPMethods.GET,
    });

    return resp.data.files;
}

export async function search(
    userid: string,
    query: string,
    type: string | null
): Promise<File[]> {
    const resp = await axiosClient<FileResponse>({
        url: `/files/account/${userid}/search?q=${query}&${
            type ? `type=${type}` : ""
        }`,
        method: HTTPMethods.GET,
    });

    return resp.data.files;
}

export async function breadcrumb(
    userid: string,
    fileid: string
): Promise<BreadcrumbResponse> {
    const resp = await axiosClient<BreadcrumbResponse>({
        url: `/files/${fileid}/account/${userid}/breadcrumb`,
        method: HTTPMethods.GET,
    });

    return resp.data;
}

export async function preview(
    itemid: string,
    userid: string
): Promise<UrlResponse> {
    const resp = await axiosClient({
        url: `/files/${itemid}/account/${userid}/preview`,
        method: HTTPMethods.GET,
    });

    return resp.data;
}

export async function updateName(
    itemid: string,
    userid: string,
    body: FilenameRequest
): Promise<File[]> {
    const resp = await axiosClient<FileResponse>({
        url: `/files/${itemid}/account/${userid}/name`,
        method: HTTPMethods.PUT,
        data: body,
    });

    return resp.data.files;
}

export async function uploadFolder(
    userid: string,
    body: FilenameRequest
): Promise<File[]> {
    const resp = await axiosClient<FileResponse>({
        url: `/files/account/${userid}/parent/folder`,
        method: HTTPMethods.POST,
        data: body,
    });

    return resp.data.files;
}

export async function uploadFile(
    userid: string,
    parentid: string,
    filelist: FileList
): Promise<File[]> {
    let filedata;
    filedata = new FormData();

    for (let file of filelist) filedata.append("filedata", file);

    const resp = await axiosClient<FileResponse>({
        url: `/files/account/${userid}/parent${
            parentid !== "" ? `/${parentid}` : ""
        }`,
        method: HTTPMethods.POST,
        data: filedata,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return resp.data.files;
}
