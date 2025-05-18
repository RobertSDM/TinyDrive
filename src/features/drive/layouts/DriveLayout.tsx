import Footer from "@/shared/components/FooterWrapper/Footer.tsx";
import Notifications from "@/shared/components/NotificationsWrapper/Notifications.tsx";
import { Outlet } from "react-router-dom";
import DriveHeader from "../components/DefaultHeaderWrapper.tsx/DriveHeader.tsx";
import { DriveItemsProvider } from "../context/DriveItemsContext.tsx";
import { ParentItemProvider } from "../context/ParentItemContext.tsx";

const DriveLayout = () => {
    return (
        <ParentItemProvider>
            <DriveItemsProvider>
                <Notifications />
                <DriveHeader />
                <section className="max-w-7xl m-auto">
                    <Outlet />
                </section>
                <Footer />
            </DriveItemsProvider>
        </ParentItemProvider>
    );
};

export default DriveLayout;
