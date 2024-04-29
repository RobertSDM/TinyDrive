import { DataType, FileType } from "@prisma/client";

interface IFile {
    type: FileType;
    name: string;
    folder?: IFolder;
    fileData: IFileData;
}

interface IFileData {
    bytesData: Buffer;
    textData: string;
    file: IFile[];
    dataType: DataType;
    extension: string;
}

interface IFolder {
    name: string;
    files: IFile[];
    parent?: IFolder;
    childFolders: IFolder[];
    type: "FOLDER";
}

export { IFolder };
