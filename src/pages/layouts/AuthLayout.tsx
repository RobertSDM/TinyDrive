import { Outlet, useNavigate } from "react-router-dom";
import { NotificationProvider } from "../../context/NotificationSystem.tsx";
import Notifications from "../../components/NotificationsWrapper/Notifications.tsx";
import { useUserContext } from "../../context/useContext.tsx";
import { useEffect } from "react";

const AuthLayout = () => {
    const { isLogged, findUserToken } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogged) {
            return;
        }

        const token = findUserToken();
        const user = localStorage.getItem("user-info");

        if (token && user) {
            navigate("/");
        }
    }, []);

    if (isLogged) {
        return;
    }

    return (
        <NotificationProvider>
            <section>
                <Notifications />
                <Outlet />
            </section>
        </NotificationProvider>
    );
};

export default AuthLayout;
