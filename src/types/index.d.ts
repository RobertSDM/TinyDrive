interface IFile {
    name: string;
    parentId?: string;
    parent?: IFolder;
    fileData: IFileData;
    type: "FILE";
    id: string
}

interface IFileData {
    id: string;
    bytesData: string;
    fileId?: string;
    file: IFile[];
    byteSize_formatted: string;
    extension: string;
    byteSize: number;
}

interface IFolder {
    id: string
    name: string;
    files: IFile[];
    parent?: IFolder;
    parentId?: string;
    childFolders: IFolder[];
    type: "FOLDER";
}

export { IFolder, IFile };
