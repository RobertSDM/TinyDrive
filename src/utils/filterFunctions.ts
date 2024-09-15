import { FileNode } from "../control/TreeWrapper/FileNode.ts";
import { FolderNode } from "../control/TreeWrapper/FolderNode.ts";

export const updateContent = (content: Array<FileNode | FolderNode>) => {
    const newContent = content.sort(
        (a: FileNode | FolderNode, b: FileNode | FolderNode) => {
            return a.getName().localeCompare(b.getName());
        }
    );

    return newContent;
};
