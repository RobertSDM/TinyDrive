// import { ReactElement } from "react";

import { IFile, IFolder } from "../types/index.js";

const isFile = (item: IFile | IFolder) => {
    return (item as IFile).fileData !== undefined;
};

const ContentTable = ({ files }: { files: Array<IFile | IFolder> }) => {
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
                    <tr key={f.id}>
                        <td className="flex justify-between">
                            <section>{f.name}</section>
                            <section>
                                <a
                                    href={`http://localhost:4500/download/${f.id}`}
                                    target="_blank"
                                    download
                                    className="py-1 px-3 bg-white border border-purple-500 hover:bg-purple-500 hover:text-white"
                                >
                                    ↓
                                </a>
                            </section>
                        </td>

                        <td className="text-center">
                            {isFile(f) ? "." + (f as IFile).fileData.extension : "-"}
                        </td>
                        <td className="text-center">
                            {isFile(f)
                                ? (f as IFile).fileData.byteSize_formatted
                                : "-"}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ContentTable;
