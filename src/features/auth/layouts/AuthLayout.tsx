import Notifications from "@/shared/components/NotificationsWrapper/Notifications.tsx";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <section>
            <Notifications />
            <Outlet />
        </section>
    );
};

export default AuthLayout;
