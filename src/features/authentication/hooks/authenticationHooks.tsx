import { LoginBody, NotifyLevel } from "@/types.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { account, logout, login } from "../requests/AuthRequests.ts";
import { useNavigate } from "react-router-dom";
import { useNotifyContext } from "@/context/useContext.tsx";
import { AxiosError } from "axios";

export function useLogin() {
    const navigate = useNavigate();
    const { notify } = useNotifyContext();

    return useMutation({
        mutationFn: (body: LoginBody) => login(body),
        onSuccess: (data) => {
            localStorage.setItem("access_", data.access_token);
            localStorage.setItem("refresh_", data.refresh_token);

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
    return useMutation({
        mutationFn: () => logout(),
        onSuccess: () => {
            localStorage.removeItem("access_");
            localStorage.removeItem("refresh_");
        },
    });
}

export function useAccount() {
    return useQuery({
        queryKey: ["useAccount"],
        queryFn: () =>
            account("Bearer " + (localStorage.getItem("access_") ?? "")),
        retry: false,
        enabled: !!localStorage.getItem("access_"),
        refetchOnWindowFocus: false,
    });
}
