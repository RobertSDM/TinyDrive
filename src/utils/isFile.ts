import { FileNode } from "../model/three/FileNode.ts";
import { FolderNode } from "../model/three/FolderNode.ts";

export default (item: FileNode | FolderNode) => {
    return item instanceof FileNode;
};
