import axios, { InternalAxiosRequestConfig } from "axios";
import { BackendURL as BackendURL } from "@/constants.ts";

export const axiosClient = axios.create({
    baseURL: BackendURL,
});

let interceptors: {
    [id: string]: number;
} = {};

/**
 * Adds an interceptor to a axiosClient instance, and save the interceptor id
 * with the provided id. When a id already exists the interceptor id is updated.
 */
export const upsertInterceptor = (
    id: string,
    callback: (
        axiosConfig: InternalAxiosRequestConfig
    ) => InternalAxiosRequestConfig
) => {
    const interceptor = interceptors[id];

    // Ensure a copy is not being created
    if (!!interceptor) {
        axiosClient.interceptors.request.eject(interceptor);
    }

    // Inserting the JWT acess token into all axios requests
    interceptors[id] = axiosClient.interceptors.request.use(callback);
};
