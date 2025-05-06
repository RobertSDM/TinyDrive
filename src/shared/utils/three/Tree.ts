import { FileNode } from "./FileNode.ts";
import { FolderNode } from "./FolderNode.ts";

export class Tree {
    private root: FolderNode = new FolderNode("", "root", "", "", null);
    private nodes = {} as {
        [key: string]: FileNode | FolderNode;
    };
    constructor() {}

    public deleteFileNode(node: FileNode): void {
        node.getParent()?.removeChildren(node);
        delete this.nodes[node.getId()];
    }

    public deleteFolderNode(node: FolderNode): void {
        const children = Object.values(node.getChildren());

        if (children.length === 0) {
            node.getParent()?.removeChildren(node);
            return;
        }

        children.forEach((item) => {
            if (item instanceof FolderNode) {
                const itemChildren = Object.values(item.getChildren());

                if (itemChildren.length > 0) {
                    this.deleteFolderNode(item);
                }
                delete this.nodes[item.getId()];
            } else {
                delete this.nodes[item.getId()];
            }
        });

        node.getParent()?.removeChildren(node);
    }

    public addNode(
        node: FolderNode | FileNode,
        // bool to connect or not the node to the parent
        island: boolean = false
    ): FolderNode | void {
        if (this.nodes[node.getId()] !== undefined) {
            return;
        }

        if (node instanceof FileNode) {
            island = false;
        }

        if (!island) {
            if (node.getParent()) {
                node.getParent()?.addChildren(node);
            } else {
                node.setParent(this.root);
                this.root.addChildren(node);
            }
        }
        this.nodes[node.getId()] = node;
    }

    public printTree(node: FolderNode = this.root, depth = 0) {
        const children = Object.values(node.getChildren());

        if (children.length == 0) return;

        for (const child of children) {
            if (child instanceof FolderNode) {
                console.log(" ".repeat(depth * 4) + child.getName());
                this.printTree(child, depth + 1);
            } else {
                console.log(
                    " ".repeat(depth * 4) +
                        child.getName() +
                        "." +
                        child.getExtension()
                );
            }
        }
    }

    public getNodes(): {
        [key: string]: FileNode | FolderNode;
    } {
        return this.nodes;
    }

    public getRoot(): FolderNode {
        return this.root;
    }
}
