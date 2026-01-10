import { createContext, ReactNode, useEffect, useState } from "react";
import { AuthResult, ProjectMode } from "@/types.ts";
import {
    AuthenticationClientInterface,
    SupabaseAuthenticationClient,
} from "@/features/authentication/lib/SupabaseAuthentication.ts";
import { Mode, SupabaseKey, SupabaseURL } from "@/constants.ts";
import MockAuthenticationClient from "@/features/authentication/lib/AuthenticationMock.ts";
import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios.ts";

type AuthContext = {
    login: (email: string, password: string) => void;
    error: boolean;
    isLoading: boolean;
    session: AuthResult | undefined;
    isAuthenticated: boolean;
};
export const SessionContext = createContext<AuthContext>({} as AuthContext);

type SessionProviderProps = { children: ReactNode };
export default function SessionProvider({ children }: SessionProviderProps) {
    let authClient: AuthenticationClientInterface;

    if (Mode === ProjectMode.PROD) {
        authClient = new SupabaseAuthenticationClient(SupabaseURL, SupabaseKey);
    } else authClient = new MockAuthenticationClient();

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const {
        data: session,
        refetch: sessionRefetch,
        isFetching,
        isError,
    } = useQuery({
        queryKey: ["authSession"],
        queryFn: authClient.getSession,
        staleTime: Infinity,
    });

    useEffect(() => {
        if (isError || isFetching) return;
        setIsAuthenticated(true);

        // Inserting the JWT acess token into all axios requests
        // TODO: add only to protected routes
        const authHeaderInterceptor = axiosClient.interceptors.request.use(
            (config) => {
                const configCopy = {
                    ...config,
                };

                configCopy.headers.Authorization = `Bearer ${
                    session!.accessToken
                }`;

                return configCopy;
            }
        );

        return () =>
            axiosClient.interceptors.request.eject(authHeaderInterceptor);
    }, [session]);

    function login() {
        if (!!session) return;
        sessionRefetch().then(() => setIsAuthenticated(true));
    }

    return (
        <SessionContext.Provider
            value={{
                login,
                error: isError,
                isLoading: isFetching,
                session: session,
                isAuthenticated,
            }}
        >
            {children}
        </SessionContext.Provider>
    );
}
