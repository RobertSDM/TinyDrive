import {
    useParentContext,
    useUserContext,
} from "@/shared/context/useContext.tsx";
import { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import transformFileToItem from "../../core/extractFileContent.ts";
import DropDown, { FileOptionType } from "../DropDownWrapper/DropDown.tsx";
import saveItem from "../../service/itemService.ts";

export default function ButtonUpload() {
    const [isOpen, setIsOpen] = useState(false);
    const [_, setIsFolderNameModalOpen] = useState<boolean>(false);
    const { parent } = useParentContext();
    const { user } = useUserContext();

    // const handleFolderCreation = useHandleFolderCreation();
    function openModalText() {
        setIsFolderNameModalOpen(true);
    }

    function open() {
        setIsOpen(true);
    }

    function close() {
        setIsOpen(false);
    }

    return (
        <div
            className={`inline relative ${isOpen ? "border-black/30" : ""}`}
            onMouseEnter={open}
            onMouseLeave={close}
        >
            {/* <TextModal
                text={""}
                isOpen={isFolderNameModalOpen}
                setIsOpen={setIsFolderNameModalOpen}
                title="Enter the new folder name"
                callback={handleFolderCreation}
            /> */}
            <span
                className={`items-center gap-x-2 border-purple-500 text-black border hover:bg-purple-500 w-32 hover:text-white  inline-flex cursor-pointer rounded-md justify-around p-2 ${
                    isOpen && "rounded-b-none"
                }`}
            >
                <p>{`+ New`}</p>
                {isOpen ? <MdExpandMore /> : <MdExpandLess />}
            </span>
            <DropDown {...{ isOpen }}>
                <DropDown.FileOption
                    text="Upload File"
                    onchange={(filelist: FileList) => {
                        const fileStruct = transformFileToItem(
                            filelist,
                            user.id
                        );

                        saveItem(fileStruct, parent.id!);
                    }}
                    type={FileOptionType.FILE}
                />
                <DropDown.FileOption
                    text="Upload Folder"
                    onchange={(filelist: FileList) => {
                        const fileStruct = transformFileToItem(
                            filelist,
                            user.id
                        );
                        saveItem(fileStruct, parent.id!);
                    }}
                    type={FileOptionType.FOLDER}
                />
                <DropDown.Option onclick={openModalText} text="New Folder" />
            </DropDown>
        </div>
    );
}
