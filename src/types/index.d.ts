interface IFile {
    name: string;
    parentId?: string;
    parent?: IFolder;
    fileData: IFileData;
    _type: "FILE";
    id: string;
    prefix: string;
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

interface IFolder {
    id: string;
    name: string;
    files: IFile[];
    parent?: IFolder;
    parentId?: string;
    childFolders: IFolder[];
    _type: "FOLDER";
}

export { IFolder, IFile };
