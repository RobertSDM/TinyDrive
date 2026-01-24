import { createContext, ReactNode, useEffect, useState } from "react";
import { Account } from "@/types.ts";
import { useAccount } from "../hooks/authenticationHooks.tsx";
import { axiosClient } from "@/lib/axios.ts";

type AuthContext = {
    isLoading: boolean;
    session: Account;
    isError: boolean;
};
export const SessionContext = createContext<AuthContext>({} as AuthContext);

type SessionProviderProps = { children: ReactNode };
export default function SessionProvider({ children }: SessionProviderProps) {
    const { data: session, isFetching, isError } = useAccount();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isFetching) return;

        // Inserting the JWT acess token into all axios requests
        const authHeaderInterceptor = axiosClient.interceptors.request.use(
            (config) => {
                const configCopy = {
                    ...config,
                };

                configCopy.headers.Authorization = `Bearer ${
                    localStorage.getItem("access_") ?? ""
                }`;

                return configCopy;
            }
        );

        setIsLoading(false);

        return () =>
            axiosClient.interceptors.request.eject(authHeaderInterceptor);
    }, [session]);

    return (
        <SessionContext.Provider
            value={{
                isLoading,
                session: session!,
                isError,
            }}
        >
            {children}
        </SessionContext.Provider>
    );
}
