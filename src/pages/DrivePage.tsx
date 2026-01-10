import { DriveItemsProvider } from "@fileHandling/context/DriveItemsContext.tsx";
import Drive from "@fileHandling/Drive.tsx";
import SessionProvider from "@/features/authentication/context/SessionContext.tsx";

type DriveLayoutProps = {};
export default function DriveLayout({}: DriveLayoutProps) {
    return (
        <SessionProvider>
            <DriveItemsProvider>
                <Drive />
            </DriveItemsProvider>
        </SessionProvider>
    );
}
