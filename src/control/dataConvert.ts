import { IFile, IFolder } from "../types/index.js";
import { FolderNode, Tree } from "./Tree.ts";

export const convertArrayBufferToBase64 = (byteData: ArrayBuffer): string => {
    return btoa(
        new Uint8Array(byteData as ArrayBuffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
        )
    );
};

export const apiResponseToTreeNodes = (
    res: Array<IFile[] | IFolder[]>,
    tree: Tree,
    folder: FolderNode | null = null
) => {
    res[0].forEach((item) => {
        item = item as IFile;
        tree.createFileNode(
            item.name,
            folder,
            folder && folder.getId(),
            item.id,
            item.prefix,
            item.extension,
            item.byteSize
        );
    });

    res[1].forEach((item) => {
        item = item as IFolder;
        tree.createFolderNode(
            item.name,
            folder,
            folder && folder?.getId(),
            item.id
        );
    });
};
