import { ITray } from "../../types/types.js";
import { FileNode } from "./FileNode.ts";

type TChildren = {
    [id: string]: FolderNode | FileNode;
};

export class FolderNode {
    private id: string;
    private parent: FolderNode | null;
    private name: string;
    private children: TChildren = {};
    private tray: ITray[] = [];
    private parentId: string | null;

    constructor(
        id: string,
        name: string,
        parentId: string,
        tray: string,
        parent: FolderNode | null
    ) {
        this.id = id;
        this.parent = parent;
        this.name = name;
        this.parentId = parentId;

        this.tray = this.createTray(tray);
    }

    public createTray(
        // strTray = "/some;id/path;id/here;id"
        strTray: string
    ): ITray[] {
        const tray: ITray[] = [];

        // add root
        tray.push({
            name: "/",
            link: `/`,
        });

        if (strTray === "") {
            return tray;
        }

        const sections = strTray.split("/");

        for (const part of sections) {
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

    public removeChildren(children: FolderNode | FileNode) {
        delete this.children[children.getId()];
    }

    public addChildren(children: FolderNode | FileNode) {
        this.children[children.getId()] = children;
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

    // Getter
    public getTray(): ITray[] {
        return this.tray;
    }

    // Getter and Setter for id
    public getId(): string {
        return this.id;
    }

    // Getter setter for parent
    public getParent(): FolderNode | null {
        return this.parent;
    }

    // Getter for children
    public getChildren(): TChildren {
        return this.children;
    }

    // Getter for children
    public getChildrenValues(): Array<FolderNode | FileNode> {
        return Object.values(this.children);
    }

    public setParent(parent: FolderNode | null): void {
        this.parent = parent;
    }
}
