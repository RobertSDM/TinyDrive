import Notifications from "@/shared/components/NotificationsWrapper/Notifications.tsx";
import { useUserContext } from "@/shared/context/useContext.tsx";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
const AuthLayout = () => {
    const { isLogged, getAuthToken: findUserToken } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogged) {
            return;
        }

        const token = findUserToken();
        const user = localStorage.getItem("user-info");

        if (token && user) {
            navigate("/drive");
        }
    }, []);

    if (isLogged) {
        return;
    }

    return (
        <section>
            <Notifications />
            <Outlet />
        </section>
    );
};

export default AuthLayout;
