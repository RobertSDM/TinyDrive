import { createContext, ReactNode, useEffect, useState } from "react";
import authClient from "../clients/supabase/authClient.ts";
import { Session, User } from "@supabase/supabase-js";
import useFetcher from "../hooks/useRequest.tsx";
import { AccountGet } from "../api/config.ts";
import { Account, SingleResponse } from "../types/index.ts";
import { useNavigate } from "react-router-dom";

type AuthContext = {
    user: User | null;
    logOut: () => void;
    logIn: (email: string, password: string) => void;
    isLogged: boolean;
    isLoading: boolean;
    account: Account | null;
};
export const AuthContext = createContext<AuthContext>({} as AuthContext);

type AuthProviderProps = { children: ReactNode };
export default function AuthProvider({ children: chidren }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [account, setAccount] = useState<Account | null>(null);
    const { request, data } = useFetcher<SingleResponse<Account>>(
        AccountGet(user?.id!, session?.access_token!)
    );
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!session?.access_token) return;

        request();
    }, [session]);

    useEffect(() => {
        if (!data) return;
        setAccount(data.data);
    }, [data]);

    useEffect(() => {
        setIsLoading(true);
        authClient.getSession().then((resp) => {
            if (resp.error) return;
            setUser(resp.data.session?.user ?? null);
            setSession(resp.data.session);
            setIsLogged(true);
            setIsLoading(false);
        });
    }, []);

    async function logIn(email: string, password: string) {
        const resp = await authClient.logIn(email, password);
        if (resp.error) return;
        setUser(resp.data.session?.user ?? null);
        setSession(resp.data.session);
        setIsLogged(true);
    }

    function logOut() {
        setIsLoading(true);
        authClient.logOut().then(() => {
            setIsLoading(false);
            setUser(null);
            setSession(null);
            setAccount(null);
            setIsLogged(false);
        });
    }

    return (
        <AuthContext.Provider
            value={{ user, logOut, isLogged, logIn, account, isLoading }}
        >
            {chidren}
        </AuthContext.Provider>
    );
}
