class FolderNode {
    private _name: string;
    private _children: (FileNode | FolderNode)[];
    private _parent?: FolderNode;
    private _type = "FOLDER";

    constructor(
        name: string,
        children: (FileNode | FolderNode)[],
        parent?: FolderNode
    ) {
        this._name = name;
        this._children = children;
        this._parent = parent;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get type(): string {
        return this._type;
    }

    get children(): (FileNode | FolderNode)[] {
        return this._children;
    }

    set children(value: (FileNode & FolderNode)[]) {
        this._children = value;
    }

    get parent(): FolderNode | undefined {
        return this._parent;
    }

    set parent(value: FolderNode | undefined) {
        this._parent = value;
    }
}

class FileNode {
    private _name: string;
    private _dataType: "TEXT" | "BINARY";
    private _type: "VIDEO" | "TEXT" | "PDF" | "IMAGE";
    private _extension: string;
    private _parent?: FolderNode;
    private _textData?: string;
    private _byteData?: Blob;

    constructor(
        name: string,
        dataType: "TEXT" | "BINARY",
        extension: string,
        type: "VIDEO" | "TEXT" | "PDF" | "IMAGE",
        parent?: FolderNode,
        textData?: string,
        byteData?: Blob
    ) {
        this._name = name;
        this._dataType = dataType;
        this._type = type;
        this._extension = extension;
        this._parent = parent;
        this._textData = textData;
        this._byteData = byteData;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
    get type(): string {
        return this._type;
    }

    set type(value: "VIDEO" | "TEXT" | "PDF" | "IMAGE") {
        this._type = value;
    }

    get dataType(): string {
        return this._dataType;
    }

    set dataType(value: "TEXT" | "BINARY") {
        this._dataType = value;
    }

    get extension(): string {
        return this._extension;
    }

    set extension(value: string) {
        this._extension = value;
    }

    get parent(): FolderNode | undefined {
        return this._parent;
    }

    set parent(value: FolderNode | undefined) {
        this._parent = value;
    }

    get textData(): string | undefined {
        return this._textData;
    }

    set textData(value: string | undefined) {
        this._textData = value;
    }

    get byteData(): Blob | undefined {
        return this._byteData;
    }

    set byteData(value: Blob | undefined) {
        this._byteData = value;
    }
}

class Tree {
    private _root: FolderNode;

    constructor() {
        this._root = new FolderNode("/", []);
    }

    public createEdge(child: FileNode | FolderNode, parent: FolderNode) {
        child.parent = parent;
        parent.children.push(child);
    }

    public createFile(
        name: string,
        dataType: "TEXT" | "BINARY",
        extension: string,
        type: "VIDEO" | "TEXT" | "PDF" | "IMAGE",
        parent?: FolderNode,
        textData?: string,
        byteData?: Blob
    ) {
        const file: FileNode = new FileNode(
            name,
            dataType,
            extension,
            type,
            parent,
            textData,
            byteData
        );

        if (!parent) {
            this.createEdge(file, this._root);
        }

        return file;
    }

    public createFolder(
        name: string,
        children: (FileNode | FolderNode)[],
        parent?: FolderNode
    ) {
        const folder: FolderNode = new FolderNode(name, children, this._root);

        if (!parent) {
            this.createEdge(folder, this._root);
        }

        return folder;
    }

    public static isLeaf(node: FileNode | FolderNode) {
        if (node.type === "FOLDER") {
            const folderNode = node as FolderNode;
            return folderNode.children.length === 0;
        }

        return true;
    }
}

export default Tree;
