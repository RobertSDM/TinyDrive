import downloadFile from "../fetcher/file/downloadFile.ts";
import saveFile from "../fetcher/file/saveFile.ts";
import { NotificationLevels } from "../types/enums.ts";
import {
    convertArrayBufferToBase64,
    convertBase64ToArrayBuffer,
    fileToFileNode,
} from "../utils/dataConvertion.ts";
import { MAX_FILE_SIZE } from "../utils/enviromentVariables.ts";
import { updateContent } from "../utils/filterFunctions.ts";
import {
    useNotificationSystemContext,
    useTreeContext,
    useUserContext,
} from "./useContext.tsx";

export const useFileDownload = (fileId: string) => {
    const {
        user: { id: userId },
        token,
    } = useUserContext();

    return async () => {
        const { data, name } = await downloadFile(userId, fileId, token);

        const buffer = convertBase64ToArrayBuffer(data);

        const blob = new Blob([buffer]);

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", name);
        link.click();

        window.URL.revokeObjectURL(url);
    };
};

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

export const useHandleFilesUpload = (
    showNotif: boolean = true
): ((files: FileList, folderId: string | null) => Promise<void>) => {
    const {
        user: { id: userId },
        token,
    } = useUserContext();
    const { currentNode, tree, setContent } = useTreeContext();
    const { enqueue } = useNotificationSystemContext();

    return async (files: FileList, folderId: string | null = null) => {
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

            const currentFolderId = currentNode?.getId() === "" && null;

            if (currentFolderId === folderId || savedFile.parentId === null) {
                fileToFileNode([savedFile], tree, tree.getRoot());

                setContent(
                    updateContent([
                        ...currentNode.getFiles(),
                        ...currentNode.getFolders(),
                    ])
                );
            }
        });

        Promise.all(filePromises);
    };
};
