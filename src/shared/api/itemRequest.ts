import { Client, RequestConfig } from "@/shared/types/index.ts";
import { AxiosError } from "axios";

export async function makeRequest<T>(
    config: RequestConfig,
    client: Client
): Promise<T | null> {
    try {
        const result = await client({
            url: config.path,
            headers: config.headers,
            method: config.method,
            data: config.body,
        });
        return result.data;
    } catch (err: any) {
        if (!(err instanceof AxiosError)) return null;

            console.log(err.response?.data);
        return err.response?.data.error;
    }
}
