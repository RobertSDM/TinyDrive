import { axiosClient } from "@/lib/axiosLib.ts";
import { useState } from "react";

export const useRequest = <T,>() => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsRequesting] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    function request(
        url: string,
        method: string,
        body?: Object | Object[] | null,
        token?: string,
        responseType?: "blob" | "json"
    ) {
        setIsRequesting(true);
        axiosClient({
            url,
            method,
            data: body,
            responseType,
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
            },
        })
            .then((resp) => {
                setData(resp.data);
            })
            .catch(setError)
            .finally(() => {
                setIsRequesting(false);
            });
    }

    return { request, isLoading, data, error };
};
