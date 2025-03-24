import { useRef, useState } from "react";
import { FaFile } from "react-icons/fa";
import { Link } from "react-router-dom";
import useDeleteFolderById from "../../modules/drive/requests/folder/useDeleteFolderbyId.ts";
import {
    useDeleteContent,
    useDownloadContent,
    useEditContentName,
} from "../../hooks/useContent.tsx";
import isFile from "../../utils/isFile.ts";
import ButtonPopup from "../ButtonWrapper/ButtonPopup.tsx";
import DeleteContentButton from "../../modules/drive/components/ButtonWrapper/DeleteContentButton.tsx";
import DownloadButton from "../../modules/drive/components/ButtonWrapper/DownloadButton.tsx";
import EditButton from "../../modules/drive/components/ButtonWrapper/EditButton.tsx";
import ConfirmModal from "../ModalWrapper/ConfirmModal.tsx";
import TextModal from "../ModalWrapper/TextModal.tsx";
import { FaFolderClosed } from "react-icons/fa6";
import useDeleteFileById from "../../modules/drive/requests/file/useDeleteFileById.ts";
import { FolderNode } from "../../utils/three/FolderNode.ts";
import { FileNode } from "../../utils/three/FileNode.ts";

const ContentRow = ({
    item,
    setTotalPages,
    page,
    totalPages,
}: {
    item: FileNode | FolderNode;
    setTotalPages: React.Dispatch<React.SetStateAction<number>>;
    page: number;
    totalPages: number;
}) => {
    const [rowDeleteId, setRowDeleteId] = useState<string>("");

    const { fetch_: deleteFileById, isLoading: isDeletingFile } =
        useDeleteFileById();
    const { fetch_: deleteFolderById, isLoading: isDeletingFolder } =
        useDeleteFolderById();

    const editName = useEditContentName(item);
    const deleteContent = useDeleteContent(
        item,
        setRowDeleteId,
        deleteFileById,
        deleteFolderById,
        setTotalPages,
        page,
        totalPages
    );
    const isDownloading = useRef<boolean>(false);
    const downloadContent = useDownloadContent(
        item.getId(),
        item.getName(),
        isDownloading,
        isFile(item)
    );

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);

    return (
        <section
            className={`border flex justify-between  hover:bg-purple-50 rounded-md items-center h-12 max-h-12`}
        >
            <Link
                to={!isFile(item) ? `/folder/${item.getId()}` : "#"}
                className={`flex items-center ${
                    isFile(item) && "cursor-default"
                } h-full p-2 w-full
                flex items-center overflow-hidden`}
            >
                {/* Name Column */}
                {isFile(item) ? (
                    <FaFile
                        className={` mr-2 min-h-4 min-w-4 ${
                            (isDeletingFile || isDeletingFolder) &&
                            rowDeleteId === item.getId()
                                ? "text-slate-500"
                                : "text-slate-700"
                        }`}
                    />
                ) : (
                    <FaFolderClosed
                        className={` mr-2 min-h-4 min-w-4 ${
                            (isDeletingFile || isDeletingFolder) &&
                            rowDeleteId === item.getId()
                                ? "text-slate-500"
                                : "text-slate-700"
                        }`}
                    />
                )}
                <span
                    className={`whitespace-nowrap text-ellipsis overflow-hidden ${
                        (isDeletingFile || isDeletingFolder) &&
                        rowDeleteId === item.getId() &&
                        "text-slate-500 "
                    }`}
                >
                    {item.getName()}
                </span>
                <div className="flex gap-x-2">
                    <span
                        className={`hidden md:flex ${
                            (isDeletingFile || isDeletingFolder) &&
                            rowDeleteId === item.getId() &&
                            "text-slate-500 "
                        }`}
                    >
                        {isFile(item)
                            ? "." + (item as FileNode).getExtension()
                            : ""}
                    </span>
                    <section className={`text-slate-400 text-nowrap`}>
                        {isFile(item) && (
                            <section>
                                <span className="font-medium text-sm">
                                    - {(item as FileNode).getByteSize()}
                                    {(item as FileNode).getPrefix()}
                                </span>
                            </section>
                        )}
                    </section>
                </div>
            </Link>
            {/* Buttons Column */}
            <section className={`pr-2 py-2 hidden md:flex`}>
                {(!isDeletingFile || !isDeletingFolder) &&
                    rowDeleteId !== item.getId() && (
                        <section className="flex gap-x-3">
                            <DownloadButton onclick={downloadContent} />
                            <EditButton
                                text={item.getName()}
                                onclick={editName}
                            />
                            <DeleteContentButton
                                onclick={deleteContent}
                                item={item}
                            />
                        </section>
                    )}
            </section>
            <ButtonPopup
                className="mr-4 md:hidden"
                nameList={[
                    {
                        name: "Download",
                        callback: () => {
                            downloadContent();
                        },
                    },
                    {
                        name: "Rename",
                        callback: () => {
                            setIsRenameModalOpen(true);
                        },
                        modal: (
                            <TextModal
                                isOpen={isRenameModalOpen}
                                setIsOpen={setIsRenameModalOpen}
                                callback={editName}
                                text={item.getName()}
                            />
                        ),
                    },
                    {
                        name: "Delete",
                        callback: () => {
                            setIsDeleteModalOpen(true);
                        },
                        modal: (
                            <ConfirmModal
                                isOpen={isDeleteModalOpen}
                                setIsOpen={setIsDeleteModalOpen}
                                callback={() => {
                                    deleteContent();
                                }}
                            />
                        ),
                    },
                ]}
            />
        </section>
    );
};

export default ContentRow;
