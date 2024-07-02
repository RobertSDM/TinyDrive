import { Outlet, useNavigate } from "react-router-dom";
import { TreeProvider } from "../../control/context/TreeContext.tsx";
import Notifications from "../../components/Notifications.tsx";
import { NotificationProvider } from "../../control/context/NotificationSystem.tsx";
import { useUserContext } from "../../control/hooks/useContext.tsx";
import { useEffect } from "react";

const ContentLayout = () => {
    const { isLogged, logoutUser, logUser, findUserToken } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        const token = findUserToken();
        const user = localStorage.getItem("user-info");

        if (!token || !user) {
            logoutUser();
            navigate("/login");
        } else {
            logUser(token!, JSON.parse(user!));
        }
    }, [isLogged]);

    if (!isLogged) {
        return;
    }

    return (
        <NotificationProvider>
            <section>
                <Notifications />
                <TreeProvider>
                    <Outlet />
                </TreeProvider>
            </section>
        </NotificationProvider>
    );
};

export default ContentLayout;
