import { useEffect, useState } from "react";
import FilesTable from "../components/FilesTable.tsx";
import {getAllRootFiles} from "../fetcher/getAllFiles.ts";
import type { IFile, IFolder } from "../types/index.d.ts";
import ButtonGetFileOrFolder from "../components/ButtonGetFileOrFolder.tsx";

function Home() {
    const [files, setFiles] = useState<Array<IFile & IFolder>>([]);
    const [title] = useState("Tiny Drive");

    useEffect(() => {
        document.title = title;

        async function getFiles() {
            await getAllRootFiles().then((res) => {
                if (res) {
                    setFiles(res);
                }
            });
        }

        getFiles();
    }, []);

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

            <main className="mt-10 max-w-xl px-10 md:px-5 xl:px-0 md:max-w-5xl xl:max-w-7xl mx-auto">
                <nav className="border-t border-b border-black/10 py-1">
                    <ButtonGetFileOrFolder />
                </nav>

                <section className="mt-5 mx-auto max-w-xl md:max-w-5xl xl:max-w-7xl ">
                    <div className="text-xl text-black/50">/</div>
                    <FilesTable files={files} />
                </section>
            </main>
        </>
    );
}

export default Home;
