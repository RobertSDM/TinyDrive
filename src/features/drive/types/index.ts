export type FileMetadata = {
    name: string;
    extension: string;
    size: number;
    fullname: string;
};

export type FilePayload = {
    metadata: FileMetadata;
    file: Blob;
};

export type FolderPayload = {
    files: FileList;
    folderId?: string;
    metadata: {
        name: string;
    };
};
