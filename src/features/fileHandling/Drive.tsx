import { useParams } from "react-router-dom";
import Breadcrumb from "./components/Breadcrumb.tsx";
import ButtonUpload from "./components/ButtonUpload.tsx";
import { useSessionContext } from "@/context/useContext.tsx";
import LogoLoader from "@/components/LogoLoader.tsx";
import FileList from "./components/FileList.tsx";
import Header from "./components/Header.tsx";

type DriveProps = {};
export default function Drive({}: DriveProps) {
    let { parentid: paramsParentFolderId } = useParams();
    const { isLoading, isAuthenticated } = useSessionContext();
    const parentid = !!paramsParentFolderId ? paramsParentFolderId! : "";

    if (!isAuthenticated || isLoading) return <LogoLoader />;

    return (
        <section className="mx-auto w-full max-w-7xl overflow-hidden px-10">
            <Header />
            <main className="mt-20 flex flex-col gap-y-2">
                <Breadcrumb parentid={parentid} />
                <ButtonUpload parentid={parentid} />
                <FileList parentid={parentid} />
            </main>
        </section>
    );
}
