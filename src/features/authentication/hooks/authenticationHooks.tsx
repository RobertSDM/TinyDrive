import { File, LoginBody, NotifyLevel, RegisterBody } from "@/types.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { account, logout, login, register } from "../requests/AuthRequests.ts";
import { useNavigate } from "react-router-dom";
import {
    useAccountContext,
    useDriveItemsContext,
    useNotifyContext,
} from "@/context/useContext.tsx";
import { AxiosError } from "axios";
import { queryClient } from "@/lib/reactQuery.ts";

export function useRegister() {
    const notify = useNotifyContext();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (body: RegisterBody) => register(body),
        onSuccess: () => {
            notify({
                level: NotifyLevel.INFO,
                message: "Conta registrada com sucesso. Agora realize o login",
                type: "popup",
            });

            navigate("/login");
        },
    });
}

export function useLogin() {
    const navigate = useNavigate();
    const notify = useNotifyContext();
    const { refetch } = useAccountContext();

    return useMutation({
        mutationFn: (body: LoginBody) => login(body),
        onSuccess: (data) => {
            localStorage.setItem("access_", data.access_token);
            localStorage.setItem("refresh_", data.refresh_token);

            refetch();
            navigate("/drive");
        },
        onError: (error: AxiosError) => {
            if (error.status === 422) {
                notify({
                    level: NotifyLevel.ERROR,
                    message: "O email ou a senha estão errados",
                    type: "popup",
                });
            } else {
                notify({
                    level: NotifyLevel.ERROR,
                    message: "Erro ao logar",
                    type: "popup",
                });
            }
        },
    });
}

export function useLogout() {
    const { update } = useDriveItemsContext();
    const navigate = useNavigate();
    const { logout: logoutAccount } = useAccountContext();

    return useMutation({
        mutationFn: () => logout(),
        onSuccess: () => {
            localStorage.removeItem("access_");
            localStorage.removeItem("refresh_");

            update({ type: "clear", file: {} as File });
            logoutAccount();
            queryClient.invalidateQueries();
            navigate("/login");
        },
    });
}

export function useAccount() {
    return useQuery({
        queryKey: ["useAccount"],
        queryFn: () => account(),
        throwOnError: true,
        retry: false,
        enabled: false,
        refetchOnWindowFocus: false,
    });
}
