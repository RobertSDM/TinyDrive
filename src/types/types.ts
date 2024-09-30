import { NotificationLevels } from "./enums.ts";

export interface IFile {
    id: string;
    parentId?: string;
    name: string;
    parent?: IFolder;
    prefix: string;
    folder?: IFolder;
    extension: string;
    byteSize: number;
}

export interface IFolder {
    id: string;
    name: string;
    files: IFile[];
    folder?: IFolder;
    folderC_id?: string;
    childFolders: IFolder[];
    _type: "FOLDER";
    tray: string;
}

export interface ITray {
    name: string;
    link: string;
}

export interface INotification {
    level: NotificationLevels;
    id?: number;
    title: string;
    msg: string;
    special?: string;
}

export type TStoredUser = {
    id: string;
    user_name: string;
    emai: string;
};

export type TSeachFile = {
    id: string;
    name: string;
    extension: string;
    byteSize: number;
    prefix: string;
    [Symbol.iterator](): IterableIterator<TSeachFile>;
};

export type TSearchFolder = {
    id: string;
    name: string;
    [Symbol.iterator](): IterableIterator<TSeachFile>;
};
