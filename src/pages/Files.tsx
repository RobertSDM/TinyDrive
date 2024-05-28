import FilesTable from "../components/FilesTable.tsx";
import { getAllFilesByFolderId } from "../connection/getAllFiles.ts";
import { useEffect, useState } from "react";
import { IFile } from "../types/index.js";
import { useParams } from "react-router-dom";
import ButtonGetFileOrFolder from "../components/ButtonGetFileOrFolder.tsx";

const Files = () => {
    const [files, setFiles] = useState<IFile[]>([]);
    const [title] = useState("Tiny Drive");
    const { id } = useParams();

    useEffect(() => {
        document.title = title;

        async function getFiles() {
            await getAllFilesByFolderId(id!).then((res) => {
                if (res) {
                    setFiles(res);
                }
            });
        }

        getFiles();
    }, [files, title, id]);

    return (
        <>
            <header className="flex border px-8 py-4 items-center ">
                <h1 className="text-2xl font-bold text-purple-500">
                    Tiny Drive
                </h1>
                {/* <div className="mx-auto border-black/40 border rounded-sm items-center cursor-pointer relative w-2/4">
                    <SearchInput />
                </div> */}
            </header>

            <main className="mt-10 md:max-w-5xl xl:max-w-7xl mx-auto">
                <nav className="border-t border-b border-black/10 py-1">
                    <ButtonGetFileOrFolder />
                </nav>

                <section className="mt-5 md:max-w-5xl xl:max-w-7xl ">
                    <div className="text-xl text-black/50">/</div>
                    <FilesTable files={files} />
                </section>
            </main>
        </>
    );
};

export default Files;
