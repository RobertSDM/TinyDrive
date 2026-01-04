import { Outlet } from "react-router-dom";
import DriveHeader from "./components/DriveHeader.tsx";
import { DriveItemsProvider } from "./context/DriveItemsContext.tsx";
import { ParentItemProvider } from "./context/ParentItemContext.tsx";
import ModalProvider from "@/context/ModalContext.tsx";

export default function FileViewLayout() {
    return (
        <section className="flex-1 flex flex-col">
            <ParentItemProvider>
                <DriveItemsProvider>
                    <DriveHeader />
                    <ModalProvider>
                        <Outlet />
                    </ModalProvider>
                </DriveItemsProvider>
            </ParentItemProvider>
        </section>
    );
}
