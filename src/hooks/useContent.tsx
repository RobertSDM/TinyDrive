import { useNavigate } from "react-router-dom";
import updateFileName from "../fetcher/file/updateFileName.ts";
import updateFolderName from "../fetcher/folder/updateFolderName.ts";
import { ITEMS_PER_PAGE } from "../utils/enviromentVariables.ts";
import { orderByName } from "../utils/filterFunctions.ts";
import isFile from "../utils/isFile.ts";
import { correctName, validateName } from "../utils/valitation.ts";
import {
    useNotificationSystemContext,
    usePaginationContext,
    useTreeContext,
    useUserContext,
} from "./useContext.tsx";
import { useFileDownload } from "./useFile.tsx";
import { useFolderDownload } from "./useFolder.tsx";
import { FolderNode } from "../model/three/FolderNode.ts";
import { FileNode } from "../model/three/FileNode.ts";

export const useDeleteContent = (
    item: FileNode | FolderNode,
    setRowDeleteId: (rowDeleteId: string) => void,
    deleteFileById: (id: string) => Promise<boolean>,
    deleteFolderById: (id: string) => Promise<boolean>,
    setTotalPages: React.Dispatch<React.SetStateAction<number>>,
    page: number,
    totalPages: number
) => {
    const { tree, currentNode, setContent } = useTreeContext();
    const { setPagesCache, pagesCache } = usePaginationContext();
    const navigate = useNavigate();

    return async () => {
        setRowDeleteId(item.getId());
        if (isFile(item)) {
            const success = await deleteFileById(item.getId());
            if (success) tree.deleteFileNode(item as FileNode);
        } else {
            const success = await deleteFolderById(item.getId());
            if (success) tree.deleteFolderNode(item as FolderNode);
        }

        setRowDeleteId("");

        let len = currentNode.getChildrenValues().length;

        if (len < ITEMS_PER_PAGE * totalPages - ITEMS_PER_PAGE) {
            len += ITEMS_PER_PAGE * (totalPages - 1);
        }

        setContent((prev) => {
            if (prev[0].getId() !== currentNode.getId()) return prev;
            return orderByName(currentNode.getChildrenValues());
        });

        const pageCacheKey = currentNode.getId();

        if (
            pagesCache[pageCacheKey]?.totalPages - 1 > 0 &&
            len <= ITEMS_PER_PAGE * totalPages - ITEMS_PER_PAGE
        ) {
            setTotalPages((prev) => prev - 1);
            setPagesCache((prev) => {
                prev[pageCacheKey].loadedPages.push(page);

                return {
                    ...prev,
                    [pageCacheKey]: {
                        loadedPages: prev[pageCacheKey].loadedPages,
                        totalPages: totalPages - 1,
                    },
                };
            });
        }
        if (
            page === totalPages &&
            len <= ITEMS_PER_PAGE * totalPages - ITEMS_PER_PAGE
        ) {
            navigate(`?p=${page - 1}`);
        }
    };
};

export const useEditContentName = (item: FileNode | FolderNode) => {
    const { user, token } = useUserContext();
    const { addNotif: enqueue } = useNotificationSystemContext();
    const { tree, setContent, content } = useTreeContext();

    return (newName: string) => {
        newName = newName.trim();

        if (newName !== "") {
            newName = correctName(newName);
        }

        const valid = validateName(newName, enqueue, item.getName());

        if (!valid) {
            return;
        }

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
                setContent(orderByName([...content]));
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
                        const folder = tree.getNodes()[i] as FolderNode;

                        if (folder) {
                            folder.createTray(res.tray[i]);
                        }
                        setContent(orderByName([...content]));
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
