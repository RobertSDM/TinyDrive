import { FileNode } from "../control/TreeWrapper/FileNode.ts";
import { FolderNode } from "../control/TreeWrapper/FolderNode.ts";

export default (item: FileNode | FolderNode) => {
    return item instanceof FileNode;
};
