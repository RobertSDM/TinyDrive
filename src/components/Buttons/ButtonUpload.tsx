import { ChangeEvent, useState } from "react";
import { MdExpandLess, MdExpandMore, MdFileUpload } from "react-icons/md";
import { useTreeContext } from "../../hooks/useContext.tsx";
import { useHandleFilesUpload } from "../../hooks/useFile.tsx";
import { useHandleFolderUpload } from "../../hooks/useFolder.tsx";

const ButtonUpload = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { currentNode, tree } = useTreeContext();

    let handleFolderUpload = useHandleFolderUpload();
    let handleFilesUpload = useHandleFilesUpload();

    return (
        <div className={`inline relative ${isOpen ? "border-black/30" : ""} `}>
            <button
                className={`items-center gap-x-2 border-purple-500 text-black border hover:bg-purple-500  hover:text-white p-2 inline-flex cursor-pointer rounded-md ${
                    isOpen && "rounded-b-none"
                }`}
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
                className={`absolute bg-white w-full border border-black/30 border-t-0 rounded-b-md overflow-hidden ${
                    isOpen ? "block" : "hidden"
                }`}
            >
                <label
                    htmlFor="fileUploadBtn"
                    className="hover:bg-purple-500 px-2 py-1 hover:text-white cursor-pointer w-full mx-auto inline-block"
                >
                    File
                </label>
                <input
                    id="fileUploadBtn"
                    type="file"
                    multiple
                    minLength={1}
                    onChange={(e) => {
                        if (!e.target.files) {
                            return;
                        }
                        handleFilesUpload(
                            e.target.files,
                            tree.getRoot().getId() === currentNode?.getId()
                                ? null
                                : currentNode?.getId()
                        );
                    }}
                    className="hidden"
                />
                <hr className="w-4/5 mx-auto" />
                <label
                    htmlFor="folderUploadBtn"
                    className="hover:bg-purple-500 px-2 py-1 hover:text-white cursor-pointer w-full mx-auto inline-block"
                >
                    Folder
                </label>
                <input
                    id="folderUploadBtn"
                    type="file"
                    minLength={1}
                    onClick={(e) => {
                        const event =
                            e as unknown as ChangeEvent<HTMLInputElement>;

                        event.currentTarget.webkitdirectory = true;
                    }}
                    onChange={(e) => {
                        if (!e.target.files) {
                            return;
                        }

                        handleFolderUpload(e.target.files);
                    }}
                    className="hidden"
                />
            </div>
        </div>
    );
};

export default ButtonUpload;
