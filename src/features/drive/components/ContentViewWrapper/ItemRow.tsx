import { ItemType } from "@/shared/types/enums.ts";
import { Item } from "@/shared/types/index.ts";
import { FaFile } from "react-icons/fa";
import { FaFolderClosed } from "react-icons/fa6";
import { Link } from "react-router-dom";

type ItemRowProps = {
    item: Item;
};
type FileItemProps = {
    item: Item;
    isLoading?: boolean;
};
type FolderItemProps = {
    item: Item;
    isLoading?: boolean;
};

function FolderItem({ item }: FolderItemProps) {
    return (
        <Link to={"/drive"} className={`flex items-center h-full w-full`}>
            <FaFolderClosed
                className={` mr-2 min-h-4 min-w-4 text-slate-500`}
            />
            <span className={`whitespace-nowrap text-ellipsis overflow-hidden`}>
                {item.name}
            </span>
        </Link>
    );
}
function FileItem({ item }: FileItemProps) {
    return (
        <div className={`flex items-center h-full w-full`}>
            <FaFile className={` mr-2 min-h-4 min-w-4 text-slate-500`} />
            <span className={`whitespace-nowrap text-ellipsis overflow-hidden`}>
                {item.name}
            </span>
            <div className="flex gap-x-2">
                <span>{`.${item.extension}`}</span>
                <section className={`text-slate-400 text-nowrap`}>
                    <span className="font-medium text-sm">
                        {`- ${item.size}${item.size_prefix}`}
                    </span>
                </section>
            </div>
        </div>
    );
}

function ItemRow({ item }: ItemRowProps) {
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
    // const isDownloading = useRef<boolean>(false);
    // const downloadContent = useDownloadContent(
    //     item.getId(),
    //     item.getName(),
    //     isDownloading,
    //     isFile(item)
    // );

    return (
        <section
            className={`border flex-1 justify-between hover:bg-purple-100 rounded-lg items-center h-12 max-h-12 p-2`}
        >
            {item.type === ItemType.FILE ? (
                <FileItem {...{ item }} />
            ) : (
                <FolderItem {...{ item }} />
            )}
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
        </section>
    );
}

export default ItemRow;
