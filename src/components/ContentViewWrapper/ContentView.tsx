import { FolderNode } from "../../control/TreeWrapper/FolderNode.ts";
import { FileNode } from "../../control/TreeWrapper/FileNode.ts";
import ContentRow from "./ContentRow.tsx";

const ContentView = ({
    content,
    setContent,
    currentNode,
    isLoading,
}: {
    content: Array<FileNode | FolderNode>;
    setContent: React.Dispatch<React.SetStateAction<(FileNode | FolderNode)[]>>;
    currentNode: FolderNode;
    isLoading: boolean;
}) => {
    return (
        <div className="mt-5 md:max-w-5xl xl:max-w-7xl mx-auto   space-y-4">
            {content.length > 0 ? (
                <section className="grid grid-flow-row gap-y-2 ">
                    <section className="grid grid-flow-col grid-cols-contentView ">
                        <span className="font-bold text-center">Name</span>
                        <span className="font-bold text-center">Extension</span>
                        <span className="font-bold text-center">Size</span>
                    </section>
                    {content.map((f) => (
                        <ContentRow
                            key={f.getId()}
                            setContent={setContent}
                            currentNode={currentNode}
                            item={f}
                        />
                    ))}
                </section>
            ) : (
                <section>
                    <span className="mx-auto flex justify-center text-black/30 font-semibold">
                        {!isLoading
                            ? "No content saved. What about start now?"
                            : "Loading..."}
                    </span>
                </section>
            )}
        </div>
    );
};

export default ContentView;
