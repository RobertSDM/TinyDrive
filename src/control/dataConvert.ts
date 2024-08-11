import type { IFile, IFolder } from "../types/types.d.ts";
import { FolderNode } from "./TreeWrapper/FolderNode.ts";
import { Tree } from "./TreeWrapper/Tree.ts";

export const convertArrayBufferToBase64 = (byteData: ArrayBuffer): string => {
    return btoa(
        new Uint8Array(byteData).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
        )
    );
};

export const convertBase64ToArrayBuffer = (base64: string): ArrayBuffer => {
    const binaryString = atob(base64);

    const len = binaryString.length;
    const byteArray = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
        byteArray[i] = binaryString.charCodeAt(i);
    }

    return byteArray.buffer;
};

export const folderToFolderNode = (
    folders: IFolder[],
    tree: Tree,
    folder: FolderNode
) => {
    folders.forEach((item) => {
        item = item as IFolder;

        const folderNode = tree.createFolderNode(
            item.name,
            folder,
            folder && folder.getId(),
            item.id,
            item.tray
        );

        if (
            folder.getId() === tree.getRoot().getId() &&
            folderNode.getParentId() === null
        ) {
            tree.getRoot().addFolder(folderNode);
            folderNode.setParent(tree.getRoot());
        }

        Object.values(tree.getFolderNodes()).forEach((node) => {
            // Is father?
            if (node.getId() === folderNode.getParentId()) {
                folderNode.setParent(node);
                node.addFolder(folderNode);
            }
            // Is child?
            else if (node.getParentId() === folderNode.getId()) {
                node.getParent()?.removeFolder(folderNode);
                node.setParent(folderNode);
                folderNode.addFolder(node);
            }
        });
    });
};

export const fileToFileNode = (
    files: IFile[],
    tree: Tree,
    folder: FolderNode
) => {
    files.forEach((item) => {
        item = item as IFile;

        tree.createFileNode(
            item.name,
            folder,
            folder.getId(),
            item.id,
            item.prefix,
            item.extension,
            item.byteSize
        );
    });
};

export const apiResponseToTreeNodes = (
    res: { files: IFile[]; folders: IFolder[] },
    tree: Tree,
    folder: FolderNode
) => {
    folderToFolderNode(res["folders"], tree, folder);

    fileToFileNode(res["files"], tree, folder);
};

export function addThreePoints(str: string, max: number) {
    if (str.length > max) {
        return str.slice(0, max - 3) + "...";
    }
    return str;
}

export function toTitleCase(str: string) {
    const list_str = str.toLowerCase().split("");

    return `${list_str[0].toLocaleUpperCase()}${list_str.splice(1).join("")}`;
}
