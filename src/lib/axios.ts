import axios, { AxiosError } from "axios";
import { BackendURL as BackendURL } from "@/constants.ts";

let isRefreshing = false;

export function axiosClient() {
    const client = axios.create({
        baseURL: BackendURL,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access_"),
        },
    });

    client.interceptors.request.use((config) => {
        const configCopy = { ...config };

        configCopy.headers.Authorization = `Bearer ${
            localStorage.getItem("access_") ?? ""
        }`;

        return configCopy;
    });

    // This piece of code is havily inspired by: https://vinniciusgomes.medium.com/refresh-token-com-axios-interceptors-e-fila-de-requisicoes-cf5eb39ee586
    client.interceptors.response.use(
        (config) => {
            return config;
        },
        async (error: AxiosError) => {
            // Refresh on 401 errors, because I know the server doesn't return 401 for other reasons
            if (error.response!.status === 401) {
                const requestConfig = { ...error.config };
                const refreshToken = localStorage.getItem("refresh_");

                if (!isRefreshing) {
                    isRefreshing = true;

                    try {
                        const tokens = await client<{
                            access_token: string;
                            refresh_token: string;
                        }>({
                            method: "POST",
                            url: "/auth/refresh",
                            data: { token: refreshToken },
                        });

                        localStorage.setItem(
                            "access_",
                            tokens.data.access_token
                        );
                        localStorage.setItem(
                            "refresh_",
                            tokens.data.refresh_token
                        );

                        client.defaults.headers[
                            "Authorization"
                        ] = `Bearer ${tokens.data.access_token}`;

                        return await client(requestConfig);
                    } catch (err) {
                        localStorage.removeItem("access_");
                        localStorage.removeItem("refresh_");
                    } finally {
                        isRefreshing = false;
                    }
                }
            }

            return Promise.reject(error);
        }
    );

    return client;
}
