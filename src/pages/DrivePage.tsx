// import DriveHeader from "@fileHandling/components/DriveHeader.tsx";
// import ModalProvider from "@modal/context/ModalContext.tsx";
// import { DriveItemsProvider } from "@fileHandling/context/DriveItemsContext.tsx";
// import { ParentItemProvider } from "@fileHandling/context/ParentItemContext.tsx";
import Drive from "@fileHandling/Drive.tsx";
import SessionProvider from "@/features/authentication/context/SessionContext.tsx";

type DriveLayoutProps = {};
export default function DriveLayout({}: DriveLayoutProps) {
    return (
        <SessionProvider>
            <Drive />
            {/* <ParentItemProvider>
                <DriveItemsProvider>
                    <ModalProvider>
                        <DriveHeader />
                        <Drive />
                    </ModalProvider>
                </DriveItemsProvider>
            </ParentItemProvider> */}
        </SessionProvider>
    );
}
