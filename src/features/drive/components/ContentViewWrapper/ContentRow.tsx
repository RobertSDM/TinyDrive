import ButtonPopup from "@/shared/components/ButtonWrapper/ButtonPopup.tsx";
import { ItemType } from "@/shared/types/enums.ts";
import { Item } from "@/shared/types/index.ts";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const ContentRow = ({ item }: { item: Item }) => {
    const [rowDeleteId, setRowDeleteId] = useState<string>("");

    // const { fetch_: deleteFileById, isLoading: isDeletingFile } =
    //     useDeleteFileById();
    // const { fetch_: deleteFolderById, isLoading: isDeletingFolder } =
    //     useDeleteFolderById();

    // const editName = useEditContentName(item);
    // const deleteContent = useDeleteContent(
    //     item,
    //     setRowDeleteId,
    //     deleteFileById,
    //     deleteFolderById
    // );
    const isDownloading = useRef<boolean>(false);
    // const downloadContent = useDownloadContent(
    //     item.getId(),
    //     item.getName(),
    //     isDownloading,
    //     isFile(item)
    // );

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);

    return (
        <section
            className={`border flex justify-between  hover:bg-purple-50 rounded-md items-center h-12 max-h-12`}
        >
            <Link
                to={"/drive"}
                className={`flex items-center ${
                    item.type === ItemType.FILE && "cursor-default"
                } h-full p-2 w-full
                flex items-center overflow-hidden`}
            >
                {/* Name Column */}
                {/* {item.type === ItemType.FILE ? (
                    <FaFile
                        className={` mr-2 min-h-4 min-w-4 ${
                            (isDeletingFile || isDeletingFolder) &&
                            rowDeleteId === item.id
                                ? "text-slate-500"
                                : "text-slate-700"
                        }`}
                    />
                ) : (
                    <FaFolderClosed
                        className={` mr-2 min-h-4 min-w-4 ${
                            (isDeletingFile || isDeletingFolder) &&
                            rowDeleteId === item.id
                                ? "text-slate-500"
                                : "text-slate-700"
                        }`}
                    />
                )} */}
                <span
                    className={`whitespace-nowrap text-ellipsis overflow-hidden`}
                    // className={`whitespace-nowrap text-ellipsis overflow-hidden ${
                    //     (isDeletingFile || isDeletingFolder) &&
                    //     rowDeleteId === item.id &&
                    //     "text-slate-500 "
                    // }`}
                >
                    {item.name}
                </span>
                <div className="flex gap-x-2">
                    <span
                        className={`hidden md:flex`}
                        // className={`hidden md:flex ${
                        //     (isDeletingFile || isDeletingFolder) &&
                        //     rowDeleteId === item.id &&
                        //     "text-slate-500 "
                        // }`}
                    >
                        {item.type === ItemType.FILE
                            ? "." + item.extension
                            : ""}
                    </span>
                    <section className={`text-slate-400 text-nowrap`}>
                        {item.type === ItemType.FILE && (
                            <section>
                                <span className="font-medium text-sm">
                                    - {item.size}
                                    {item.size_prefix}
                                </span>
                            </section>
                        )}
                    </section>
                </div>
            </Link>
            {/* Buttons Column */}
            <section className={`pr-2 py-2 hidden md:flex`}>
                <section className="flex gap-x-3">
                    {/* <DownloadButton onclick={downloadContent} />
                            <EditButton
                                text={item.getName()}
                                onclick={editName}
                            />
                            <DeleteContentButton
                                onclick={deleteContent}
                                item={item}
                            /> */}
                </section>
            </section>
            <ButtonPopup
                className="mr-4 md:hidden"
                nameList={[
                    {
                        name: "Download",
                        callback: () => {
                            // downloadContent();
                        },
                    },
                    {
                        name: "Rename",
                        callback: () => {
                            setIsRenameModalOpen(true);
                        },
                    },
                    {
                        name: "Delete",
                        callback: () => {
                            setIsDeleteModalOpen(true);
                        },
                    },
                ]}
            />
        </section>
    );
};

export default ContentRow;
