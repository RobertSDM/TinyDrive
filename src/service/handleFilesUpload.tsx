import { FileNode } from "../control/TreeWrapper/FileNode.ts";
import { FolderNode } from "../control/TreeWrapper/FolderNode.ts";
import { MAX_FILE_SIZE } from "../utils/enviromentVariables.ts";
import { NotificationLevels } from "../types/enums.ts";
import {
    convertArrayBufferToBase64,
    fileToFileNode,
} from "../utils/dataConvertion.ts";
import saveFile from "../fetcher/file/saveFile.ts";
import { INotification } from "../types/types.js";
import { Tree } from "../control/TreeWrapper/Tree.ts";

const readFile = (file: File): Promise<ProgressEvent<FileReader>> => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = (e: ProgressEvent<FileReader>) => {
            resolve(e);
        };
        reader.onerror = (e) => {
            console.log(e);
        };
    });
};

const handleFilesUpload = async (
    files: FileList,
    updateContent: (content: Array<FileNode | FolderNode>) => void,
    enqueue: (notification: INotification) => void,
    userId: string,
    token: string,
    currentNode: FolderNode,
    tree: Tree,
    folderId: string | null = null,
    showNotif: boolean = true
) => {
    const filePromises = Array.from(files).map(async (file) => {
        if (file.size > MAX_FILE_SIZE) {
            enqueue({
                level: NotificationLevels.INFO,
                msg: `is to big, the maximum size is ${
                    MAX_FILE_SIZE / 1_000_000
                }MBs`,
                title: "File to big",
                special: file.name.split(".")[0],
            });
            return;
        }

        const fileReader = await readFile(file);

        const [name, ...rest] = file.name.split(".");
        let extension = "";

        if (rest.length > 0) {
            extension = rest[rest.length - 1];
        }

        if (!fileReader.target) {
            return;
        }

        const base64 = convertArrayBufferToBase64(
            fileReader.target.result as ArrayBuffer
        );

        const savedFile = await saveFile(
            enqueue,
            base64,
            name,
            extension,
            fileReader.total,
            userId,
            token,
            folderId,
            showNotif
        );

        const currentFolderId = currentNode?.getId() === "" && null
        
        if (currentFolderId === folderId || savedFile.parentId === null) {
            fileToFileNode([savedFile], tree, tree.getRoot());

            updateContent([
                ...currentNode.getFiles(),
                ...currentNode.getFolders(),
            ]);
        }
    });

    Promise.all(filePromises);
};

export default handleFilesUpload;
