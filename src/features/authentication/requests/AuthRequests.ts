import { axiosClient } from "@/lib/axios.ts";
import { Account, HTTPMethods, LoginBody, LoginResponse, RegisterBody } from "@/types.ts";

export async function login(body: LoginBody) {
    const resp = await axiosClient<LoginResponse>({
        url: "/auth/login",
        data: body,
        method: HTTPMethods.POST,
        withCredentials: true,
    });

    return resp.data;
}

export async function register(body: RegisterBody) {
    const resp = await axiosClient<Account>({
        url: "/auth/register",
        data: body,
        method: HTTPMethods.POST,
    });

    return resp.data;
}

export async function account(access_token: string): Promise<Account> {
    const resp = await axiosClient<Account>({
        url: `/account/`,
        method: HTTPMethods.GET,
        headers: {
            Authorization: access_token,
        },
    });

    return resp.data;
}

export async function logout(): Promise<boolean> {
    const resp = await axiosClient<LoginResponse>({
        url: "/auth/logout",
        method: HTTPMethods.POST,
    });

    return resp.status === 200;
}
