import TextModal from "@/shared/components/ModalWrapper/TextModal.tsx";
import {
    useDriveItemsContext,
    useModalContext,
    useParentContext,
    useUserContext,
} from "@/shared/context/useContext.tsx";
import { ItemType } from "@/shared/types/enums.ts";
import { ItemData, SingleItemResponse } from "@/shared/types/index.ts";
import { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import transformFileToItem from "../../core/extractFileContent.ts";
import { saveItemService } from "../../service/itemService.ts";
import DropDown, { FileOptionType } from "../DropDownWrapper/DropDown.tsx";
import { ItemSaveConfig } from "../../api/config.ts";
import useFetcher from "@/shared/hooks/useRequest.tsx";
import { DefaultClient } from "@/shared/api/clients.ts";

export default function ButtonUpload() {
    const [isOpen, setIsOpen] = useState(false);
    const { addItem } = useDriveItemsContext();

    const { parent } = useParentContext();
    const { user } = useUserContext();
    const { openModal, closeModal } = useModalContext();
    const { request } = useFetcher<SingleItemResponse>(
        ItemSaveConfig(),
        DefaultClient,
        false,
        (resp) => {
            addItem(resp.data.data);

            return resp.data;
        }
    );

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
                    onchange={async (filelist: FileList) => {
                        const fileStruct = transformFileToItem(
                            filelist,
                            user.id
                        );

                        for await (const item of saveItemService(
                            fileStruct,
                            parent.id!
                        )) {
                            addItem(item);
                        }
                    }}
                    type={FileOptionType.FILE}
                />
                <DropDown.FileOption
                    text="Upload Folder"
                    onchange={async (filelist: FileList) => {
                        const fileStruct = transformFileToItem(
                            filelist,
                            user.id
                        );

                        for await (const item of saveItemService(
                            fileStruct,
                            parent.id!
                        )) {
                            if (item.parentid === parent.id) addItem(item);
                        }
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
                                    request(item);
                                }}
                                close={closeModal}
                                isOpen={true}
                            />
                        )
                    }
                    text="New Folder"
                />
            </DropDown>
        </div>
    );
}
