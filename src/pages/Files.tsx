import { getByFolder } from "../connection/getAllFiles.ts";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ButtonGetFileOrFolder from "../components/ButtonGetFileOrFolder.tsx";
import { TitleContext } from "../control/context/titleContext.tsx";
import { apiResponseToTreeNodes } from "../control/dataConvert.ts";
import { TreeContext } from "../control/context/TreeContext.tsx";
import ContentTable from "../components/ContentTable.tsx";
import { FileNode, FolderNode } from "../control/Tree.ts";
import { NotificationContext } from "../control/context/NotificationSystem.tsx";

const Folder = () => {
    const [content, setContent] = useState<Array<FileNode | FolderNode>>([]);
    const { tray, tree, updateCurrentNode } = useContext(TreeContext);
    const { updateTitle } = useContext(TitleContext);
    const { id } = useParams();
    const { enqueue } = useContext(NotificationContext);

    useEffect(() => {
        updateTitle("Tiny Drive | Files", document);
        let updatedNode: FolderNode;
        setContent([]);

        if (tree.getFolderNodes()[id!] !== undefined) {
            updatedNode = updateCurrentNode(tree.getFolderNodes()[id!]);
        }

        getByFolder(id!, enqueue).then((res) => {
            if (res) {
                if (!updatedNode) {
                    const folderNode = tree.createFolderNode(
                        res["requestedFolder"].name,
                        null,
                        res["requestedFolder"].folderC_id!,
                        res["requestedFolder"].id,
                        res["requestedFolder"].tray,
                        true
                    );

                    updatedNode = updateCurrentNode(folderNode);
                }

                apiResponseToTreeNodes(res, tree, updatedNode);

                setContent([
                    ...updatedNode.getFiles(),
                    ...updatedNode.getFolders(),
                ]);

                tree.viewTree();
            }
        });
    }, [id]);

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
                    <ButtonGetFileOrFolder />
                    <ContentTable files={content} />
                </section>
            </main>
        </>
    );
};

export default Folder;
