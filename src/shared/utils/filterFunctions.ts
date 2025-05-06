import { FileNode } from "./three/FileNode.ts";
import { FolderNode } from "./three/FolderNode.ts";

export const orderByName = (content: Array<FileNode | FolderNode>) => {
    const newContent = content.sort(
        (a: FileNode | FolderNode, b: FileNode | FolderNode) => {
            return a.getName().localeCompare(b.getName());
        }
    );

    return newContent;
};
