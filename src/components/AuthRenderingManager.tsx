import { useAccountContext as useAccountContext } from "@/context/useContext.tsx";
import { Navigate, Outlet } from "react-router-dom";
import LogoLoader from "./LogoLoader.tsx";

export default () => {
    const { isLoading, account } = useAccountContext();

    if (isLoading) return <LogoLoader />;
    

    if (!account) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};
