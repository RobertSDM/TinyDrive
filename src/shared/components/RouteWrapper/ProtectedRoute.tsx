import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/useContext.tsx";
import { useEffect } from "react";

export default function ProtectedRoute() {
    const navigate = useNavigate();
    const { isLogged, isLoading } = useAuthContext();

    useEffect(() => {
        if (!isLogged && !isLoading) navigate("/login");
    }, [isLogged, isLoading]);

    if (isLoading) return <p>Loading...</p>;

    return <Outlet />;
}
