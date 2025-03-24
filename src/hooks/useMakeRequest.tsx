import { RequestParam } from "@/types/types.ts";
import { AxiosInstance } from "axios";
import { useState } from "react";

export default <RT,>(
    client: AxiosInstance,
    { url, params, body, method, headers }: RequestParam
) => {
    const [data, setData] = useState<RT>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<Number>();

    function makeRequest(): Promise<RT> {
        return new Promise((resolve, reject) => {
            setIsLoading(true);
            client({
                url,
                data: body,
                headers,
                params,
                method,
            })
                .then((response) => {
                    setData(response.data);
                    setStatus(response.status);
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        });
    }

    return { isLoading, status, makeRequest, data };
};
