import { ITray } from "../../types/types.js";
import { FileNode } from "./FileNode.ts";
import { FolderNode } from "./FolderNode.ts";

export class Tree {
    private root: FolderNode;
    private fileNodes = {} as {
        [key: string]: FileNode;
    };
    private folderNodes = {} as {
        [key: string]: FolderNode;
    };
    private nodes: Set<FileNode | FolderNode> = new Set();

    constructor() {
        this.root = new FolderNode("/", null, null, "", null);
    }

    public deleteFileNode(node: FileNode): void {
        node.getParent()?.removeFile(node);
        delete this.fileNodes[node.getId()];
    }

    public deleteFolderNode(node: FolderNode): void {
        const list = [...node.getFiles(), ...node.getFolders()];

        if (list.length === 0) {
            node.getParent()?.removeFolder(node);
            return;
        }

        list.forEach((item) => {
            if (item instanceof FolderNode) {
                if (item.getFolders().size > 0 || item.getFiles().size > 0) {
                    this.deleteFolderNode(item);
                }
                delete this.folderNodes[item.getId()];
            } else if (item instanceof FileNode) {
                delete this.fileNodes[item.getId()];
            }
        });
        node.getParent()?.removeFolder(node);
    }

    public createFileNode(
        name: string,
        parent: FolderNode | null,
        parentId: string | null,
        id: string,
        prefix: string,
        // byteSize_formatted: string,
        extension: string,
        byteSize: number
    ): void {
        if (this.fileNodes[id] !== undefined) {
            return;
        }

        const node = new FileNode(
            name,
            parentId,
            parent,
            id,
            prefix,
            extension,
            byteSize
        );

        if (parent != null) {
            parent.addFile(node);
        } else {
            node.setParent(this.root);
            this.root.addFile(node);
        }

        this.fileNodes[node.getId()] = node;
        this.nodes.add(node);
    }

    public createFolderNode(
        name: string,
        parent: FolderNode | null,
        parentId: string | null,
        id: string,
        tray: string | ITray[],
        dift: boolean = false
    ): FolderNode {
        if (this.folderNodes[id] !== undefined) {
            return this.folderNodes[id];
        }

        const node = new FolderNode(name, parent, parentId, id, tray);

        if (!dift) {
            if (parent != null) {
                parent.addFolder(node);
            } else {
                node.setParent(this.root);
                this.root.addFolder(node);
            }
        }

        this.folderNodes[node.getId()] = node;
        this.nodes.add(node);
        return node;
    }

    // Algoritmhs

    public viewTree(node: FolderNode = this.root, deep = 0) {
        if (node.getFiles().size == 0 && node.getFolders().size === 0) return;

        for (const n of [...node.getFiles(), ...node.getFolders()]) {
            if (n instanceof FolderNode) {
                console.log(" ".repeat(deep * 4) + n.getName());
                this.viewTree(n, deep + 1);
            } else {
                console.log(
                    " ".repeat(deep * 4) + n.getName() + "." + n.getExtension()
                );
            }
        }
    }

    // Getter
    public getFileNodes(): {
        [key: string]: FileNode;
    } {
        return this.fileNodes;
    }

    public getNodes(): Set<FileNode | FolderNode> {
        return this.nodes;
    }

    public getFolderNodes(): {
        [key: string]: FolderNode;
    } {
        return this.folderNodes;
    }

    public getRoot(): FolderNode {
        return this.root;
    }
}
