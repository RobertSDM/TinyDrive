import { DefaultClient } from "@/shared/api/clients.ts";
import TextModal from "@/shared/components/ModalWrapper/TextModal.tsx";
import {
    useModalContext,
    useParentContext,
    useUserContext,
} from "@/shared/context/useContext.tsx";
import { ItemType } from "@/shared/types/enums.ts";
import { ItemData } from "@/shared/types/index.ts";
import { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import transformFileToItem from "../../core/extractFileContent.ts";
import saveItemService from "../../service/itemService.ts";
import DropDown, { FileOptionType } from "../DropDownWrapper/DropDown.tsx";
import { ItemSaveConfig } from "../../api/config.ts";

export default function ButtonUpload() {
    const [isOpen, setIsOpen] = useState(false);

    const { parent } = useParentContext();
    const { user } = useUserContext();
    const { openModal, closeModal, isOpen: isModalOpen } = useModalContext();

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

                        saveItemService(fileStruct, parent.id!);
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
                        saveItemService(fileStruct, parent.id!);
                    }}
                    type={FileOptionType.FOLDER}
                />
                <DropDown.Option
                    onclick={() =>
                        openModal(
                            <TextModal
                                callback={(text) => {
                                    const item: ItemData = {
                                        extension: "",
                                        name: text,
                                        ownerid: user.id,
                                        parentid: parent.id,
                                        path: text,
                                        size: 0,
                                        type: ItemType.FOLDER,
                                    };
                                    DefaultClient({
                                        ...ItemSaveConfig,
                                        data: item,
                                        url: ItemSaveConfig.path,
                                    });
                                }}
                                close={closeModal}
                                isOpen={isModalOpen}
                            />
                        )
                    }
                    text="New Folder"
                />
            </DropDown>
        </div>
    );
}
