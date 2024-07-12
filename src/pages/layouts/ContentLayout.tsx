import { Outlet, useNavigate } from "react-router-dom";
import { TreeProvider } from "../../context/TreeContext.tsx";
import Notifications from "../../components/Notifications.tsx";
import { NotificationProvider } from "../../context/NotificationSystem.tsx";
import { useEffect } from "react";
import DefaultHeader from "../../components/DefaultHeader.tsx";
import { useUserContext } from "../../hooks/useContext.tsx";
import { ContentCacheProvider } from "../../context/ContentCacheContext.tsx";

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
            logUser(JSON.parse(user!), token!);
        }
    }, [isLogged]);

    if (!isLogged) {
        return;
    }

    return (
        <NotificationProvider>
            <section>
                <Notifications />
                <DefaultHeader />
                <ContentCacheProvider>
                    <TreeProvider>
                        <Outlet />
                    </TreeProvider>
                </ContentCacheProvider>
            </section>
        </NotificationProvider>
    );
};

export default ContentLayout;
