import { useSessionContext } from "@/context/useContext.tsx";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LogoLoader from "./LogoLoader.tsx";
import { upsertInterceptor } from "@/lib/axios.ts";

export default () => {
    const { isLoading, isError } = useSessionContext();
    const navigate = useNavigate();

    function cleanTokens() {
        localStorage.removeItem("access_");
        localStorage.removeItem("refresh_");
    }

    useEffect(() => {
        upsertInterceptor("authenticationToken", (axiosConfig) => {
            const configCopy = { ...axiosConfig };
            configCopy.headers.Authorization = `Bearer ${
                localStorage.getItem("access_") ?? ""
            }`;
            return configCopy;
        });
    }, []);

    useEffect(() => {
        if (!isError || !!localStorage.getItem("access_")) return;

        cleanTokens();
        navigate("/login");
    }, [isError]);

    if (isLoading) return <LogoLoader />;

    return <Outlet />;
};
