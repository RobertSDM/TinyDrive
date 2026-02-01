import { useAccountContext as useAccountContext } from "@/context/useContext.tsx";
import { Outlet, useNavigate } from "react-router-dom";
import LogoLoader from "./LogoLoader.tsx";
import { useEffect } from "react";

export default () => {
    const { isLoading, account } = useAccountContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading) return;

        if (!account) navigate("/login");
    }, [account, isLoading]);

    if (isLoading) return <LogoLoader />;

    return <Outlet />;
};
