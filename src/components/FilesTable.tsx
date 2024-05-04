// import { ReactElement } from "react";

import { IFile, IFolder } from "../types/index.js";

const isFile = (item: IFile | IFolder) => {
    return (item as IFile).fileData !== undefined;
};

const FilesTable = ({ files }: { files: Array<IFile | IFolder> }) => {
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
                        <td>{f.name}</td>
                        <td className="text-center">
                            {isFile(f) ? (f as IFile).fileData.extension : "-"}
                        </td>
                        <td className="text-center">
                            {isFile(f) ? (f as IFile).fileData.byteSize + "kb" : "-"}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default FilesTable;
