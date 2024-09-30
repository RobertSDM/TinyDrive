import { MdOutlineClose } from "react-icons/md";
import ConfirmModal from "../modalWrapper/ConfirmModal.tsx";
import { useState } from "react";
import { FileNode } from "../../model/three/FileNode.ts";
import { FolderNode } from "../../model/three/FolderNode.ts";

const DeleteContentButton = ({
    onclick,
    className = "",
}: {
    onclick: () => Promise<void>;
    item: FileNode | FolderNode;
    className?: string;
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <ConfirmModal
                setIsOpen={setIsModalOpen}
                isOpen={isModalOpen}
                callback={onclick}
            />
            <span
                onClick={() => setIsModalOpen(true)}
                className={`${className} active:scale-95`}
            >
                <MdOutlineClose
                    className={`p-[0.45rem] font-bold min-h-8 min-w-8 bg-white cursor-pointer text-red-500 border  border-red-500 hover:bg-red-500 hover:text-white rounded-full md:inline `}
                />
            </span>
        </>
    );
};

export default DeleteContentButton;
