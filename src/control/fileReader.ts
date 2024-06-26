import React, { ChangeEvent } from "react";
import saveFile from "../connection/saveFile.ts";
import {
    convertArrayBufferToBase64,
    fileToFileNode,
    folderToFolderNode,
} from "./dataConvert.ts";
import saveFolder from "../connection/saveFolder.ts";
import { IFolder, INotification } from "../types/types.js";
import { FileNode, FolderNode, Tree } from "./Tree.ts";

const handleFolder = async (
    event: ChangeEvent<HTMLInputElement>,
    // node: FolderNode,
    enqueue: (notification: INotification) => void,
    tree: Tree,

    setContent: React.Dispatch<React.SetStateAction<(FolderNode | FileNode)[]>>,
    currentNode: FolderNode
) => {
    let resFolder: IFolder;
    let currNode: FolderNode | null = null;
    let folderId: string | null = null;
    let tray: string | null = null;
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
        console.log("#".repeat(8));

        if (path.length > 2) {
            return readFolder(path.slice(cut + 1), file, parentId, cut + 1);
        }

        const folderName = path[0];

        if (memo[folderName] === undefined) {
            resFolder = await saveFolder(folderName, parentId, enqueue);
            if (tray) {
                resFolder.tray = `${tray}/${resFolder.name};${resFolder.id}`;
            } else {
                tray = `${resFolder.name};${resFolder.id}`;
                resFolder.tray = tray;
            }
            folderId = resFolder.id;

            if (
                currNode?.getId() === resFolder.folderC_id ||
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
            console.log("Pasta salva : " + folderName);
        }

        console.log(
            "Response from API : " + JSON.stringify(resFolder, null, " ")
        );

        console.log(
            "Current folder node : " + JSON.stringify(currNode, null, " ")
        );

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
            e.total
        );
        console.log("Arquivo salvo : " + name);

        if (
            currNode?.getId() === resFolder.folderC_id ||
            !resFolder?.folderC_id
        ) {
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
            await readFolder(
                files[readIndex].webkitRelativePath.split("/"),
                files[readIndex],
                folderId
            );
            readIndex++;
        }
    }
};

const handleFile = async (
    event: ChangeEvent<HTMLInputElement>,
    enqueue: (notification: INotification) => void,
    tree: Tree,
    setContent: React.Dispatch<React.SetStateAction<(FolderNode | FileNode)[]>>,
    currentNode: FolderNode
) => {
    const fileList = event.target.files!;
    let readIndex = 0;

    while (readIndex < fileList.length) {
        const file = fileList[readIndex];

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
        const data = await saveFile(
            enqueue,
            base64,
            null,
            name,
            extension,
            e.total
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
    currentNode: FolderNode
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
                currentNode
            );
        } else {
            handleFolder(
                e as unknown as ChangeEvent<HTMLInputElement>,
                enqueue,
                tree,
                setContent,
                currentNode
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
                currentNode
            );
        } else {
            handleFolder(
                e as unknown as ChangeEvent<HTMLInputElement>,
                enqueue,
                tree,
                setContent,
                currentNode
            );
        }
    });
};
