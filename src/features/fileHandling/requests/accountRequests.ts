import { axiosClient } from "@/lib/axios.ts";
import { Account } from "@/types.ts";

export async function accountById(): Promise<Account> {
    const resp = await axiosClient({
        url: "/",
    });

    return {} as Account;
}
