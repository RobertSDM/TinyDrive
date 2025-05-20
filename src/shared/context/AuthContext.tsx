import { createContext, ReactNode, useEffect, useState } from "react";
import { GetAccount } from "../api/requestConfig.ts";
import useRequest from "../hooks/useRequest.tsx";
import { Account, AuthResult, SingleResponse } from "../types/types.ts";
import authClient from "../clients/supabase/AuthClient.ts";

type AuthContext = {
    logOut: () => void;
    logInPassword: (email: string, password: string) => Promise<void>;
    isLogged: boolean;
    isLoading: boolean;
    session: AuthResult | null;
    account: Account | null;
};
export const AuthContext = createContext<AuthContext>({} as AuthContext);

type AuthProviderProps = { children: ReactNode };
export default function AuthProvider({ children }: AuthProviderProps) {
    const [session, setSession] = useState<AuthResult | null>(null);
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [account, setAccount] = useState<Account | null>(null);
    const {
        request: accountRequest,
        data,
        error,
    } = useRequest<SingleResponse<Account>>(
        GetAccount(session?.userid!, session?.accessToken!)
    );
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!session?.accessToken) return;
        accountRequest();
    }, [session]);

    useEffect(() => {
        if (!error && !data) return;
        setIsLoading(false);
        if (!data) return;
        setAccount(data.data);
    }, [data, error]);

    useEffect(() => {
        authClient
            .getSession()
            .then((resp) => {
                setSession(resp);
                setIsLogged(true);
            })
            .catch(() => {
                setIsLoading(false);
                setIsLogged(false);
            });
    }, []);

    async function logInPassword(email: string, password: string) {
        setIsLoading(true);
        const resp = await authClient.logInPassword(email, password);
        setIsLogged(true);
        setSession(resp);
    }

    function logOut() {
        authClient.logOut().then(() => {
            setIsLoading(false);
            setIsLogged(false);
            setSession(null);
            setAccount(null);
        });
    }

    return (
        <AuthContext.Provider
            value={{
                logOut,
                isLogged,
                logInPassword,
                account,
                isLoading,
                session,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
