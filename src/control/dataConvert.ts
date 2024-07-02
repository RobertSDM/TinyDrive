import type { IFile, IFolder } from "../types/types.d.ts";
import { FolderNode, Tree } from "./Tree.ts";

export const convertArrayBufferToBase64 = (byteData: ArrayBuffer): string => {
    return btoa(
        new Uint8Array(byteData as ArrayBuffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
        )
    );
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
