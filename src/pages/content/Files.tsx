import { Link, useParams } from "react-router-dom";
import {
    addThreePoints,
    apiResponseToTreeNodes,
} from "../../utils/dataConvertion.ts";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTreeContext } from "../../hooks/useContext.tsx";
import useTitle from "../../hooks/useTitle.tsx";
import useContentByFolderFetch from "../../fetcher/content/useContentByFolderFetch.ts";
import ContentView from "../../components/ContentViewWrapper/ContentView.tsx";
import ButtonUpload from "../../components/Buttons/ButtonUpload.tsx";
import { FolderNode } from "../../control/TreeWrapper/FolderNode.ts";
import { FileNode } from "../../control/TreeWrapper/FileNode.ts";

const Folder = () => {
    const [content, setContent] = useState<Array<FileNode | FolderNode>>([]);
    const { tray, tree, updateCurrentNode, currentNode } = useTreeContext();
    const setTitle = useTitle();
    const { id } = useParams();
    const lastId = useRef("");
    const { data, isLoading, fetch_ } = useContentByFolderFetch();
    const updateContent = useCallback(
        (content: Array<FileNode | FolderNode>) => {
            const newContent = content.sort(
                (a: FileNode | FolderNode, b: FileNode | FolderNode) => {
                    return a.getName().localeCompare(b.getName());
                }
            );

            setContent(newContent);
        },
        [content]
    );

    setTitle(
        currentNode.getName() !== "/"
            ? `Tiny Drive | ${addThreePoints(currentNode.getName(), 16)}`
            : "Tiny Drive"
    );

    useEffect(() => {
        let updatedNode: FolderNode | null = null;
        const nodeNodes = [
            ...(tree.getFolderNodes()[id!]?.getFolders() ?? []),
            ...(tree.getFolderNodes()[id!]?.getFiles() ?? []),
        ];

        /// Verify if the folders is on the Tree Structure
        if (nodeNodes.length > 0) {
            updatedNode = updateCurrentNode(tree.getFolderNodes()[id!]);

            updateContent([
                ...updatedNode!.getFiles(),
                ...updatedNode!.getFolders(),
            ]);
            return;
        }

        /// Verify if the id has changed to fetch new content
        updateContent([]);
        if (!data || lastId.current !== id) {
            lastId.current = id!;
            fetch_(id!);
            return;
        }

        if (isLoading) return;

        if (data) {
            if (nodeNodes.length > 0) {
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

            /// Converts the content from the api into nodes to the Tree Structure
            apiResponseToTreeNodes(data, tree, updatedNode!);

            updateContent([
                ...updatedNode!.getFiles(),
                ...updatedNode!.getFolders(),
            ]);
        }
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
                <ButtonUpload
                    updateContent={updateContent}
                    currentNode={currentNode}
                />
                <ContentView
                    content={content}
                    updateContent={updateContent}
                    currentNode={currentNode}
                    isLoading={isLoading}
                />
            </section>
        </main>
    );
};

export default Folder;
