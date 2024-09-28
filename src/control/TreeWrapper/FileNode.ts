import { FolderNode } from "./FolderNode.ts";

export class FileNode {
    private name: string;
    private parentId: string | null;
    private parent: FolderNode | null;
    private type: "FILE" = "FILE";
    private id: string;

    private prefix: string;
    private extension: string;
    private byteSize: number;

    constructor(
        name: string,
        parentId: string | null,
        parent: FolderNode | null,
        id: string,
        prefix: string,
        extension: string,
        byteSize: number
    ) {
        this.name = name;
        this.parentId = parentId;
        this.parent = parent;
        this.id = id;
        this.prefix = prefix;
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
    public getType(): string {
        return this.type;
    }

    // Getter and Setter for id
    public getId(): string {
        return this.id;
    }
}
