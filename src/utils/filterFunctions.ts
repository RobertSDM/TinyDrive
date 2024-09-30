import { FileNode } from "../model/three/FileNode.ts";
import { FolderNode } from "../model/three/FolderNode.ts";

export const orderByName = (content: Array<FileNode | FolderNode>) => {
    const newContent = content.sort(
        (a: FileNode | FolderNode, b: FileNode | FolderNode) => {
            return a.getName().localeCompare(b.getName());
        }
    );

    return newContent;
};
