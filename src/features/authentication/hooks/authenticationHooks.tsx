import { axiosClient } from "@/lib/axios.ts";
import { Account, AuthResult, HTTPMethods, SingleResponse } from "@/types.ts";
import { useState } from "react";

export function useRegisterHook() {
    const [isRequesting, setIsRequesting] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    function request(body: Object) {
        setIsRequesting(true);
        axiosClient({
            url: "/auth/register",
            data: body,
            method: HTTPMethods.POST,
        })
            .then(() => setSuccess(true))
            .finally(() => setIsRequesting(false));
    }

    return { request, isRequesting, success };
}

export function useLoginHook() {
    const [isRequesting, setIsRequesting] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    function request(body: Object) {
        setIsRequesting(true);
        axiosClient({
            url: "/auth/login",
            data: body,
            method: HTTPMethods.POST,
        })
            .then(() => setSuccess(true))
            .finally(() => setIsRequesting(false));
    }

    return { request, isRequesting, success };
}

export async function getAccountById(
    userid: string,
    token: string
): Promise<SingleResponse<Account>> {
    const resp = await axiosClient({
        url: `account/${userid}`,
        method: HTTPMethods.GET,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return resp.data;
}
