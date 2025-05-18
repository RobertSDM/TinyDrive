import { Session, User } from "@supabase/supabase-js";
import { createContext, ReactNode, useEffect, useState } from "react";
import { AccountGet } from "../api/config.ts";
import authClient from "../clients/supabase/authClient.ts";
import useFetcher from "../hooks/useRequest.tsx";
import { Account, SingleResponse } from "../types/index.ts";

type AuthContext = {
    user: User | null;
    logOut: () => void;
    logIn: (email: string, password: string) => void;
    isLogged: boolean;
    session: Session | null;
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
        setIsLoading(false);
        setAccount(data.data);
    }, [data]);

    useEffect(() => {
        authClient.getSession().then((resp) => {
            if (resp.error) return;
            setUser(resp.data.session?.user ?? null);
            setSession(resp.data.session);
            setIsLogged(true);
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
        authClient.logOut().then(() => {
            setIsLoading(false);
            setUser(null);
            setSession(null);
            setAccount(null);
        });
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                logOut,
                isLogged,
                logIn,
                account,
                isLoading,
                session,
            }}
        >
            {chidren}
        </AuthContext.Provider>
    );
}
