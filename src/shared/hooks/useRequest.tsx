import { useEffect, useState } from "react";
import { Client, RequestConfig } from "../types/index.ts";
import { DefaultClient } from "../api/clients.ts";
import { AxiosResponse } from "axios";
import { DefaultErrorTransformer, DefaultResponseTransformer } from "../api/responseTransformers.ts";

export default function useFetcher<T>(
    config: RequestConfig,
    client: Client = DefaultClient,
    autofetch: boolean = false,
    responseTransformer: (
        resp: AxiosResponse
    ) => T = DefaultResponseTransformer,
    errorTransformer: (error: any) => Error = DefaultErrorTransformer
) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    async function request(): Promise<void> {
        try {
            setIsLoading(true);
            const response = await client({
                url: config.path,
                headers: config.headers,
                method: config.method,
                data: config.body,
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
