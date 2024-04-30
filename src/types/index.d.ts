interface IFile {
    name: string;
    parentId?: string;
    parent?: IFolder;
    fileData: IFileData;
    type: "FILE";
}

interface IFileData {
    bytesData: string;
    fileId?: string;
    file: IFile[];
    extension: string;
    byteSize: number;
}

interface IFolder {
    name: string;
    files: IFile[];
    parent?: IFolder;
    parentId?: string;
    childFolders: IFolder[];
    type: "FOLDER";
}

export { IFolder, IFile };
