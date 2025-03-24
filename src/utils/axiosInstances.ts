import axios, { AxiosInstance } from "axios";
import { BACKEND_URL } from "./globalVariables.ts";

export default function axiosDBInstance(): AxiosInstance {
    const client = axios.create({
        baseURL: BACKEND_URL,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },
        validateStatus: (status) => {
            return status >= 200 && status < 300;
        },
    });

    return client;
}
