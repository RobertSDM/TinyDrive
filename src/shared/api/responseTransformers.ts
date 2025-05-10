import { AxiosError, AxiosResponse } from "axios";

export function DefaultResponseTransformer<T>(resp: AxiosResponse): T {
    return resp.data;
}

export function DefaultErrorTransformer(error: any): Error {
    return error instanceof AxiosError
        ? error
        : new Error("an error ocurred in the request");
}
