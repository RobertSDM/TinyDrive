import { ITray } from "../../types/types.js";
import { FileNode } from "./FileNode.ts";

export class FolderNode {
    private name: string;
    private files: Set<FileNode> = new Set();
    private folders: Set<FolderNode> = new Set();
    private tray: ITray[];
    private parent: FolderNode | null = null;
    private parentId: string | null;
    private type = "FOLDER" as const;
    private id: string;

    constructor(
        name: string,
        parent: FolderNode | null,
        parentId: string | null,
        id: string,
        tray: string | ITray[] | null
    ) {
        this.name = name;
        this.parent = parent;
        this.parentId = parentId;
        this.id = id;
        if ((tray as ITray[])?.map !== undefined && tray !== null) {
            this.tray = tray as ITray[];
        } else {
            this.tray = this.createTray(tray as string);
        }
    }

    private createTray(strTray: string | null): ITray[] {
        const tray: ITray[] = [];
        tray.push({
            name: "/",
            link: `/`,
        });
        if (!strTray) {
            return tray;
        }
        const parts = strTray.split("/");

        for (const part of parts) {
            if (tray.length > 1) {
                tray.push({ name: "/", link: "" });
            }

            const [name, id] = part.split(";");

            tray.push({
                name: name,
                link: `/folder/${id}`,
            });
        }

        return tray;
    }

    public addFile(file: FileNode): void {
        this.files.add(file);
    }

    public addFolder(folder: FolderNode): void {
        this.folders.add(folder);
    }

    public removeFile(file: FileNode): void {
        this.files.delete(file);
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

    // Getter
    public getTray(): ITray[] {
        return this.tray;
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
