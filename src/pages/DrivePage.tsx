import { DriveItemsProvider } from "@fileHandling/context/DriveItemsContext.tsx";
import Drive from "@fileHandling/Drive.tsx";

type DriveLayoutProps = {};
export default function DriveLayout({}: DriveLayoutProps) {
    return (
        <DriveItemsProvider>
            <Drive />
        </DriveItemsProvider>
    );
}
