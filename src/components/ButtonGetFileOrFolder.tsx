import { useState } from "react";
import { MdExpandLess, MdExpandMore, MdFileUpload } from "react-icons/md";
import { handleSelection } from "../control/fileManagement.ts";

const ButtonGetFileOrFolder = () => {
    const [isUploadOpen, setIsUploadOpen] = useState(false);

    
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
                    onClick={() => handleSelection(true)}
                    className="hover:bg-purple-500 px-2 py-1 hover:text-white cursor-pointer w-full"
                >
                    Arquivos
                </button>
                <hr className="w-4/5 mx-auto" />
                <button
                    onClick={() => handleSelection(false)}
                    className="hover:bg-purple-500 px-2 py-1 hover:text-white cursor-pointer w-full"
                >
                    Pastas
                </button>
            </div>
        </div>
    );
}

export default ButtonGetFileOrFolder;