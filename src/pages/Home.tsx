import { useEffect, useState } from "react";
import ContentTable from "../components/ContentTable.tsx";
import ButtonGetFileOrFolder from "../components/ButtonGetFileOrFolder.tsx";
import { Link } from "react-router-dom";
import { getAllRootFiles } from "../connection/getAllFiles.ts";
import { FileNode, FolderNode } from "../control/Tree.ts";
import { apiResponseToTreeNodes } from "../control/dataConvert.ts";
import {
    useNotificationSystemContext,
    useTreeContext,
    useUserContext,
} from "../control/hooks/useContext.tsx";
import useTitle from "../control/hooks/useTitle.tsx";

function Home() {
    const [content, setContent] = useState<Array<FileNode | FolderNode>>([]);
    const setTitle = useTitle();
    const { tray, tree, updateCurrentNode, currentNode } = useTreeContext();
    const { enqueue } = useNotificationSystemContext();
    const { logoutUser } = useUserContext();
    const user = JSON.parse(localStorage.getItem("user-info")!);

    useEffect(() => {
        setTitle("Tiny Drive");

        const updatedNode = updateCurrentNode(tree.getRoot());

        // Get the root files and folders
        getAllRootFiles(user.id, enqueue).then((res) => {
            if (res) {
                apiResponseToTreeNodes(res, tree, tree.getRoot());

                setContent([
                    ...updatedNode.getFiles(),
                    ...updatedNode.getFolders(),
                ]);
                tree.viewTree();
            }
        });
    }, []);

    return (
        <>
            <header className="flex border px-8 py-4 items-center justify-between h-20">
                <Link
                    to={"/"}
                    className="text-2xl font-bold cursor-pointer text-purple-500"
                >
                    Tiny Drive
                </Link>
                {/* <div className="mx-auto border-black/40 border rounded-sm items-center cursor-pointer relative w-2/4">
                    <SearchInput />
                </div> */}
                <button
                    className="px-3 py-2 bg-red-500 text-white font-semibold hover:bg-white hover:border hover:border-current hover:border-red-500 hover:text-red-500 text-sm"
                    onClick={() => {
                        logoutUser();
                    }}
                >
                    Logout
                </button>
            </header>

            <main className="mt-10 max-w-xl px-10 md:px-5 xl:px-0 md:max-w-5xl xl:max-w-7xl mx-auto">
                <nav className="text-xl text-black/50">
                    {tray.map((item, index) => {
                        return (
                            <Link
                                className={`${
                                    item.link != "" &&
                                    "hover:bg-purple-200 p-1 hover:rounded-md"
                                }`}
                                key={index}
                                to={item.link}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <section className="mt-5 mx-auto max-w-xl md:max-w-5xl xl:max-w-7xl border-t border-black/10 py-4 space-y-16">
                    <ButtonGetFileOrFolder
                        setContent={setContent}
                        currentNode={currentNode}
                    />
                    <ContentTable
                        files={content}
                        setContent={setContent}
                        currentNode={currentNode}
                    />
                </section>
            </main>
        </>
    );
}

export default Home;
