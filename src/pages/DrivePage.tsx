import { DriveFilesProvider } from "@fileHandling/context/DriveItemsContext.tsx";
import Drive from "@fileHandling/Drive.tsx";

type DriveLayoutProps = {};
export default function DriveLayout({}: DriveLayoutProps) {
    return (
        <DriveFilesProvider>
            <Drive />
        </DriveFilesProvider>
    );
}
