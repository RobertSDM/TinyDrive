import { useState } from "react";
import { MdExpandLess, MdExpandMore, MdFileUpload } from "react-icons/md";
import { FolderNode } from "../../control/TreeWrapper/FolderNode.ts";
import { FileNode } from "../../control/TreeWrapper/FileNode.ts";
import createSelectionInput from "../../service/fileReaderService.ts";
import { useNotificationSystemContext, useTreeContext, useUserContext } from "../../hooks/useContext.tsx";

const ButtonUpload = ({
    updateContent,
}: {
    updateContent: (content: Array<FileNode | FolderNode>) => void;
    currentNode: FolderNode;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { enqueue } = useNotificationSystemContext();
    const {
        user: { id: userId },
        token,
    } = useUserContext();
    const { currentNode, tree } = useTreeContext();

    return (
        <div className={`inline relative ${isOpen ? "border-black/30" : ""} `}>
            <button
                className={`items-center gap-x-2 border-purple-500 text-black border hover:bg-purple-500  hover:text-white p-2 inline-flex cursor-pointer rounded-t-sm`}
                onMouseEnter={() => {
                    setIsOpen(true);
                }}
                onMouseLeave={() => {
                    setIsOpen(false);
                }}
            >
                <MdFileUpload />
                Upload
                {!isOpen ? <MdExpandLess /> : <MdExpandMore />}
            </button>
            <div
                onMouseOver={() => {
                    setIsOpen(true);
                }}
                onMouseLeave={() => {
                    setIsOpen(false);
                }}
                className={`absolute bg-white w-full border border-black/30 border-t-0 ${
                    isOpen ? "block" : "hidden"
                }`}
            >
                <button
                    onClick={() =>
                        createSelectionInput(
                            true,
                            updateContent,
                            enqueue,
                            userId,
                            token,
                            currentNode,
                            tree
                        )
                    }
                    className="hover:bg-purple-500 px-2 py-1 hover:text-white cursor-pointer w-full"
                >
                    Files
                </button>
                <hr className="w-4/5 mx-auto" />
                <button
                    onClick={() =>{
                        createSelectionInput(
                            false,
                            updateContent,
                            enqueue,
                            userId,
                            token,
                            currentNode,
                            tree
                        )}
                    }
                    className="hover:bg-purple-500 px-2 py-1 hover:text-white cursor-pointer w-full"
                >
                    Folders
                </button>
            </div>
        </div>
    );
};

export default ButtonUpload;
