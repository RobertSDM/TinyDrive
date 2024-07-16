import { Link, useParams } from "react-router-dom";
import { apiResponseToTreeNodes } from "../../control/dataConvert.ts";
import { useEffect, useRef, useState } from "react";
import { useTreeContext } from "../../hooks/useContext.tsx";
import useTitle from "../../hooks/useTitle.tsx";
import { FileNode, FolderNode } from "../../control/Tree.ts";
import useContentByFolderFetch from "../../fetcher/content/useContentByFolderFetch.ts";
import ContentView from "../../components/ContentView/ContentView.tsx";
import ButtonUpload from "../../components/ButtonUpload.tsx";

const Folder = () => {
    const [content, setContent] = useState<Array<FileNode | FolderNode>>([]);
    const { tray, tree, updateCurrentNode, currentNode } = useTreeContext();
    const setTitle = useTitle();
    const { id } = useParams();
    const lastId = useRef("");
    const { data, isLoading, fetch_ } = useContentByFolderFetch();
    setTitle("Tiny Drive | Files");

    useEffect(() => {
        let updatedNode: FolderNode | null = null;

        /// Verify if the folders is on the Tree Structure
        if (
            [
                ...(tree.getFolderNodes()[id!]?.getFolders() ?? []),
                ...(tree.getFolderNodes()[id!]?.getFiles() ?? []),
            ].length > 0
        ) {
            updatedNode = updateCurrentNode(tree.getFolderNodes()[id!]);

            setContent([
                ...updatedNode.getFiles(),
                ...updatedNode.getFolders(),
            ]);
            return;
        }

        /// Verify if the id has changed to fetch new content
        setContent([]);
        if (!data || lastId.current !== id) {
            lastId.current = id!;
            fetch_(id!);
            return;
        }

        if (isLoading) return;

        if (data) {
            if (
                [
                    ...(tree.getFolderNodes()[id!]?.getFolders() ?? []),
                    ...(tree.getFolderNodes()[id!]?.getFiles() ?? []),
                ].length > 0
            ) {
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
            apiResponseToTreeNodes(data, tree, updatedNode);

            setContent([
                ...updatedNode.getFiles(),
                ...updatedNode.getFolders(),
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
                    setContent={setContent}
                    currentNode={currentNode}
                />
                <ContentView
                    content={content}
                    setContent={setContent}
                    currentNode={currentNode}
                    isLoading={isLoading}
                />
            </section>
        </main>
    );
};

export default Folder;
