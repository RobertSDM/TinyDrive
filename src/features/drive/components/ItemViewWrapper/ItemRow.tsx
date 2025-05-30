import Preview from "@/shared/components/ModalWrapper/Preview.tsx";
import { useModalContext } from "@/shared/context/useContext.tsx";
import { ItemType } from "@/shared/types/enums.ts";
import { Item } from "@/shared/types/types.ts";
import { MouseEvent } from "react";
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
        <div className={`flex items-center w-full max-w-[500px]`}>
            <FaFile
                className={`mr-2 min-h-4 min-w-4 text-slate-500 ${
                    isSelected && "text-white"
                }`}
            />
            <span
                className={`whitespace-nowrap text-ellipsis overflow-hidden`}
            >
                {item.name}
            </span>
            <div className="flex gap-x-2 items-center">
                <span>{item.extension}</span>
                <section
                    className={`text-slate-400 ${
                        isSelected && "text-white"
                    } text-nowrap font-medium text-sm`}
                >
                    - {item.size}
                    {item.size_prefix}
                </section>
            </div>
        </div>
    );
}
type ItemRowProps = {
    item: Item;
    onclick: (e: MouseEvent) => void;
    isSelected?: boolean;
};

function ItemRow({ item, onclick, isSelected }: ItemRowProps) {
    const { openModal, isOpen, closeModal } = useModalContext();

    return (
        <section
            onClick={(e) => onclick(e)}
            onSelect={(e) => e.preventDefault()}
            onDoubleClick={(e) => {
                e.preventDefault();

                if (item.type === ItemType.FOLDER) return;

                openModal(
                    <Preview close={closeModal} isOpen={isOpen} item={item} />
                );
            }}
            className={`border-b hover:bg-purple-100 items-center h-12 max-h-12 py-2 px-4 flex outline-none cursor-default select-none justify-between ${
                isSelected &&
                "bg-purple-300 hover:bg-purple-400 border-purple-300 text-white"
            }`}
        >
            {item.type === ItemType.FILE ? (
                <FileItem {...{ item, isSelected }} />
            ) : (
                <FolderItem {...{ item, isSelected }} />
            )}
            <span
                className={`text-slate-500 whitespace-nowrap ${
                    isSelected && "text-white"
                } hidden md:block`}
            >
                Last updated: {" "}
                {new Date(item.update_date)
                    .toLocaleDateString()
                    .split("/")
                    .map((d) => d.padStart(2, "0"))
                    .join("/")}
            </span>
        </section>
    );
}

export default ItemRow;
