export interface ITray {
    name: string;
    link: string;
}

export class FileNode {
    private name: string;
    private parentId: string = "";
    private parent: FolderNode | null = null;
    private type = "FILE" as const;
    private id: string;

    constructor(
        name: string,
        parentId: string,
        parent: FolderNode | null,
        id: string
    ) {
        this.name = name;
        this.parentId = parentId;
        this.parent = parent;
        this.id = id;
    }

    // Getter and Setter for name
    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    // Getter and Setter for parentId
    public getParentId(): string {
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
    private parentId: string;
    private type = "FOLDER" as const;
    private id: string;

    constructor(
        name: string,
        parent: FolderNode | null,
        parentId: string,
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
    public getParentId(): string {
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

    constructor() {
        this.root = new FolderNode("/", null, "", "");
        this.folderNodes.add(this.root);
    }

    public createFileNode(
        name: string,
        parent: FolderNode | null,
        parentId: string,
        id: string
    ): void {
        const node = new FileNode(name, parentId, parent, id);

        if (parent != null) {
            parent.addFile(node);
        }

        this.fileNodes.add(node);
    }

    public createFolderNode(
        name: string,
        parent: FolderNode | null,
        parentId: string,
        id: string
    ): void {
        const node = new FolderNode(name, parent, parentId, id);

        if (parent != null) {
            parent.addFolder(node);
        }

        this.folderNodes.add(node);
    }

    // Algoritmhs
    public static getTray(node: FolderNode | null): ITray[] {
        const tray = [] as ITray[];

        while (node!.getParent() != null) {
            tray.push({ name: "/", link: "" });
            tray.push({
                name: node!.getName(),
                link: `http://localhost:5173/${node?.getId()}`,
            });
            node = node!.getParent();
        }

        tray.push({
            name: node!.getName(),
            link: `http://localhost:5173${node?.getName()}`,
        });

        return tray;
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
