import { useContext, useState } from "react";
import { MdExpandLess, MdExpandMore, MdFileUpload } from "react-icons/md";
import { createSelectionInput } from "../../control/fileReader.ts";
import { NotificationContext } from "../../context/NotificationSystem.tsx";
import { TreeContext } from "../../context/TreeContext.tsx";
import { useUserContext } from "../../hooks/useContext.tsx";
import { FolderNode } from "../../control/TreeWrapper/FolderNode.ts";
import { FileNode } from "../../control/TreeWrapper/FileNode.ts";

const ButtonUpload = ({
    setContent,
    currentNode,
}: {
    setContent: React.Dispatch<React.SetStateAction<(FolderNode | FileNode)[]>>;
    currentNode: FolderNode;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { tree } = useContext(TreeContext);
    const { enqueue } = useContext(NotificationContext);
    const { token, user } = useUserContext();

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
                            enqueue,
                            tree,
                            setContent,
                            currentNode,
                            user.id,
                            token
                        )
                    }
                    className="hover:bg-purple-500 px-2 py-1 hover:text-white cursor-pointer w-full"
                >
                    Files
                </button>
                <hr className="w-4/5 mx-auto" />
                <button
                    onClick={() =>
                        createSelectionInput(
                            false,
                            enqueue,
                            tree,
                            setContent,
                            currentNode,
                            user.id,
                            token
                        )
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
