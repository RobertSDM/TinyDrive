import { ReactElement, createContext, useState } from "react";
import { FolderNode, Tree } from "../control/Tree.ts";
import type { ITray } from "../types/types.js";

interface ITreeContext {
    currentNode: FolderNode;
    updateCurrentNode: (node: FolderNode) => FolderNode;
    tree: Tree;
    tray: ITray[];
}

export const TreeContext = createContext({} as ITreeContext);

export const TreeProvider = ({ children }: { children: ReactElement }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [tree] = useState<Tree>(new Tree());

    const [currentNode, setCurrentNode] = useState<FolderNode>(tree!.getRoot());
    const [tray, setTray] = useState<ITray[]>(currentNode.getTray());

    function updateCurrentNode(node: FolderNode): FolderNode {
        setCurrentNode(node);
        setTray(node.getTray());
        return node;
    }

    return (
        <TreeContext.Provider
            value={{ currentNode, updateCurrentNode, tree, tray }}
        >
            {children}
        </TreeContext.Provider>
    );
};
