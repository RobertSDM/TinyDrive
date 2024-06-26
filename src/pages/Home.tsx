import { useContext, useEffect, useState } from "react";
import ContentTable from "../components/ContentTable.tsx";
import ButtonGetFileOrFolder from "../components/ButtonGetFileOrFolder.tsx";
import { TitleContext } from "../control/context/titleContext.tsx";
import { Link } from "react-router-dom";
import { TreeContext } from "../control/context/TreeContext.tsx";
import { getAllRootFiles } from "../connection/getAllFiles.ts";
import { FileNode, FolderNode } from "../control/Tree.ts";
import { apiResponseToTreeNodes } from "../control/dataConvert.ts";
import { NotificationContext } from "../control/context/NotificationSystem.tsx";

function Home() {
    const [content, setContent] = useState<Array<FileNode | FolderNode>>([]);
    const { updateTitle } = useContext(TitleContext);
    const { tray, tree, updateCurrentNode, currentNode } =
        useContext(TreeContext);
    const { enqueue } = useContext(NotificationContext);

    useEffect(() => {
        updateTitle("Tiny Drive", document);

        const updatedNode = updateCurrentNode(tree.getRoot());

        // Get the root files and folders
        getAllRootFiles(enqueue).then((res) => {
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
            <header className="flex border px-8 py-4 items-center ">
                <Link
                    to={"/"}
                    className="text-2xl font-bold cursor-pointer text-purple-500"
                >
                    Tiny Drive
                </Link>
                {/* <div className="mx-auto border-black/40 border rounded-sm items-center cursor-pointer relative w-2/4">
                    <SearchInput />
                </div> */}
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
