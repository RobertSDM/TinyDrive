import { ITray } from "../../types/types.js";
import { FileNode } from "./FileNode.ts";
import { FolderNode } from "./FolderNode.ts";

export class Tree {
    private root: FolderNode = new FolderNode("/", null, null, "", null);;
    private fileNodes = {} as {
        [key: string]: FileNode;
    };
    
    private folderNodes = {} as {
        [key: string]: FolderNode;
    };

    private nodes: Set<FileNode | FolderNode> = new Set();

    constructor() {}

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
            } else {
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
        // bool to connect or not the node to the parent
        island: boolean = false
    ): FolderNode {
        if (this.folderNodes[id] !== undefined) {
            return this.folderNodes[id];
        }

        const node = new FolderNode(name, parent, parentId, id, tray);

        if (!island) {
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

    public treeView(node: FolderNode = this.root, depth = 0) {
        if (node.getFiles().size == 0 && node.getFolders().size === 0) return;

        const listNodes = [...node.getFiles(), ...node.getFolders()] 

        for (const n of listNodes) {
            if (n instanceof FolderNode) {
                console.log(" ".repeat(depth * 4) + n.getName());
                this.treeView(n, depth + 1);
            } else {
                console.log(
                    " ".repeat(depth * 4) + n.getName() + "." + n.getExtension()
                );
            }
        }
    }

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
