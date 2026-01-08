import { Outlet, useNavigate } from "react-router-dom";
import { useSessionContext } from "../context/useContext.tsx";
import { useEffect } from "react";
import LogoLoader from "./LogoLoader.tsx";

export default function ProtectedPage() {
    const { isLoading, account } = useSessionContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !account) navigate("/login");
    }, [isLoading, account]);

    if (isLoading || !account) return <LogoLoader />;

    return <Outlet />;
}
