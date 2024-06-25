import { ChangeEvent } from "react";
import saveFile from "../connection/saveFile.ts";
import { convertArrayBufferToBase64 } from "./dataConvert.ts";
import saveFolder from "../connection/saveFolder.ts";
import { FolderNode } from "./Tree.ts";
import { INotification } from "../types/types.js";

const handleFolder = async (
    event: ChangeEvent<HTMLInputElement>,
    node: FolderNode,
    enqueue: (notification: INotification) => void
) => {
    let folderId: string | null = null;
    // const parentId = node.getParent()?.getId() ?? null;
    let readIndex = 0;
    const memo = {} as {
        [key: string]: string;
    };
    const files = event.target.files!;

    async function readFolder(
        path: string[],
        file: File,
        parentId: string | null,
        cut = 0
    ) {
        if (path.length > 2) {
            return readFolder(path.slice(cut + 1), file, parentId, cut + 1);
        }

        const folderName = path[0];
        if (memo[folderName] === undefined) {
            folderId = await saveFolder(folderName, parentId, enqueue);
            memo[folderName] = folderId!;
        }
        console.log("Pasta salva : " + folderName);

        const e: ProgressEvent<FileReader> = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = (e: ProgressEvent<FileReader>) => {
                resolve(e);
            };
            reader.onerror = (e) => {
                console.log(e);
            };
        });

        const extractedContent = file.name.split(".");
        const name = extractedContent[0];
        let extension;
        if (extractedContent.length > 1) {
            extension = extractedContent[extractedContent.length - 1];
        } else {
            extension = "";
        }

        const base64 = convertArrayBufferToBase64(
            e.target!.result as ArrayBuffer
        );

        console.log("Arquivo salvo : " + name);
        saveFile(enqueue, base64, folderId, name, extension, e.total);

        return;
    }

    if (event.target.files) {
        while (readIndex < files.length) {
            await readFolder(
                files[readIndex].webkitRelativePath.split("/"),
                files[readIndex],
                folderId
            );
            readIndex++;
        }
    }
};

const handleFile = (
    event: ChangeEvent<HTMLInputElement>,
    enqueue: (notification: INotification) => void
) => {
    const reader = new FileReader();
    const fileList = event.target.files!;
    let readIndex = 0;

    while (readIndex < fileList.length) {
        const file = fileList[readIndex];
        reader.readAsArrayBuffer(file);

        reader.onload = (e) => {
            const extractedContent = file.name.split(".");

            const name = extractedContent[0];
            let extension;
            if (extractedContent.length > 1) {
                extension = extractedContent[extractedContent.length - 1];
            } else {
                extension = "";
            }

            const base64 = convertArrayBufferToBase64(
                e.target!.result! as ArrayBuffer
            );

            saveFile(enqueue, base64, null, name, extension, e.total);
            readIndex++;
        };
    }
};

const createSelectionInput = (
    isFileInput: boolean,
    node: FolderNode,
    enqueue: (notification: INotification) => void
) => {
    const input = document.createElement("input");

    // configuring the input element
    input.type = "file";
    input.multiple = true;
    input.minLength = 1;
    input.webkitdirectory = !isFileInput;

    input.addEventListener("change", (e: Event) => {
        if (isFileInput) {
            handleFile(e as unknown as ChangeEvent<HTMLInputElement>, enqueue);
        } else {
            handleFolder(
                e as unknown as ChangeEvent<HTMLInputElement>,
                node,
                enqueue
            );
        }
    });

    input.click();

    // removing the input element and listener, for clean pourpose
    input.parentElement?.removeChild(input);
    input.removeEventListener("change", (e: Event) => {
        if (isFileInput) {
            handleFile(e as unknown as ChangeEvent<HTMLInputElement>, enqueue);
        } else {
            handleFolder(
                e as unknown as ChangeEvent<HTMLInputElement>,
                node,
                enqueue
            );
        }
    });
};

export { createSelectionInput };
