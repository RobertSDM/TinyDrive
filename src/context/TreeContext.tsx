import { ReactElement, createContext, useState } from "react";
import type { ITray } from "../types/types.js";
import { FolderNode } from "../utils/three/FolderNode.ts";
import { Tree } from "../utils/three/Tree.ts";
import { FileNode } from "../utils/three/FileNode.ts";

interface ITreeContext {
    currentNode: FolderNode;
    updateCurrentNode: (node: FolderNode) => FolderNode;
    tree: Tree;
    tray: ITray[];
    content: Array<FileNode | FolderNode>;
    setContent: React.Dispatch<React.SetStateAction<(FileNode | FolderNode)[]>>;
}

export const TreeContext = createContext({} as ITreeContext);

export const TreeProvider = ({ children }: { children: ReactElement }) => {
    const [tree] = useState<Tree>(new Tree());

    const [currentNode, setCurrentNode] = useState<FolderNode>(tree.getRoot());
    const [tray, setTray] = useState<ITray[]>(currentNode.getTray());
    const [content, setContent] = useState<Array<FileNode | FolderNode>>([]);

    function updateCurrentNode(node: FolderNode): FolderNode {
        setCurrentNode(node);
        setTray(node.getTray());
        return node;
    }

    return (
        <TreeContext.Provider
            value={{
                currentNode,
                updateCurrentNode,
                tree,
                tray,
                content,
                setContent,
            }}
        >
            {children}
        </TreeContext.Provider>
    );
};
