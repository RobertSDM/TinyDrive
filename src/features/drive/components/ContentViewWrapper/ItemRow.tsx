import { ItemType } from "@/shared/types/enums.ts";
import { Item } from "@/shared/types/index.ts";
import { useEffect } from "react";
import { FaFile } from "react-icons/fa";
import { FaFolderClosed } from "react-icons/fa6";
import { Link } from "react-router-dom";

type FolderItemProps = {
    item: Item;
    isLoading?: boolean;
    isSelected?: boolean;
};

function FolderItem({ item, isSelected }: FolderItemProps) {
    return (
        <Link to={`/${item.id}`} className={`flex items-center h-full`}>
            <FaFolderClosed
                className={` mr-2 min-h-4 min-w-4 text-slate-500 ${
                    isSelected && "text-white"
                }`}
            />
            <span className={`whitespace-nowrap text-ellipsis overflow-hidden`}>
                {item.name}
            </span>
        </Link>
    );
}
type FileItemProps = {
    item: Item;
    isLoading?: boolean;
    isSelected?: boolean;
};
function FileItem({ item, isSelected }: FileItemProps) {
    return (
        <div className={`flex items-center h-full w-full`}>
            <FaFile
                className={` mr-2 min-h-4 min-w-4 text-slate-500 ${
                    isSelected && "text-white"
                }`}
            />
            <span className={`whitespace-nowrap text-ellipsis overflow-hidden`}>
                {item.name}
            </span>
            <div className="flex gap-x-2 items-center">
                <span>{`.${item.extension}`}</span>
                <section
                    className={`text-slate-400 ${
                        isSelected && "text-white"
                    } text-nowrap font-medium text-sm`}
                >
                    {`- ${item.size}${item.size_prefix}`}
                </section>
            </div>
        </div>
    );
}
type ItemRowProps = {
    item: Item;
    onclick?: () => void;
    isSelected?: boolean;
};

function ItemRow({ item, onclick, isSelected }: ItemRowProps) {
    return (
        <section
            onClick={onclick}
            className={`border flex-1 justify-between hover:bg-purple-100 rounded-lg items-center h-12 max-h-12 p-2 flex ${
                isSelected && "bg-purple-400 hover:bg-purple-500 text-white"
            }`}
        >
            {item.type === ItemType.FILE ? (
                <FileItem {...{ item, isSelected }} />
            ) : (
                <FolderItem {...{ item, isSelected }} />
            )}
        </section>
    );
}

export default ItemRow;
