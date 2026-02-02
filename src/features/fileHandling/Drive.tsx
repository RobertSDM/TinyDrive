import { useParams } from "react-router-dom";
import Breadcrumb from "./components/Breadcrumb.tsx";
import ButtonUpload from "./components/ButtonUpload.tsx";
import FileList from "./components/FileList.tsx";
import Header from "./components/Header.tsx";
import { useEffect } from "react";

type DriveProps = {};
export default function Drive({}: DriveProps) {
    let { parentid: paramsParentFolderId } = useParams();
    const parentid = !!paramsParentFolderId ? paramsParentFolderId! : "";

    useEffect(() => {
        document.title = "TinyDrive";
    }, []);

    return (
        <section className="mx-auto w-full max-w-7xl overflow-hidden px-4 md:px-10">
            <Header />
            <main className="mt-5 md:mt-20 flex flex-col gap-y-2">
                <Breadcrumb parentid={parentid} />
                <ButtonUpload parentid={parentid} />
                <FileList parentid={parentid} />
            </main>
        </section>
    );
}
