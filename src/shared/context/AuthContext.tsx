import { createContext, ReactNode, useEffect, useState } from "react";
import useGetAccount from "../hooks/accountHooks.tsx";
import { Account, AuthResult } from "../types/types.ts";
import AuthClientSingleton from "../core/getAuthenticationClient.ts";

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
    } = useGetAccount(session?.userid!, session?.accessToken!);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!session) return;
        accountRequest();
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
