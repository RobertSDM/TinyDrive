import { useContext, useState } from "react";
import { MdExpandLess, MdExpandMore, MdFileUpload } from "react-icons/md";
import { createSelectionInput } from "../control/fileReader.ts";
import { NotificationContext } from "../control/context/NotificationSystem.tsx";
import { TreeContext } from "../control/context/TreeContext.tsx";
import { FileNode, FolderNode } from "../control/Tree.ts";

const ButtonGetFileOrFolder = ({
    setContent,
    currentNode,
}: {
    setContent: React.Dispatch<React.SetStateAction<(FolderNode | FileNode)[]>>;
    currentNode: FolderNode;
}) => {
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const { tree } = useContext(TreeContext);
    const { enqueue } = useContext(NotificationContext);

    return (
        <div
            className={`inline relative ${
                isUploadOpen ? "border-black/30" : ""
            } `}
        >
            <button
                className={`items-center gap-x-2 border-purple-500 text-black border hover:bg-purple-500  hover:text-white p-2 inline-flex cursor-pointer rounded-t-sm`}
                onMouseEnter={() => {
                    setIsUploadOpen(true);
                }}
                onMouseLeave={() => {
                    setIsUploadOpen(false);
                }}
            >
                <MdFileUpload />
                Carregar
                {!isUploadOpen ? <MdExpandLess /> : <MdExpandMore />}
            </button>
            <div
                onMouseOver={() => {
                    setIsUploadOpen(true);
                }}
                onMouseLeave={() => {
                    setIsUploadOpen(false);
                }}
                className={`absolute bg-white w-full border border-black/30 border-t-0 ${
                    isUploadOpen ? "block" : "hidden"
                }`}
            >
                <button
                    onClick={() =>
                        createSelectionInput(
                            true,
                            enqueue,
                            tree,
                            setContent,
                            currentNode
                        )
                    }
                    className="hover:bg-purple-500 px-2 py-1 hover:text-white cursor-pointer w-full"
                >
                    Arquivos
                </button>
                <hr className="w-4/5 mx-auto" />
                <button
                    onClick={() =>
                        createSelectionInput(
                            false,
                            enqueue,
                            tree,
                            setContent,
                            currentNode
                        )
                    }
                    className="hover:bg-purple-500 px-2 py-1 hover:text-white cursor-pointer w-full"
                >
                    Pastas
                </button>
            </div>
        </div>
    );
};

export default ButtonGetFileOrFolder;
