import { Link, useParams } from "react-router-dom";
import { apiResponseToTreeNodes } from "../../control/dataConvert.ts";
import { useEffect, useState } from "react";
import { useTreeContext } from "../../hooks/useContext.tsx";
import useTitle from "../../hooks/useTitle.tsx";
import { FileNode, FolderNode } from "../../control/Tree.ts";
import useContentByFolderFetch from "../../fetcher/content/useContentByFolderFetch.ts";
import ContentTable from "../../components/ContentTable.tsx";
import ButtonGetFileOrFolder from "../../components/ButtonGetFileOrFolder.tsx";

const Folder = () => {
    const [content, setContent] = useState<Array<FileNode | FolderNode>>([]);
    const { tray, tree, updateCurrentNode, currentNode } = useTreeContext();
    const setTitle = useTitle();
    const { id } = useParams();
    const { data, isLoading, fetch_ } = useContentByFolderFetch();
    setTitle("Tiny Drive | Files");

    useEffect(() => {
        fetch_(id!);
        let updatedNode: FolderNode | null = null;

        setContent([]);
        if (isLoading) return;

        if (tree.getFolderNodes()[id!] !== undefined) {
            updatedNode = updateCurrentNode(tree.getFolderNodes()[id!]);
        }

        if (!updatedNode) {
            const folderNode = tree.createFolderNode(
                data["requestedFolder"].name,
                null,
                data["requestedFolder"].folderC_id!,
                data["requestedFolder"].id,
                data["requestedFolder"].tray,
                true
            );

            updatedNode = updateCurrentNode(folderNode);
        }

        apiResponseToTreeNodes(data, tree, updatedNode);

        setContent([...updatedNode.getFiles(), ...updatedNode.getFolders()]);

        // tree.viewTree();
    }, [id, data]);

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
                    isLoading={isLoading}
                />
            </section>
        </main>
    );
};

export default Folder;
