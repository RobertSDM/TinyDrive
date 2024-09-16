import { useEffect, useState } from "react";
import { FaFile } from "react-icons/fa";
import { FaFolderClosed } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FileNode } from "../../control/TreeWrapper/FileNode.ts";
import { FolderNode } from "../../control/TreeWrapper/FolderNode.ts";
import updateFileName from "../../fetcher/file/updateFileName.ts";
import useDeleteFileById from "../../fetcher/file/useDeleteFileById.ts";
import updateFolderName from "../../fetcher/folder/updateFolderName.ts";
import useDeleteFolderById from "../../fetcher/folder/useDeleteFolderbyId.ts";
import {
    useNotificationSystemContext,
    useTreeContext,
    useUserContext,
} from "../../hooks/useContext.tsx";
import { addThreePoints } from "../../utils/dataConvertion.ts";
import { validateName } from "../../utils/valitation.ts";
import DeleteContentButton from "../Buttons/DeleteContentButton.tsx";
import DownloadButton from "../Buttons/DownloadButton.tsx";
import EditButton from "../Buttons/EditButton.tsx";

const isFile = (item: FileNode | FolderNode) => {
    return item instanceof FileNode;
};

const ContentRow = ({
    updateContent,
    currentNode,
    item,
    downloadState,
}: {
    updateContent: (content: Array<FileNode | FolderNode>) => void;
    currentNode: FolderNode;
    item: FileNode | FolderNode;
    downloadState: React.MutableRefObject<Array<string>>;
}) => {
    const { fetch_: deleteFileById, isLoading: isDeletingFile } =
        useDeleteFileById();
    const { fetch_: deleteFolderById, isLoading: isDeletingFolder } =
        useDeleteFolderById();
    const [rowDeleteId, setRowDeleteId] = useState<string>("");
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const { tree } = useTreeContext();
    const { enqueue } = useNotificationSystemContext();
    const { user, token } = useUserContext();

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            return;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    function formatName(name: string) {
        return windowWidth > 1024
            ? addThreePoints(name, 64)
            : windowWidth > 768
            ? addThreePoints(name, 30)
            : addThreePoints(name, 20);
    }

    return (
        <div className="border grid grid-flow-col grid-cols-contentView p-2 hover:bg-purple-50 rounded-md items-center h-12 max-h-12">
            <section className="flex items-center gap-x-2 justify-between">
                {/* Name Column */}
                <section
                    className={`max-w-40 md:max-w-full relative overflow-hidden ${
                        (isDeletingFile || isDeletingFolder) &&
                        rowDeleteId === item.getId() &&
                        "text-slate-500"
                    }`}
                >
                    {isFile(item) ? (
                        <span className="flex gap-x-2 items-center text-nowrap">
                            <FaFile
                                className={`text-slate-700 min-h-4 min-w-4 ${
                                    (isDeletingFile || isDeletingFolder) &&
                                    rowDeleteId === item.getId() &&
                                    "text-slate-500"
                                }`}
                            />
                            {formatName(item.getName())}
                        </span>
                    ) : (
                        <Link
                            to={`/folder/${item.getId()}`}
                            className="relative flex gap-x-2 items-center text-nowrap"
                        >
                            <FaFolderClosed
                                className={`text-slate-700 min-h-4 min-w-4 ${
                                    (isDeletingFile || isDeletingFolder) &&
                                    rowDeleteId === item.getId() &&
                                    "text-slate-500"
                                }`}
                            />
                            {formatName(item.getName())}
                        </Link>
                    )}
                </section>
                {(!isDeletingFile || !isDeletingFolder) &&
                    rowDeleteId !== item.getId() && (
                        <section className="flex md:gap-x-3">
                            <DownloadButton
                                itemId={item.getId()}
                                isFile={isFile(item)}
                                name={item.getName()}
                                downloadState={downloadState}
                            />
                            <EditButton
                                text={item.getName()}
                                callback={(newName: string) => {
                                    const valid = validateName(
                                        item.getName(),
                                        newName,
                                        enqueue
                                    );

                                    if (!valid) return;

                                    if (isFile(item)) {
                                        updateFileName(
                                            enqueue,
                                            newName,
                                            item.getName(),
                                            item.getParentId() === ""
                                                ? null
                                                : item.getParentId(),
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
                                            item.getParentId() === ""
                                                ? null
                                                : item.getParentId(),
                                            item.getId(),
                                            user.id,
                                            item.getParentId() === ""
                                                ? null
                                                : item.getParentId(),
                                            token
                                        ).then((res) => {
                                            item.setName(res.name);
                                            if (res.tray) {
                                                for (let i of Object.keys(
                                                    res.tray
                                                )) {
                                                    const folder =
                                                        tree.getFolderNodes()[
                                                            i
                                                        ];

                                                    if (folder) {
                                                        folder.updateTray(
                                                            res.tray[i]
                                                        );
                                                    }
                                                }
                                            }
                                        });
                                    }
                                }}
                            />
                            <DeleteContentButton
                                onclick={async () => {
                                    setRowDeleteId(item.getId());
                                    if (isFile(item)) {
                                        const success = await deleteFileById(
                                            item.getId()
                                        );
                                        if (success)
                                            tree.deleteFileNode(
                                                item as FileNode
                                            );
                                    } else {
                                        const success = await deleteFolderById(
                                            item.getId()
                                        );
                                        if (success)
                                            tree.deleteFolderNode(
                                                item as FolderNode
                                            );
                                    }

                                    updateContent([
                                        ...currentNode.getFiles(),
                                        ...currentNode.getFolders(),
                                    ]);
                                }}
                                item={item}
                            />
                        </section>
                    )}
            </section>
            {/* Extension Column */}
            <section
                className={`text-center ${
                    (isDeletingFile || isDeletingFolder) &&
                    rowDeleteId === item.getId() &&
                    "text-slate-500"
                }`}
            >
                {isFile(item) ? "." + (item as FileNode).getExtension() : "-"}
            </section>
            {/* Size Column */}
            <section
                className={`text-center ${
                    (isDeletingFile || isDeletingFolder) &&
                    rowDeleteId === item.getId() &&
                    "text-slate-500"
                }`}
            >
                {isFile(item) ? (
                    <section>
                        <span className="font-semibold">
                            {(item as FileNode).getByteSize()}
                        </span>
                        <span className="font-semibold text-sm">
                            {(item as FileNode).getPrefix()}
                        </span>
                    </section>
                ) : (
                    "-"
                )}
            </section>
        </div>
    );
};

export default ContentRow;
