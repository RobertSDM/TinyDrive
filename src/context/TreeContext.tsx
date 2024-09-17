import { ReactElement, createContext, useState } from "react";
import { Tree } from "../control/TreeWrapper/Tree.ts";
import type { ITray } from "../types/types.js";
import { FolderNode } from "../control/TreeWrapper/FolderNode.ts";
import { FileNode } from "../control/TreeWrapper/FileNode.ts";

interface ITreeContext {
    currentNode: FolderNode;
    updateCurrentNode: (node: FolderNode) => FolderNode;
    tree: Tree;
    tray: ITray[];
    content: Array<FileNode | FolderNode>;
    setContent: (content: Array<FileNode | FolderNode>) => void;
}

export const TreeContext = createContext({} as ITreeContext);

export const TreeProvider = ({ children }: { children: ReactElement }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [tree] = useState<Tree>(new Tree());

    const [currentNode, setCurrentNode] = useState<FolderNode>(tree!.getRoot());
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
