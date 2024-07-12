import { useEffect, useState } from "react";
import useTitle from "../../hooks/useTitle.tsx";
import { useTreeContext } from "../../hooks/useContext.tsx";
import useRootContentFetch from "../../fetcher/content/useRootContentFetch.ts";
import { apiResponseToTreeNodes } from "../../control/dataConvert.ts";
import ButtonGetFileOrFolder from "../../components/ButtonGetFileOrFolder.tsx";
import ContentTable from "../../components/ContentTable.tsx";
import { Link } from "react-router-dom";
import { FileNode, FolderNode } from "../../control/Tree.ts";

function Home() {
    const [content, setContent] = useState<Array<FileNode | FolderNode>>([]);
    const setTitle = useTitle();
    const { tray, tree, updateCurrentNode, currentNode } = useTreeContext();
    const { data, isLoading } = useRootContentFetch();
    setTitle("Tiny Drive");

    useEffect(() => {
        const updatedNode = updateCurrentNode(tree.getRoot());

        if(isLoading) return 
        
        // Get the root files and folders
        apiResponseToTreeNodes(data, tree, tree.getRoot());

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
}

export default Home;
