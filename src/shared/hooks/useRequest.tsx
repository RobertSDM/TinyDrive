import { useEffect, useState } from "react";
import { Client, RequestConfig } from "../types/types.ts";
import { ServerClient } from "../api/requestClients.ts";
import { AxiosResponse } from "axios";
import {
    DefaultErrorCallback,
    DefaultResponseCallback,
} from "../api/responsesCallbacks.ts";

export default function useRequest<T>(
    config: RequestConfig,
    responseTransformer: (
        resp: AxiosResponse<T>
    ) => T = DefaultResponseCallback,
    errorTransformer: (error: any) => Error = DefaultErrorCallback,
    client: Client = ServerClient,
    autofetch: boolean = false
) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    async function request(body?: Object | Object[]): Promise<void> {
        try {
            setIsLoading(true);
            const response = await client({
                url: config.path,
                data: body ? body : config.body,
                responseType: config.blob ? "blob" : "json",
                ...config,
            });
            const result = responseTransformer(response);
            setData(result);
        } catch (err: any) {
            const error = errorTransformer(err);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (autofetch) request();
    }, []);

    return { isLoading, request, data, error };
}
