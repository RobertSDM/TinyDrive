import { createContext, ReactNode, useEffect, useState } from "react";
import { Account, NotifyLevel } from "@/types.ts";
import { useAccount } from "../hooks/authenticationHooks.tsx";
import { useNotifyContext } from "@/context/useContext.tsx";

type AuthContext = {
    isLoading: boolean;
    account: Account | undefined;
    logout: () => void;
    refetch: () => void;
};
export const AccountContext = createContext<AuthContext>({} as AuthContext);

type AccountProvider = { children: ReactNode };
export default function AccountProvider({ children }: AccountProvider) {
    const { refetch } = useAccount();
    const notify = useNotifyContext();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [account, setAccount] = useState<Account | undefined>(undefined);

    async function refreshAccount() {
        setIsLoading(true);

        try {
            const data = await refetch();
            setAccount(data.data);
        } catch (err) {
            notify({
                level: NotifyLevel.ERROR,
                message: "Sua sessão expirou. Por favor, faça login novamente.",
                type: "popup",
            });
            setAccount(undefined);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!!localStorage.getItem("access_")) {
            refreshAccount();
        } else {
            setIsLoading(false);
        }
    }, []);

    return (
        <AccountContext.Provider
            value={{
                isLoading,
                account,
                logout: () => setAccount(undefined),
                refetch: refreshAccount,
            }}
        >
            {children}
        </AccountContext.Provider>
    );
}
