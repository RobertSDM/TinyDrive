import { FilesProvider } from "@/features/fileHandling/context/FilesContext.tsx";
import Drive from "@fileHandling/Drive.tsx";

type DriveLayoutProps = {};
export default function DriveLayout({}: DriveLayoutProps) {
    return (
        <FilesProvider>
            <Drive />
        </FilesProvider>
    );
}
