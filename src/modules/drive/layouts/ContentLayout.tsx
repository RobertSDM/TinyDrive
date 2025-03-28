import { Outlet, useNavigate } from "react-router-dom";
import { TreeProvider } from "../../../context/TreeContext.tsx";
import { NotificationProvider } from "../../../context/NotificationSystem.tsx";
import { useEffect } from "react";
import DefaultHeader from "../../../components/DefaultHeaderWrapper.tsx/DefaultHeader.tsx";
import { useUserContext } from "../../../context/useContext.tsx";
import Notifications from "../../../components/NotificationsWrapper/Notifications.tsx";
import { PaginationProvider } from "../context/paginationSave.tsx";
import Footer from "../../../components/FooterWrapper/Footer.tsx";

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
                <TreeProvider>
                    <PaginationProvider>
                        <Outlet />
                    </PaginationProvider>
                </TreeProvider>
                <Footer />
            </section>
        </NotificationProvider>
    );
};

export default ContentLayout;
