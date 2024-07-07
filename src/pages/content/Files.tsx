import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ButtonGetFileOrFolder from "../../components/ButtonGetFileOrFolder.tsx";
import { apiResponseToTreeNodes } from "../../control/dataConvert.ts";
import ContentTable from "../../components/ContentTable.tsx";
import { FileNode, FolderNode } from "../../control/Tree.ts";
import {
    useNotificationSystemContext,
    useTreeContext,
    useUserContext,
} from "../../control/hooks/useContext.tsx";
import useTitle from "../../control/hooks/useTitle.tsx";
import getContentByFolder from "../../connection/content/getContentByFolder.ts";

const Folder = () => {
    const [content, setContent] = useState<Array<FileNode | FolderNode>>([]);
    const { tray, tree, updateCurrentNode, currentNode } = useTreeContext();
    const setTitle = useTitle();
    const { id } = useParams();
    const { enqueue } = useNotificationSystemContext();
    const user = JSON.parse(localStorage.getItem("user-info")!);
    const { token } = useUserContext();

    useEffect(() => {
        setTitle("Tiny Drive | Files");
        let updatedNode: FolderNode;
        setContent([]);

        if (tree.getFolderNodes()[id!] !== undefined) {
            updatedNode = updateCurrentNode(tree.getFolderNodes()[id!]);
        }

        getContentByFolder(id!, user.id, enqueue, token).then((res) => {
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
    );
};

export default Folder;
