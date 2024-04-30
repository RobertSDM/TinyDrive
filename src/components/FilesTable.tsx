// import { ReactElement } from "react";

import { IFile } from "../types/index.js";

const FilesTable = ({ files }:{files : IFile[]}) => {
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
                    <tr key={f.name}>
                        <td>{f.name}</td>
                        <td className="flex justify-center">{f.fileData.extension}</td>
                        <td className="flex justify-center">{f.fileData.byteSize}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default FilesTable;
