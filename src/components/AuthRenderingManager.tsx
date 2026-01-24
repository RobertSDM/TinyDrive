import { useSessionContext } from "@/context/useContext.tsx";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default () => {
    const navigate = useNavigate();

    const { session, isError, isLoading } = useSessionContext();

    useEffect(() => {
        if (!localStorage.getItem("access_")) {
            navigate("/login");
            return;
        }

        if (isLoading) return;

        if (!session || isError) {
            navigate("/login");
            return;
        }
    }, [isLoading]);

    return <Outlet />;
};
