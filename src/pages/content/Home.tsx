import { useEffect, useState } from "react";
import useTitle from "../../hooks/useTitle.tsx";
import { useTreeContext } from "../../hooks/useContext.tsx";
import useRootContentFetch from "../../fetcher/content/useRootContentFetch.ts";
import { apiResponseToTreeNodes } from "../../control/dataConvert.ts";
import ButtonUpload from "../../components/Buttons/ButtonUpload.tsx";
import ContentView from "../../components/ContentViewWrapper/ContentView.tsx";
import { Link } from "react-router-dom";
import { FileNode } from "../../control/TreeWrapper/FileNode.ts";
import { FolderNode } from "../../control/TreeWrapper/FolderNode.ts";

function Home() {
    const [content, setContent] = useState<Array<FileNode | FolderNode>>([]);
    const { tray, tree, updateCurrentNode, currentNode } = useTreeContext();
    const { data, isLoading, fetch_ } = useRootContentFetch();

    const setTitle = useTitle();
    setTitle("Tiny Drive");

    useEffect(() => {
        const updatedNode = updateCurrentNode(tree.getRoot());
        const children = [
            ...updatedNode.getFiles(),
            ...updatedNode.getFolders(),
        ];
        if (children.length > 0) {
            setContent([
                ...updatedNode.getFiles(),
                ...updatedNode.getFolders(),
            ]);
            return;
        }
        if (!data) {
            fetch_();
        }
        if (isLoading) return;
        // Get the root files and folders
        apiResponseToTreeNodes(data!, tree, tree.getRoot());
        setContent([...updatedNode.getFiles(), ...updatedNode.getFolders()]);
        // tree.viewTree();
    }, [data]);

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
}

export default Home;
