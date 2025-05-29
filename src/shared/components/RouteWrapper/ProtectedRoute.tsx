import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/useContext.tsx";
import { useEffect } from "react";
import LogoLoader from "../LogoLoaderWrapper/LogoLoader.tsx";

export default function ProtectedPage() {
    const { isLoading, account } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !account) navigate("/login");
    }, [account, isLoading]);

    if (isLoading || !account) return <LogoLoader />;

    return <Outlet />;
}
