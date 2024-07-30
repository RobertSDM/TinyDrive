import React, { ChangeEvent } from "react";
import {
    convertArrayBufferToBase64,
    fileToFileNode,
    folderToFolderNode,
} from "./dataConvert.ts";
import { IFolder, INotification } from "../types/types.js";
import { Tree } from "./TreeWrapper/Tree.ts";
import { NotificationLevels } from "../types/enums.ts";
import saveFolder from "../fetcher/folder/saveFolder.ts";
import saveFile from "../fetcher/file/saveFile.ts";
import { MAX_DIR_DEPTH, MAX_FILE_SIZE } from "../utils/index.ts";
import { FolderNode } from "./TreeWrapper/FolderNode.ts";
import { FileNode } from "./TreeWrapper/FileNode.ts";

const handleFolder = async (
    event: ChangeEvent<HTMLInputElement>,
    // node: FolderNode,
    enqueue: (notification: INotification) => void,
    tree: Tree,
    setContent: React.Dispatch<React.SetStateAction<(FolderNode | FileNode)[]>>,
    currentNode: FolderNode,
    userId: string,
    token: string
) => {
    let resFolder: IFolder;
    let currNode: FolderNode | null = null;
    let folderId: string | null = null;
    let tray: string | null = null;
    let readIndex = 0;
    const memo = {} as {
        [key: string]: string;
    };
    const files = event.target.files!;

    async function readFolder(
        path: string[],
        file: File,
        parentId: string | null,
        cut = 0,
        depth: number = 1
    ) {
        if (depth > MAX_DIR_DEPTH) return;

        const slicedPath = path.slice(cut);

        if (slicedPath.length > 2) {
            return readFolder(path, file, parentId, cut + 1, depth + 1);
        }

        const folderName = slicedPath[0];

        if (memo[folderName] === undefined) {
            resFolder = await saveFolder(
                folderName,
                parentId,
                userId,
                token,
                enqueue,
                false
            );

            if (tray) {
                resFolder.tray = `${tray}/${resFolder.name};${resFolder.id}`;
            } else {
                tray = `${resFolder.name};${resFolder.id}`;
                resFolder.tray = tray;
            }

            folderId = resFolder.id;

            // Verifies if the actual folder the user is in, is the parent of the folder created
            // If it is, it will be added in the tree, and shown on the screen
            if (
                currentNode?.getId() === resFolder.folderC_id ||
                !resFolder?.folderC_id
            ) {
                folderToFolderNode(
                    [resFolder],
                    tree,
                    currNode ? currNode : tree.getRoot()
                );
                currNode = tree.getFolderNodes()[resFolder.id];

                setContent([
                    ...currentNode.getFiles(),
                    ...currentNode.getFolders(),
                ]);
            }
            memo[folderName] = resFolder.id!;
        }

        /// Creating the file

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

        const data = await saveFile(
            enqueue,
            base64,
            folderId,
            name,
            extension,
            e.total,
            userId,
            token,
            false
        );

        // Verifies if the actual folder the user is in, is the parent of the file created
        // If it is, it will be added in the tree, and shown on the screen

        if (currentNode?.getId() === resFolder.folderC_id) {
            console.log("entrou");
            fileToFileNode([data], tree, currNode ? currNode : tree.getRoot());
            if (currentNode.getId() == currNode?.getParentId()) {
                setContent([
                    ...currentNode.getFiles(),
                    ...currentNode.getFolders(),
                ]);
            }
        }

        return;
    }

    if (event.target.files) {
        while (readIndex < files.length) {
            const file = files[readIndex];

            if (file.size > MAX_FILE_SIZE) {
                enqueue({
                    level: NotificationLevels.INFO,
                    msg: "is to big, the maximum size is 3MBs",
                    title: "File to big",
                    special: file.name.split(".")[0],
                });
                readIndex++;
            } else {
                await readFolder(
                    file.webkitRelativePath.split("/"),
                    file,
                    folderId
                );
                readIndex++;
            }
        }
        enqueue({
            level: NotificationLevels.INFO,
            msg: `Folder saved with success`,
            title: "Saved",
        });
    }
};

const handleFile = async (
    event: ChangeEvent<HTMLInputElement>,
    enqueue: (notification: INotification) => void,
    tree: Tree,
    setContent: React.Dispatch<React.SetStateAction<(FolderNode | FileNode)[]>>,
    currentNode: FolderNode,
    userId: string,
    token: string
) => {
    const fileList = event.target.files!;
    let readIndex = 0;

    while (readIndex < fileList.length) {
        const file = fileList[readIndex];
        if (file.size > MAX_FILE_SIZE) {
            enqueue({
                level: NotificationLevels.INFO,
                msg: "is to big, the maximum size is 3MBs",
                title: "File to big",
                special: file.name.split(".")[0],
            });
            readIndex++;
            continue;
        }
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

        const data = await saveFile(
            enqueue,
            base64,
            null,
            name,
            extension,
            e.total,
            userId,
            token
        );

        fileToFileNode([data], tree, tree.getRoot());

        setContent([...currentNode.getFiles(), ...currentNode.getFolders()]);

        readIndex++;
    }
};

export const createSelectionInput = (
    isFileInput: boolean,
    enqueue: (notification: INotification) => void,
    tree: Tree,
    setContent: React.Dispatch<React.SetStateAction<(FolderNode | FileNode)[]>>,
    currentNode: FolderNode,
    userId: string,
    token: string
) => {
    const input = document.createElement("input");

    // configuring the input element
    input.type = "file";
    input.multiple = true;
    input.minLength = 1;
    input.webkitdirectory = !isFileInput;

    input.addEventListener("change", (e: Event) => {
        if (isFileInput) {
            handleFile(
                e as unknown as ChangeEvent<HTMLInputElement>,
                enqueue,
                tree,
                setContent,
                currentNode,
                userId,
                token
            );
        } else {
            handleFolder(
                e as unknown as ChangeEvent<HTMLInputElement>,
                enqueue,
                tree,
                setContent,
                currentNode,
                userId,
                token
            );
        }
    });

    input.click();

    // removing the input element and listener, for clean pourpose
    input.parentElement?.removeChild(input);
    input.removeEventListener("change", (e: Event) => {
        if (isFileInput) {
            handleFile(
                e as unknown as ChangeEvent<HTMLInputElement>,
                enqueue,
                tree,
                setContent,
                currentNode,
                userId,
                token
            );
        } else {
            handleFolder(
                e as unknown as ChangeEvent<HTMLInputElement>,
                enqueue,
                tree,
                setContent,
                currentNode,
                userId,
                token
            );
        }
    });
};
