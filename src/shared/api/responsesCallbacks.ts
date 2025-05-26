import { AxiosError, AxiosResponse } from "axios";

export function DefaultResponseCallback<T>(resp: AxiosResponse): T {
    return resp.data;
}

export function DefaultErrorCallback(error: any): Error {
    return error instanceof AxiosError
        ? error
        : new Error("an error ocurred in the request");
}
