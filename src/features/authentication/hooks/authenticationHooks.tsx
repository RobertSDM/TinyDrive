import { axiosClient } from "@/lib/axios.ts";
import { Account, HTTPMethods } from "@/types.ts";

export async function registerHook(body: Object) {
    const resp = await axiosClient({
        url: "/auth/register",
        data: body,
        method: HTTPMethods.POST,
    });

    return resp.data;
}

export async function loginHook(body: Object) {
    const resp = await axiosClient({
        url: "/auth/login",
        data: body,
        method: HTTPMethods.POST,
    });

    return resp.data;
}

export async function accountById(userid: string): Promise<Account> {
    const resp = await axiosClient({
        url: `account/${userid}`,
        method: HTTPMethods.GET,
    });

    return resp.data;
}
