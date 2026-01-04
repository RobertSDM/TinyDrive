import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/useContext.tsx";
import { useEffect } from "react";
import LogoLoader from "./LogoLoader.tsx";

export default function ProtectedPage() {
    const { isLoading, account } = AuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !account) navigate("/login");
    }, [isLoading, account]);

    if (isLoading || !account) return <LogoLoader />;

    return <Outlet />;
}
