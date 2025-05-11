import { ItemType } from "@/shared/types/enums.ts";
import { Item, SingleItemResponse } from "@/shared/types/index.ts";
import { FaFile } from "react-icons/fa";
import { FaFolderClosed } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ButtonAction from "../ButtonWrapper/ButtonAction.tsx";
import useFetcher from "@/shared/hooks/useRequest.tsx";
import { ItemDeleteConfig } from "../../api/config.ts";
import { useUserContext } from "@/shared/context/useContext.tsx";

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
    const { user } = useUserContext();
    const { request: delete_ } = useFetcher<SingleItemResponse>({
        ...ItemDeleteConfig,
        path: `${ItemDeleteConfig.path}/${user.id}/${item.id}`,
    });

    return (
        <section
            className={`border flex-1 justify-between hover:bg-purple-100 rounded-lg items-center h-12 max-h-12 p-2 flex`}
        >
            {item.type === ItemType.FILE ? (
                <FileItem {...{ item }} />
            ) : (
                <FolderItem {...{ item }} />
            )}
            <section className={`pr-2 py-2 hidden md:flex `}>
                <ButtonAction
                    onclick={() => {
                        delete_();
                    }}
                    style="border rounded-md border-red-500 px-2 text-red-500 hover:bg-red-500 hover:text-white active:scale-[0.9]"
                >
                    x
                </ButtonAction>
                {/* 
                    <DownloadButton onclick={downloadContent} />
                    <EditButton
                        text={item.getName()}
                        onclick={editName}
                    />
                */}
            </section>
        </section>
    );
}

export default ItemRow;
