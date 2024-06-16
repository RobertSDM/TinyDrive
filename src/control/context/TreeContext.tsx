import { ReactElement, createContext, useState } from "react";
import { FolderNode, ITray, Tree } from "../Tree.ts";

interface ITreeContext {
    currentNode: FolderNode;
    updateCurrentNode: (node: FolderNode) => void;
    tree: Tree;
    tray: ITray[];
}

export const TreeContext = createContext({} as ITreeContext);

export const TreeProvider = ({ children }: { children: ReactElement }) => {
    const tree = new Tree();
    const [currentNode, setCurrentNode] = useState<FolderNode>(tree.getRoot());
    let tray = Tree.getTray(currentNode);

    function updateCurrentNode(node: FolderNode){
        setCurrentNode(node)
        tray = Tree.getTray(node)
    }

    return (
        <TreeContext.Provider
            value={{ currentNode, updateCurrentNode, tree, tray }}
        >
            {children}
        </TreeContext.Provider>
    );
};
