import type { IFile, IFolder } from "../types/types.js";
import { FolderNode } from "../control/TreeWrapper/FolderNode.ts";
import { Tree } from "../control/TreeWrapper/Tree.ts";

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
    folder: IFolder,
    tree: Tree,
    parent: FolderNode
) => {
    folder = folder as IFolder;

    const folderNode = tree.createFolderNode(
        folder.name,
        parent,
        parent && parent.getId(),
        folder.id,
        folder.tray
    );

    if (
        parent.getId() === tree.getRoot().getId() &&
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
};
export function fileArrayToFileList(files: File[]): FileList {
    const dataTransfer = new DataTransfer();

    files.forEach((file) => {
        dataTransfer.items.add(file);
    });

    return dataTransfer.files;
}

export const fileToFileNode = (file: IFile, tree: Tree, parent: FolderNode) => {
    file = file as IFile;

    if (Object.entries(file).length === 0) {
        return;
    }

    tree.createFileNode(
        file.name,
        parent,
        parent.getId(),
        file.id,
        file.prefix,
        file.extension,
        file.byteSize
    );
};

export const apiResponseToTreeNodes = (
    res: Array<IFolder | IFile>,
    tree: Tree,
    parent: FolderNode
) => {
    res.forEach((item) => {
        if ((item as IFile)["extension"] !== undefined) {
            fileToFileNode(item as IFile, tree, parent);
        } else {
            folderToFolderNode(item as IFolder, tree, parent);
        }
    });
};

export function addThreePoints(str: string, max: number) {
    if (str?.length > max) {
        return str.slice(0, max - 3) + "...";
    }
    return str;
}

export function toTitleCase(str: string) {
    const list_str = str.toLowerCase().split("");

    return `${list_str[0].toLocaleUpperCase()}${list_str.splice(1).join("")}`;
}
