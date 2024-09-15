import { ChangeEvent } from "react";
import { FileNode } from "../control/TreeWrapper/FileNode.ts";
import { FolderNode } from "../control/TreeWrapper/FolderNode.ts";
import handleFolderUpload from "./handleFolderUpload.tsx";
import handleFilesUpload from "./handleFilesUpload.tsx";
import { INotification } from "../types/types.js";
import { Tree } from "../control/TreeWrapper/Tree.ts";

const createSelectionInput = (
    isFile: boolean,
    updateContent: (content: Array<FileNode | FolderNode>) => void,
    enqueue: (notification: INotification) => void,
    userId: string,
    token: string,
    currentNode: FolderNode,
    tree: Tree
) => {
    const input = document.createElement("input");

    // Configuring the input element
    input.type = "file";
    input.multiple = true;
    input.minLength = 1;
    input.webkitdirectory = !isFile;

    input.addEventListener("change", (e: Event) => {
        const event = e as unknown as ChangeEvent<HTMLInputElement>;

        if (!event.target?.files) {
            return;
        }

        if (isFile) {
            handleFilesUpload(
                event.target.files,
                updateContent,
                enqueue,
                userId,
                token,
                currentNode,
                tree
            );
        } else {
            handleFolderUpload(
                event.target.files,
                updateContent,
                enqueue,
                userId,
                token,
                currentNode,
                tree
            );
        }
    });

    // Activating the input
    input.click();

    // Removing the input element
    input.parentElement?.removeChild(input);
};

export default createSelectionInput;
