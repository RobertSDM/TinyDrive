import { Outlet } from "react-router-dom";
import Notifications from "../../components/Notifications.tsx";
import { NotificationProvider } from "../../context/NotificationSystem.tsx";

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
