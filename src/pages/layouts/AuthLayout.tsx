import { Outlet } from "react-router-dom";
import { NotificationProvider } from "../../context/NotificationSystem.tsx";
import Notifications from "../../components/NotificationsWrapper/Notifications.tsx";

const AuthLayout = () => {
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
