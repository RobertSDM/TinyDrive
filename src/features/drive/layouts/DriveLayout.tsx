import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { PaginationProvider } from "../context/paginationSave.tsx";
import DriveHeader from "../components/DefaultHeaderWrapper.tsx/DriveHeader.tsx";
import { useUserContext } from "@/shared/context/useContext.tsx";
import Notifications from "@/shared/components/NotificationsWrapper/Notifications.tsx";
import { TreeProvider } from "@/shared/context/TreeContext.tsx";
import Footer from "@/shared/components/FooterWrapper/Footer.tsx";

const DriveLayout = () => {
    const { isLogged, logoutUser, logUser, getAuthToken } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        const token = getAuthToken();
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
        <>
            <Notifications />
            <DriveHeader />
            <TreeProvider>
                <PaginationProvider>
                    <Outlet />
                </PaginationProvider>
            </TreeProvider>
            <Footer />
        </>
    );
};

export default DriveLayout;
