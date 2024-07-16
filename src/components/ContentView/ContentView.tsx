import { Link } from "react-router-dom";
import { FileNode, FolderNode } from "../../control/Tree.ts";
import { BACKEND_URL } from "../../utils/index.ts";
import { useContext, useRef } from "react";
import { TreeContext } from "../../context/TreeContext.tsx";
import useDeleteFolderById from "../../fetcher/folder/deleteFolderbyId.ts";
import useDeleteFileById from "../../fetcher/file/deleteFileById.ts";
import { addThreePoints } from "../../control/dataConvert.ts";

const isFile = (item: FileNode | FolderNode) => {
    return item instanceof FileNode;
};

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
    const { tree } = useContext(TreeContext);
    const { fetch_: deleteFileById, isLoading: isDeletingFile } =
        useDeleteFileById();
    const { fetch_: deleteFolderById, isLoading: isDeletingFolder } =
        useDeleteFolderById();
    const rowDeleteId = useRef("");

    return (
        <div className="mt-5 max-w-4xl mx-auto   space-y-4">
            {content.length > 0 ? (
                <section className="grid grid-flow-row gap-y-2 ">
                    <section className="grid grid-flow-col grid-cols-contentView">
                        <span className="font-bold">Name</span>
                        <span className="font-bold">Extension</span>
                        <span className="font-bold">Size</span>
                    </section>
                    {content.map((f) => (
                        <div
                            key={f.getId()}
                            className="border grid grid-flow-col grid-cols-contentView p-2 hover:bg-purple-50 rounded-md"
                        >
                            <section className="flex items-center gap-x-2 justify-between">
                                <section
                                    className={`max-w-40 md:max-w-[70%] relative overflow-hidden ${
                                        (isDeletingFile || isDeletingFolder) &&
                                        rowDeleteId.current === f.getId() &&
                                        "text-black/50"
                                    }`}
                                >
                                    {!isFile(f) ? (
                                        <Link
                                            to={`/folder/${f.getId()}/`}
                                            className="relative"
                                        >
                                            {addThreePoints(f.getName(), 24)}
                                        </Link>
                                    ) : (
                                        <span>
                                            {addThreePoints(f.getName(), 24)}
                                        </span>
                                    )}
                                </section>
                                <section className="flex md:gap-x-3">
                                    {isFile(f) && (
                                        <section className="space-x-3">
                                            <Link
                                                to={`${BACKEND_URL}/file/download/${f.getId()}`}
                                                target="_blank"
                                                download
                                                className={`py-1 px-3 bg-white border  border-purple-500 hover:bg-purple-500 hover:text-white rounded-full ${
                                                    (isDeletingFile ||
                                                        isDeletingFolder) &&
                                                    rowDeleteId.current ===
                                                        f.getId() &&
                                                    "bg-black/50 text-white border-none hover:text-white"
                                                }`}
                                            >
                                                ↓
                                            </Link>
                                        </section>
                                    )}
                                    <section>
                                        <span
                                            className={`py-1 px-3 bg-white
                                                cursor-pointer 
                                                text-red-500 border  border-red-500 hover:bg-red-500 hover:text-white rounded-full ${
                                                    isFile(f) && "hidden"
                                                } md:inline ${
                                                (isDeletingFile ||
                                                    isDeletingFolder) &&
                                                rowDeleteId.current ===
                                                    f.getId() &&
                                                "bg-black/50 text-white border-none  hover:bg-black/50 hover:text-white"
                                            }`}
                                            onClick={async () => {
                                                rowDeleteId.current = f.getId();
                                                if (isFile(f)) {
                                                    await deleteFileById(
                                                        f.getId()
                                                    );
                                                    tree.deleteFileNode(
                                                        f as FileNode
                                                    );
                                                } else {
                                                    await deleteFolderById(
                                                        f.getId()
                                                    );
                                                    tree.deleteFolderNode(
                                                        f as FolderNode
                                                    );
                                                }

                                                setContent([
                                                    ...currentNode.getFiles(),
                                                    ...currentNode.getFolders(),
                                                ]);
                                            }}
                                        >
                                            x
                                        </span>
                                    </section>
                                </section>
                            </section>
                            <section
                                className={`text-center ${
                                    (isDeletingFile || isDeletingFolder) &&
                                    rowDeleteId.current === f.getId() &&
                                    "text-black/50"
                                }`}
                            >
                                {isFile(f)
                                    ? "." + (f as FileNode).getExtension()
                                    : "-"}
                            </section>
                            <section
                                className={`text-center ${
                                    (isDeletingFile || isDeletingFolder) &&
                                    rowDeleteId.current === f.getId() &&
                                    "text-black/50"
                                }`}
                            >
                                {isFile(f) ? (
                                    <section>
                                        <span className="font-semibold">
                                            {(f as FileNode).getByteSize()}
                                        </span>
                                        <span className="font-semibold text-sm">
                                            {(f as FileNode).getPrefix()}
                                        </span>
                                    </section>
                                ) : (
                                    "-"
                                )}
                            </section>
                        </div>
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
