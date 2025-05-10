import Footer from "@/shared/components/FooterWrapper/Footer.tsx";
import Notifications from "@/shared/components/NotificationsWrapper/Notifications.tsx";
import { useUserContext } from "@/shared/context/useContext.tsx";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import DriveHeader from "../components/DefaultHeaderWrapper.tsx/DriveHeader.tsx";
import { ParentItemProvider } from "../context/ParentItemContext.tsx";

const DriveLayout = () => {
    const { isLogged, logoutUser, userLogin, getAuthToken } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        const token = getAuthToken();
        const user = localStorage.getItem("user-info");

        if (!token || !user) {
            logoutUser();
            navigate("/login");
        } else {
            userLogin(JSON.parse(user!), token!);
        }
    }, [isLogged]);

    if (!isLogged) {
        return;
    }

    return (
        <ParentItemProvider>
            <Notifications />
            <DriveHeader />
            <section className="max-w-7xl m-auto">
                <Outlet />
            </section>
            <Footer />
        </ParentItemProvider>
    );
};

export default DriveLayout;
