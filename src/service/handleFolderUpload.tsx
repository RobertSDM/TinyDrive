import { FileNode } from "../control/TreeWrapper/FileNode.ts";
import { FolderNode } from "../control/TreeWrapper/FolderNode.ts";
import { Tree } from "../control/TreeWrapper/Tree.ts";
import saveFolder from "../fetcher/folder/saveFolder.ts";
import { NotificationLevels } from "../types/enums.ts";
import { IFolder, INotification } from "../types/types.js";
import {
    fileArrayToFileList,
    folderToFolderNode,
} from "../utils/dataConvertion.ts";
import handleFilesUpload from "./handleFilesUpload.tsx";

const handleFolderUpload = async (
    files: FileList,
    updateContent: (content: Array<FileNode | FolderNode>) => void,
    enqueue: (notification: INotification) => void,
    userId: string,
    token: string,
    currentFolderNode: FolderNode, // refers to the current folder being shown
    tree: Tree
) => {
    if (files.length === 0) return;
    // refers to the created folder returned from the api
    let savedFolder: IFolder;
    // refers to the current folder on the save process
    let currentUpdatedFolderNode: FolderNode | null = null;
    let parentId: string | null =
        currentFolderNode.getId() == "" ? null : currentFolderNode.getId();
    // create a tray for the created folder
    let tray: string | null = null;

    // holds the created folders
    const structInMemo = {} as {
        [key: string]: File[];
    };

    const pathsUsed = {} as {
        [key: string]: string | null;
    };

    try {
        for (let file of Array.from(files)) {
            let path = "";
            let key = "";
            const splited = file.webkitRelativePath.split("/");
            const depthFile = splited.length;
            splited.pop();

            for (let folder of splited) {
                path += folder + "/";

                if (pathsUsed[path] === undefined) {
                    // create the folder
                    savedFolder = await saveFolder(
                        folder,
                        parentId,
                        userId,
                        token,
                        enqueue,
                        false
                    );

                    if (savedFolder.folderC_id === undefined) {
                        throw new Error(folder);
                    }

                    tray = tray
                        ? `${tray}/${savedFolder.name};${savedFolder.id}`
                        : `${savedFolder.name};${savedFolder.id}`;
                    savedFolder.tray = tray;

                    parentId = savedFolder.id;
                    pathsUsed[path] = parentId;
                    key = path + ";" + parentId;
                    structInMemo[key] = [];

                    /*
                        Verifies if the actual folder being shown, is the parent of the folder created
                        if it is, it will be added in the tree, and shown on the screen
                    */
                    if (
                        currentFolderNode?.getId() === savedFolder.folderC_id ||
                        savedFolder?.folderC_id === null
                    ) {
                        folderToFolderNode(
                            [savedFolder],
                            tree,
                            currentUpdatedFolderNode
                                ? currentUpdatedFolderNode
                                : tree.getRoot()
                        );
                        currentUpdatedFolderNode =
                            tree.getFolderNodes()[savedFolder.id];
                    }
                } else {
                    parentId = pathsUsed[path];
                    key = path + ";" + parentId;
                }
                if (structInMemo[key] && depthFile === path.split("/").length) {
                    structInMemo[key].push(file);
                }
            }
        }

        const filesPromise = Object.keys(structInMemo).map(async (key) => {
            if (structInMemo[key].length > 0) {
                await handleFilesUpload(
                    fileArrayToFileList(structInMemo[key]),
                    updateContent,
                    enqueue,
                    userId,
                    token,
                    currentFolderNode,
                    tree,
                    key.split(";")[1],
                    false
                );
            }
        });

        await Promise.all(filesPromise);
        updateContent([
            ...currentFolderNode.getFiles(),
            ...currentFolderNode.getFolders(),
        ]);

        enqueue({
            level: NotificationLevels.INFO,
            msg: "Folder created successfully",
            title: "Success",
        });
    } catch (error: Error | any) {
        throw error;
    }
};

export default handleFolderUpload;
