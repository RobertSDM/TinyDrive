import { IFile, IFolder } from "../types/index.js";
import { Tree } from "./Tree.ts";

export const convertArrayBufferToBase64 = (byteData: ArrayBuffer): string => {
    return btoa(
        new Uint8Array(byteData as ArrayBuffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
        )
    );
};

export const apiResponseToTreeNodes = (res: Array<IFile | IFolder>, tree: Tree) => {
    res.forEach((item) => {
        if (item["File"].type == "FOLDER") {
            tree.createFolderNode(
                item["Folder"].name,
                null,
                null,
                item["Folder"].id
            );
        } else {
            tree.createFileNode(item["File"].name, null, null, item["File"].id);
        }
    });
};
