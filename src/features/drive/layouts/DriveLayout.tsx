import { Outlet } from "react-router-dom";
import DriveHeader from "../components/DefaultHeaderWrapper.tsx/DriveHeader.tsx";
import { DriveItemsProvider } from "../context/DriveItemsContext.tsx";
import { ParentItemProvider } from "../context/ParentItemContext.tsx";
import ModalProvider from "@/shared/context/ModalContext.tsx";

const DriveLayout = () => {
    return (
        <section className="flex-1 flex flex-col">
            <ParentItemProvider>
                <DriveItemsProvider>
                    {/* <Notifications /> */}
                    <DriveHeader />
                    <ModalProvider>
                        <Outlet />
                    </ModalProvider>
                    {/* <Footer /> */}
                </DriveItemsProvider>
            </ParentItemProvider>
        </section>
    );
};

export default DriveLayout;
