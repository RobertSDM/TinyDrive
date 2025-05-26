import TextModal from "@/shared/components/ModalWrapper/TextModal.tsx";
import {
    useAuthContext,
    useModalContext,
    useParentContext
} from "@/shared/context/useContext.tsx";
import { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

import DropDown, {
    FileOptionType,
} from "../../../../shared/components/DropDownWrapper/DropDown.tsx";
import { useUploadFolder, useUploadItem } from "../../hooks/uploadHooks.tsx";

export default function ButtonUpload() {
    const [isOpen, setIsOpen] = useState(false);
    const { request: uploadItem } = useUploadItem();
    const { request: uploadFolder } = useUploadFolder();
    const { parent } = useParentContext();
    const { account } = useAuthContext();
    const { openModal, closeModal } = useModalContext();

    function open() {
        setIsOpen(true);
    }

    function close() {
        setIsOpen(false);
    }

    return (
        <div
            className={`inline relative ${isOpen ? "border-black/30" : ""}`}
            onClick={() => (isOpen ? close() : open())}
            onMouseEnter={open}
            onMouseLeave={close}
        >
            <span
                className={`items-center gap-x-2 border-purple-500 text-black border hover:bg-purple-500 active:bg-purple-500 w-32 hover:text-white  inline-flex cursor-pointer rounded-sm justify-around p-2 ${
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
                        uploadItem(filelist);
                    }}
                    type={FileOptionType.FILE}
                />
                <DropDown.FileOption
                    text="Upload Folder"
                    onchange={(filelist: FileList) => {
                        uploadItem(filelist);
                    }}
                    type={FileOptionType.FOLDER}
                />
                <DropDown.Option
                    onclick={() =>
                        openModal(
                            <TextModal
                                callback={(text) => {
                                    uploadFolder({
                                        name: text,
                                        parentid: parent.id,
                                        ownerid: account!.id,
                                    });
                                }}
                                close={closeModal}
                                isOpen={isOpen}
                            />
                        )
                    }
                    text="New Folder"
                />
            </DropDown>
        </div>
    );
}
