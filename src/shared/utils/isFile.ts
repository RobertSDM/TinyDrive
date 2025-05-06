import { FileNode } from "./three/FileNode.ts";
import { FolderNode } from "./three/FolderNode.ts";

export default (item: FileNode | FolderNode) => {
    return item instanceof FileNode;
};
