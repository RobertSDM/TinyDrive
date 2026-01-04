import axios from "axios";
import { BackendURL as BackendURL } from "@/constants.ts";
import { AxiosError, AxiosResponse } from "axios";

export const axiosClient = axios.create({
    baseURL: BackendURL,
});

export function DefaultResponseCallback<T>(resp: AxiosResponse): T {
    return resp.data;
}

export function DefaultErrorCallback(error: any): Error {
    return error instanceof AxiosError
        ? error
        : new Error("an error ocurred in the request");
}
