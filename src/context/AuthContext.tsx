import { createContext, ReactNode, useEffect, useState } from "react";
import { Account, AuthResult, HTTPMethods, SingleResponse } from "@/types.ts";
import AuthClientSingleton from "../lib/supabase/AuthenticationSingleton.ts";
import { useRequest } from "@/hooks/useRequest.tsx";

type AuthContext = {
    logOut: () => void;
    logInPassword: (email: string, password: string) => Promise<boolean>;
    isLoading: boolean;
    session: AuthResult | null;
    account: Account | null;
};
export const AuthContext = createContext<AuthContext>({} as AuthContext);

type AuthProviderProps = { children: ReactNode };
export default function AuthProvider({ children }: AuthProviderProps) {
    const authClient = AuthClientSingleton.getInstance();
    const [session, setSession] = useState<AuthResult | null>(null);
    const [account, setAccount] = useState<Account | null>(null);
    const {
        request: accountRequest,
        data,
        error,
    } = useRequest<SingleResponse<Account>>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!session) return;
        accountRequest(
            `account/${session.userid}`,
            HTTPMethods.GET,
            null,
            session?.accessToken!
        );
    }, [session]);

    useEffect(() => {
        if (!data) return;
        setAccount(data.data);
        setIsLoading(false);
    }, [data]);

    useEffect(() => {
        if (!error) return;
        setIsLoading(false);
    }, [error]);

    useEffect(() => {
        authClient
            .getSession()
            .then((resp) => {
                setSession(resp);
            })
            .catch(() => {
                setIsLoading(false);
            });
    }, []);

    async function logInPassword(email: string, password: string) {
        setIsLoading(true);
        const resp = await authClient.logInPassword(email, password);

        if (!resp) return false;

        setSession(resp);

        return true;
    }

    function logOut() {
        authClient.logOut().then(() => {
            setIsLoading(false);
            setSession(null);
            setAccount(null);
        });
    }

    return (
        <AuthContext.Provider
            value={{
                logOut,
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
