// import { ReactElement } from "react";

import { Link } from "react-router-dom";
import { FileNode, FolderNode } from "../control/Tree.ts";
import { BACKEND_URL } from "../utils/index.ts";
import { deleteFileById } from "../connection/deleteFile.ts";
import { useContext } from "react";
import { NotificationContext } from "../control/context/NotificationSystem.tsx";
import { TreeContext } from "../control/context/TreeContext.tsx";
import deleteFolderById from "../connection/deleteFolder.ts";
// import { IFile, IFolder } from "../types/index.js";

const isFile = (item: FileNode | FolderNode) => {
    return item instanceof FileNode;
};

const ContentTable = ({
    files,
    setContent,
    currentNode,
}: {
    files: Array<FileNode | FolderNode>;
    setContent: React.Dispatch<React.SetStateAction<(FileNode | FolderNode)[]>>;
    currentNode: FolderNode;
}) => {
    const { enqueue } = useContext(NotificationContext);
    const { tree } = useContext(TreeContext);

    return (
        <table className="mt-5 w-full">
            {files.length > 0 ? (
                <>
                    <thead>
                        <tr>
                            <td className="font-bold w-[60%]">Nome</td>
                            <td className="font-bold">Tipo</td>
                            <td className="font-bold">Tamanho</td>
                        </tr>
                    </thead>
                    <tbody>
                        {files.map((f) => (
                            <tr key={f.getId()}>
                                <td className="flex justify-between">
                                    <section>
                                        {f instanceof FolderNode ? (
                                            <Link to={`/folder/${f.getId()}`}>
                                                {f.getName()}
                                            </Link>
                                        ) : (
                                            <span>{f.getName()}</span>
                                        )}
                                    </section>
                                    <section className="flex gap-x-3">
                                        {f instanceof FileNode && (
                                            <section className="space-x-3">
                                                <Link
                                                    to={`${BACKEND_URL}/download/${f.getId()}`}
                                                    target="_blank"
                                                    download
                                                    className="py-1 px-3 bg-white border  border-purple-500 hover:bg-purple-500 hover:text-white rounded-full"
                                                >
                                                    ↓
                                                </Link>
                                            </section>
                                        )}
                                        <section>
                                            <span
                                                className="py-1 px-3 bg-white
                                                cursor-pointer 
                                                text-red-500 border  border-red-500 hover:bg-red-500 hover:text-white rounded-full"
                                                onClick={async () => {
                                                    if (f instanceof FileNode) {
                                                        await deleteFileById(
                                                            enqueue,
                                                            f.getId()
                                                        );
                                                        tree.deleteFileNode(f);
                                                    } else {
                                                        await deleteFolderById(
                                                            enqueue,
                                                            f.getId()
                                                        );
                                                        tree.deleteFolderNode(
                                                            f
                                                        );
                                                    }
                                                    console.log(
                                                        currentNode.getFolders()
                                                    );

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
                                </td>

                                <td className="text-center ">
                                    {isFile(f)
                                        ? "." + (f as FileNode).getExtension()
                                        : "-"}
                                </td>
                                <td className="text-center">
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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </>
            ) : (
                <tbody>
                    <tr className="border-0 hover:bg-transparent">
                        <td className="mx-auto flex justify-center text-black/30 font-semibold">
                            Nenhum arquivo salvo
                        </td>
                    </tr>
                </tbody>
            )}
        </table>
    );
};

export default ContentTable;
