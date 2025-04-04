import downloadFolder from "../../requests/folder/downloadFolder.ts";
import saveFolder from "../../requests/folder/saveFolder.ts";
import {
    NotificationLevels,
    NotificationTypes,
} from "../../../../types/enums.ts";
import { IFolder } from "../../../../types/types.ts";
import {
    fileArrayToFileList,
    folderToFolderNode,
} from "../../../../utils/dataConvertion.ts";
import { MAX_DIR_DEPTH } from "../../../../utils/enviromentVariables.ts";
import { orderByName } from "../../../../utils/filterFunctions.ts";
import { correctName, validateName } from "../../../../utils/valitation.ts";
import {
    useNotificationSystemContext,
    useTreeContext,
    useUserContext,
} from "../../../../context/useContext.tsx";
import { FolderNode } from "../../../../utils/three/FolderNode.ts";
import { useHandleFilesUpload } from "../../hooks/useFile.tsx";

export const useFolderDownload = (fileId: string, name: string) => {
    const {
        user: { id: userId },
        token,
    } = useUserContext();

    return async () => {
        const buffer = await downloadFolder(userId, fileId, token);

        const blob = new Blob([buffer], { type: "application/zip" });

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", name);
        link.click();

        window.URL.revokeObjectURL(url);
    };
};

export const useHandleFolderUpload = () => {
    const {
        user: { id: userId },
        token,
    } = useUserContext();
    const { currentNode: currentFolderNode, setContent } = useTreeContext();
    const { addNotif: enqueue } = useNotificationSystemContext();
    const { tree } = useTreeContext();
    const handleFilesUpload = useHandleFilesUpload(false);

    return async (files: FileList) => {
        if (files.length === 0) return;

        enqueue({
            level: NotificationLevels.INFO,
            msg: `upload started`,
            type: NotificationTypes.STATIC,
        });

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
                let depth = 0;
                const splited = file.webkitRelativePath.split("/");
                const depthFile = splited.length;
                splited.pop();

                for (let folder of splited) {
                    path += folder + "/";
                    depth += 1;
                    let name = folder;

                    if (depth > MAX_DIR_DEPTH) break;
                    if (!validateName(name, enqueue)) {
                        name = correctName(name);
                    }

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
                            currentFolderNode?.getId() ===
                                savedFolder.folderC_id ||
                            savedFolder?.folderC_id === null
                        ) {
                            folderToFolderNode(
                                savedFolder,
                                tree,
                                currentUpdatedFolderNode?.getId() === ""
                                    ? tree.getRoot()
                                    : currentFolderNode
                            );

                            currentUpdatedFolderNode = tree.getNodes()[
                                savedFolder.id
                            ] as FolderNode;
                        }
                    } else {
                        parentId = pathsUsed[path];
                        key = path + ";" + parentId;
                    }
                    if (
                        structInMemo[key] &&
                        depthFile === path.split("/").length
                    ) {
                        structInMemo[key].push(file);
                    }
                }
            }

            const filesPromise = Object.keys(structInMemo).map(async (key) => {
                if (structInMemo[key].length > 0) {
                    await handleFilesUpload(
                        fileArrayToFileList(structInMemo[key]),
                        key.split(";")[1]
                    );
                }
            });

            await Promise.all(filesPromise);
            const children = Object.values(
                currentFolderNode.getChildren()
            ) as FolderNode[];
            setContent(orderByName(children));
        } catch (error: Error | any) {
            throw error;
        }
    };
};

export const useHandleFolderCreation = () => {
    const { token, user } = useUserContext();
    const { addNotif } = useNotificationSystemContext();
    const { currentNode, tree, setContent } = useTreeContext();

    return async (name: string) => {
        name = correctName(name);

        const savedFolder = await saveFolder(
            name,
            currentNode.getId() === "" ? null : currentNode.getId(),
            user.id,
            token,
            addNotif
        );

        /*
        Verifies if the actual folder being shown, is the parent of the folder created
        if it is, it will be added in the tree, and shown on the screen
        */

        if (
            currentNode?.getId() === savedFolder.folderC_id ||
            savedFolder?.folderC_id === null
        ) {
            folderToFolderNode(
                savedFolder,
                tree,
                currentNode?.getId() === "" ? tree.getRoot() : currentNode
            );

            const children = Object.values(
                currentNode.getChildren()
            ) as FolderNode[];
            setContent(orderByName(children));
        }
    };
};
