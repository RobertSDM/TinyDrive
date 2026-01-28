import { createContext, ReactNode } from "react";
import { Account } from "@/types.ts";
import { useAccount } from "../hooks/authenticationHooks.tsx";

type AuthContext = {
    isLoading: boolean;
    session: Account | undefined;
    isError: boolean;
};
export const SessionContext = createContext<AuthContext>({} as AuthContext);

type SessionProviderProps = { children: ReactNode };
export default function SessionProvider({ children }: SessionProviderProps) {
    const { data: session, isFetching, isError } = useAccount();

    return (
        <SessionContext.Provider
            value={{
                isLoading: isFetching,
                session,
                isError,
            }}
        >
            {children}
        </SessionContext.Provider>
    );
}
