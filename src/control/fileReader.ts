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
    const reader = new FileReader();
    const folderName = event.target.files![0].webkitRelativePath.split("/")[0];

    const parentId = node.getParent()?.getId() ?? null;

    const folderId = await saveFolder(folderName, parentId, enqueue);

    let readIndex = 0;

    const fileList = event.target.files!;

    function readFile() {
        if (readIndex >= fileList.length) {
            return;
        }

        const file = fileList[readIndex];

        reader.readAsArrayBuffer(file);

        reader.onload = (e) => {
            const extractedContent = file.name.split(".");

            const name = extractedContent[0];
            const extension = extractedContent[extractedContent.length - 1];

            const base64 = convertArrayBufferToBase64(
                e.target!.result! as ArrayBuffer
            );

            saveFile(enqueue, base64, folderId, name, extension, e.total);
            readIndex++;
            readFile();
        };
    }

    // using recursion because the loop should run
    // when the file is readed
    readFile();
};

const handleFile = (
    event: ChangeEvent<HTMLInputElement>,
enqueue: (notification: INotification) => void
) => {
    const reader = new FileReader();
    const fileList = event.target.files!;
    let readIndex = 0;

    function readFile() {
        if (readIndex >= fileList.length) {
            return;
        }

        const file = fileList[readIndex];
        reader.readAsArrayBuffer(file);

        reader.onload = (e) => {
            const extractedContent = file.name.split(".");

            const name = extractedContent[0];
            const extension = extractedContent[extractedContent.length - 1];

            const base64 = convertArrayBufferToBase64(
                e.target!.result! as ArrayBuffer
            );

            saveFile(enqueue, base64, null, name, extension, e.total);
            readIndex++;
            readFile();
        };
    }

    // using recursion because the loop should run
    // when the file is readed
    readFile();
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
