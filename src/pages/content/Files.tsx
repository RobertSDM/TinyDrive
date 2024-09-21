import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import ButtonUpload from "../../components/Buttons/ButtonUpload.tsx";
import ContentView from "../../components/ContentViewWrapper/ContentView.tsx";
import { FolderNode } from "../../control/TreeWrapper/FolderNode.ts";
import useContentByFolderFetch from "../../fetcher/content/useContentByFolderFetch.ts";
import { useTreeContext } from "../../hooks/useContext.tsx";
import useTitle from "../../hooks/useTitle.tsx";
import {
    addThreePoints,
    apiResponseToTreeNodes,
} from "../../utils/dataConvertion.ts";
import { orderByName } from "../../utils/filterFunctions.ts";

const Folder = () => {
    const { tray, tree, updateCurrentNode, currentNode, content, setContent } =
        useTreeContext();
    const setTitle = useTitle();
    const { id } = useParams();
    const lastId = useRef("");
    const { data, isLoading, fetch_ } = useContentByFolderFetch();

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

            setContent(
                orderByName([
                    ...updatedNode!.getFiles(),
                    ...updatedNode!.getFolders(),
                ])
            );
            return;
        }

        /// Verify if the id has changed to fetch new content
        setContent(orderByName([]));
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

            setContent(
                orderByName([
                    ...updatedNode!.getFiles(),
                    ...updatedNode!.getFolders(),
                ])
            );
        }
    }, [id, data]);

    return (
        <main className="mt-10 w-full md:max-w-[90%] px-10 mx-auto mb-20">
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

            <section className="mt-5 mx-auto border-t border-black/10 py-4 space-y-10 mb-10">
                <ButtonUpload />
            </section>
            <ContentView id={id} content={content} isLoading={isLoading} />
        </main>
    );
};

export default Folder;
