import { NotificationLevels } from "./enums.ts";

export interface IFile {
    name: string;
    parentId?: string;
    parent?: IFolder;
    fileData: IFileData;
    _type: "FILE";
    id: string;
    prefix: string;
    folder?: IFolder;
    // byteSize_formatted: string;
    extension: string;
    byteSize: number;
}

interface IFileData {
    id: string;
    bytesData: string;
    fileId?: string;
    file: IFile[];
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
    [Symbol.iterator]();
};

export type TSearchFolder = {
    id: string;
    name: str;
    [Symbol.iterator]();
};
