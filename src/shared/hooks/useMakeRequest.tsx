import { useEffect, useState } from "react";
import { Client, RequestConfig } from "../types/types.ts";
import { AxiosError } from "axios";

export default function useMakeRequest<T>(
    config: RequestConfig,
    client: Client,
    autofetch: boolean = false
) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    async function makeRequest(
        body: Object | null = null
    ): Promise<Error | null> {
        try {
            setIsLoading(true);
            const result = await client({
                url: config.path,
                headers: config.headers,
                method: config.method,
                data: body,
            });
            setData(result.data);
            return null;
        } catch (err: any) {
            setError(
                err instanceof AxiosError
                    ? err
                    : new Error("Error fetching the data")
            );
            return err as Error;
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (autofetch) makeRequest();
    }, []);

    return { isLoading, makeRequest, data, error };
}
