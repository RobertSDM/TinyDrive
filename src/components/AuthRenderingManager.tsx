import { useSessionContext } from "@/context/useContext.tsx";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LogoLoader from "./LogoLoader.tsx";

export default () => {
    const navigate = useNavigate();

    const { isError, isLoading } = useSessionContext();

    useEffect(() => {
        if (isLoading) return;

        if (isError) {
            localStorage.removeItem("access_");
            localStorage.removeItem("refresh_");

            navigate("/login");
            return;
        }

        if (!localStorage.getItem("access_")) {
            navigate("/login");
            return;
        }
    }, [isLoading, isError]);

    if (isLoading) return <LogoLoader />;

    return <Outlet />;
};
