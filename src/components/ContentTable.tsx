// import { ReactElement } from "react";

import { Link } from "react-router-dom";
import { FileNode, FolderNode } from "../control/Tree.ts";
// import { IFile, IFolder } from "../types/index.js";

const isFile = (item: FileNode | FolderNode) => {
    return item instanceof FileNode;
};

const ContentTable = ({ files }: { files: Array<FileNode | FolderNode> }) => {
    return (
        <table className="mt-5 w-full">
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
                                    <Link
                                        to={`http://localhost:5173/folder/${f.getId()}`}
                                    >
                                        {f.getName()}
                                    </Link>
                                ) : (
                                    <span>{f.getName()}</span>
                                )}
                            </section>
                            {f instanceof FileNode && (
                                <section>
                                    <Link
                                        to={`http://localhost:4500/download/${f.getId()}`}
                                        target="_blank"
                                        download
                                        className="py-1 px-3 bg-white border  border-purple-500 hover:bg-purple-500 hover:text-white rounded-full"
                                    >
                                        ↓
                                    </Link>
                                </section>
                            )}
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
        </table>
    );
};

export default ContentTable;
