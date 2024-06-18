import { ReactElement, createContext, useState } from "react";
import { FolderNode, ITray, Tree } from "../Tree.ts";

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

    let currentNode = tree!.getRoot();
    const [tray, setTray] = useState<ITray[]>(Tree.getTray(currentNode));

    function updateCurrentNode(node: FolderNode): FolderNode{
        currentNode = node
        setTray(Tree.getTray(node))
        return currentNode
    }

    return (
        <TreeContext.Provider
            value={{ currentNode, updateCurrentNode, tree, tray }}
        >
            {children}
        </TreeContext.Provider>
    );
};
