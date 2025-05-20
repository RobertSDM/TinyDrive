import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/useContext.tsx";
import { useEffect } from "react";

export default function ProtectedPage() {
    const { isLoading, isLogged } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !isLogged) navigate("/login");
    }, [isLogged, isLoading]);

    if (isLoading) return <p>Loading...</p>;
    if (!isLogged) return;

    return <Outlet />;
}
