import { FileNode } from "../control/TreeWrapper/FileNode.ts";
import { FolderNode } from "../control/TreeWrapper/FolderNode.ts";
import updateFileName from "../fetcher/file/updateFileName.ts";
import updateFolderName from "../fetcher/folder/updateFolderName.ts";
import { updateContent } from "../utils/filterFunctions.ts";
import isFile from "../utils/isFile.ts";
import { validateName } from "../utils/valitation.ts";
import {
    useNotificationSystemContext,
    useTreeContext,
    useUserContext,
} from "./useContext.tsx";
import { useFileDownload } from "./useFile.tsx";
import { useFolderDownload } from "./useFolder.tsx";

export const useDeleteContent = (
    item: FileNode | FolderNode,
    setRowDeleteId: (rowDeleteId: string) => void,
    deleteFileById: (id: string) => Promise<boolean>,
    deleteFolderById: (id: string) => Promise<boolean>
) => {
    const { tree, currentNode, setContent } = useTreeContext();

    return async () => {
        setRowDeleteId(item.getId());
        if (isFile(item)) {
            const success = await deleteFileById(item.getId());
            if (success) tree.deleteFileNode(item as FileNode);
        } else {
            const success = await deleteFolderById(item.getId());
            if (success) tree.deleteFolderNode(item as FolderNode);
        }

        setContent(
            updateContent([
                ...currentNode.getFiles(),
                ...currentNode.getFolders(),
            ])
        );
    };
};

export const useEditContentName = (item: FileNode | FolderNode) => {
    const { user, token } = useUserContext();
    const { enqueue } = useNotificationSystemContext();
    const { tree } = useTreeContext();

    return (newName: string) => {
        const valid = validateName(item.getName(), newName, enqueue);

        if (!valid) return;

        if (isFile(item)) {
            updateFileName(
                enqueue,
                newName,
                item.getName(),
                item.getParentId() === "" ? null : item.getParentId(),
                (item as FileNode).getExtension(),
                item.getId(),
                user.id,
                token
            ).then((name) => {
                item.setName(name);
            });
        } else {
            updateFolderName(
                enqueue,
                newName,
                item.getName(),
                item.getParentId() === "" ? null : item.getParentId(),
                item.getId(),
                user.id,
                item.getParentId() === "" ? null : item.getParentId(),
                token
            ).then((res) => {
                item.setName(res.name);
                if (res.tray) {
                    for (let i of Object.keys(res.tray)) {
                        const folder = tree.getFolderNodes()[i];

                        if (folder) {
                            folder.updateTray(res.tray[i]);
                        }
                    }
                }
            });
        }
    };
};

export const useDownloadContent = (
    itemId: string,
    name: string,
    downloadState: React.MutableRefObject<boolean>,
    isFile: boolean
) => {
    const fileDownload = useFileDownload(itemId);
    const folderDownload = useFolderDownload(itemId, name);

    return () => {
        if (downloadState.current) {
            return;
        }
        downloadState.current = true;
        if (isFile) {
            fileDownload().then(() => {
                downloadState.current = false;
            });
        } else {
            folderDownload().then(() => {
                downloadState.current = false;
            });
        }

        return;
    };
};
