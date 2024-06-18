export interface ITray {
    name: string;
    link: string;
}

export class FileNode {
    private name: string;
    private parentId: string | null;
    private parent: FolderNode | null;
    private type = "FILE" as const;
    private id: string;

    // private byteSize_formatted: string;
    private prefix: string;
    private extension: string;
    private byteSize: number;

    constructor(
        name: string,
        parentId: string | null,
        parent: FolderNode | null,
        id: string,
        prefix: string,
        // byteSize_formatted: string,
        extension: string,
        byteSize: number
    ) {
        this.name = name;
        this.parentId = parentId;
        this.parent = parent;
        this.id = id;
        this.prefix = prefix;
        // this.byteSize_formatted = byteSize_formatted
        this.byteSize = byteSize;
        this.extension = extension;
    }

    // Getter and Setter for name
    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    // Getter and Setter for name
    public getPrefix(): string {
        return this.prefix;
    }

    public setPrefix(prefix: string): void {
        this.prefix = prefix;
    }

    // Getter and Setter for name
    public getByteSize(): number {
        return this.byteSize;
    }

    public setByteSize(byteSize: number): void {
        this.byteSize = byteSize;
    }

    // Getter and Setter for name
    public getExtension(): string {
        return this.extension;
    }

    public setExtension(extension: string): void {
        this.extension = extension;
    }

    // Getter and Setter for name
    // public getByteSizeFormatted(): string {
    //     return this.byteSize_formatted;
    // }

    // public setByteSizeFormatted(byteSize_formatted: string): void {
    //     this.byteSize_formatted = byteSize_formatted;
    // }

    // Getter and Setter for parentId
    public getParentId(): string | null {
        return this.parentId;
    }

    public setParentId(parentId: string): void {
        this.parentId = parentId;
    }

    // Getter and Setter for parent
    public getParent(): FolderNode | null {
        return this.parent;
    }

    public setParent(parent: FolderNode | null): void {
        this.parent = parent;
    }

    // Getter for type
    public getType(): "FILE" {
        return this.type;
    }

    // Getter and Setter for id
    public getId(): string {
        return this.id;
    }
}

export class FolderNode {
    private name: string;
    private files: Set<FileNode> = new Set();
    private folders: Set<FolderNode> = new Set();
    private parent: FolderNode | null = null;
    private parentId: string | null;
    private type = "FOLDER" as const;
    private id: string;

    constructor(
        name: string,
        parent: FolderNode | null,
        parentId: string | null,
        id: string
    ) {
        this.name = name;
        this.parent = parent;
        this.parentId = parentId;
        this.id = id;
    }

    public addFile(file: FileNode): void {
        this.files.add(file);
    }

    public removeFile(file: FileNode): void {
        this.files.delete(file);
    }

    public addFolder(folder: FolderNode): void {
        this.folders.add(folder);
    }

    public removeFolder(folder: FolderNode): void {
        this.folders.delete(folder);
    }

    // Getter and Setter for name
    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    // Getter and Setter for parentId
    public getParentId(): string | null {
        return this.parentId;
    }

    public setParentId(parentId: string): void {
        this.parentId = parentId;
    }

    // Getter and Setter for parent
    public getParent(): FolderNode | null {
        return this.parent;
    }

    public setParent(parent: FolderNode | null): void {
        this.parent = parent;
    }

    // Getter for files
    public getFiles(): Set<FileNode> {
        return this.files;
    }

    // Getter for folders
    public getFolders(): Set<FolderNode> {
        return this.folders;
    }

    // Getter for type
    public getType(): "FOLDER" {
        return this.type;
    }

    // Getter and Setter for id
    public getId(): string {
        return this.id;
    }
}

export class Tree {
    private root: FolderNode;
    private fileNodes: Set<FileNode> = new Set();
    private folderNodes: Set<FolderNode> = new Set();
    private nodes: Set<FolderNode | FileNode> = new Set();

    constructor() {
        this.root = new FolderNode("/", null, "", "");
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
        const node = new FileNode(name, parentId, parent, id, prefix, extension, byteSize);

        if (parent != null) {
            parent.addFile(node);
        } else {
            node.setParent(this.root);
            this.root.addFile(node);
        }

        this.fileNodes.add(node);
        this.nodes.add(node);
    }

    public createFolderNode(
        name: string,
        parent: FolderNode | null,
        parentId: string | null,
        id: string
    ): void {
        const node = new FolderNode(name, parent, parentId, id);

        if (parent != null) {
            parent.addFolder(node);
        } else {
            node.setParent(this.root);
            this.root.addFolder(node);
        }

        this.folderNodes.add(node);
        this.nodes.add(node);
    }

    // Algoritmhs
    public static getTray(node: FolderNode | null): ITray[] {
        const tray = [] as ITray[];

        tray.push({
            name: "/",
            link: `http://localhost:5173/`,
        });

        while (node!.getParent() != null) {
            if (tray.length > 1) {
                tray.push({ name: "/", link: "" });
            }
            tray.push({
                name: node!.getName(),
                link: `http://localhost:5173/folder/${node?.getId()}`,
            });
            node = node!.getParent();
        }

        return tray;
    }

    public viewTree(node: FolderNode = this.root, deep = 0) {
        if (node.getFiles().size == 0) return;

        for (const n of this.nodes.values()) {
            if (n instanceof FolderNode) {
                console.log(" ".repeat(deep * 4) + n.getName());
                this.viewTree(n, ++deep);
            } else {
                console.log(" ".repeat(deep * 4) + n.getName());
            }
        }
    }

    // Getter
    public getFileNodes(): Set<FileNode> {
        return this.fileNodes;
    }

    public getFolderNodes(): Set<FolderNode> {
        return this.folderNodes;
    }

    public getRoot(): FolderNode {
        return this.root;
    }
}
