import { FileNode } from "../model/three/FileNode.ts";
import { FolderNode } from "../model/three/FolderNode.ts";
import { Tree } from "../model/three/Tree.ts";
import type { IFile, IFolder } from "../types/types.js";

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

    const folderNode = new FolderNode(
        folder.id,
        folder.name,
        parent && parent.getId(),
        folder.tray,
        parent
    );

    tree.addNode(folderNode);

    if (
        parent.getId() === tree.getRoot().getId() &&
        folderNode.getParentId() === null
    ) {
        tree.getRoot().addChildren(folderNode);
        folderNode.setParent(tree.getRoot());
    }

    Object.values(tree.getNodes()).forEach((node) => {
        // Is father?
        if (node.getId() === folderNode.getParentId()) {
            folderNode.setParent(node as FolderNode);
            (node as FolderNode).addChildren(folderNode);
        }
        // Is child?
        else if (node.getParentId() === folderNode.getId()) {
            node.getParent()?.removeChildren(folderNode);
            node.setParent(folderNode);
            folderNode.addChildren(node);
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

    const fileNode = new FileNode(
        file.id,
        file.name,
        file.prefix,
        file.extension,
        file.byteSize,
        parent.getId(),
        parent
    );

    tree.addNode(fileNode);
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
