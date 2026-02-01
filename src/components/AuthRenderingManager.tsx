import { useAccountContext as useAccountContext } from "@/context/useContext.tsx";
import { Navigate, Outlet } from "react-router-dom";
import LogoLoader from "./LogoLoader.tsx";
import { useEffect } from "react";

export default () => {
    const { isLoading, account, refetch } = useAccountContext();

    useEffect(() => {
        if (!account && !isLoading) refetch();
    }, [account, isLoading]);

    if (isLoading) return <LogoLoader />;

    if (!account) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};
