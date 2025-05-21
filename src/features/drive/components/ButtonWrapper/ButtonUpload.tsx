import TextModal from "@/shared/components/ModalWrapper/TextModal.tsx";
import {
    useAuthContext,
    useDriveItemsContext,
    useModalContext,
    useParentContext,
} from "@/shared/context/useContext.tsx";
import useRequest from "@/shared/hooks/useRequest.tsx";
import { SingleItemResponse } from "@/shared/types/types.ts";
import { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

import DropDown, { FileOptionType } from "../../../../shared/components/DropDownWrapper/DropDown.tsx";
import {
    ItemSaveConfig,
    ItemSaveFolderConfig,
} from "../../api/requestConfig.ts";

export default function ButtonUpload() {
    const [isOpen, setIsOpen] = useState(false);
    const { addItem } = useDriveItemsContext();

    const { parent } = useParentContext();
    const { account, session } = useAuthContext();
    const { openModal, closeModal } = useModalContext();
    const { request: fileRequest } = useRequest<SingleItemResponse>(
        ItemSaveConfig(session!.accessToken),
        (resp) => {
            const item = resp.data.data;
            if (item.parentid === parent.id) addItem(resp.data.data);

            return resp.data;
        }
    );
    const { request: folderRequest } = useRequest<SingleItemResponse>(
        ItemSaveFolderConfig(session!.accessToken),
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
                    onchange={async (filelist: FileList) => {
                        for (let i = 0; i < filelist.length; i++) {
                            const form = new FormData();
                            form.append("file", filelist[i]);
                            form.append("parentid", parent.id || "");
                            form.append("ownerid", account!.id);
                            await fileRequest(form);
                        }
                    }}
                    type={FileOptionType.FILE}
                />
                <DropDown.FileOption
                    text="Upload Folder"
                    onchange={async (filelist: FileList) => {
                        for (let i = 0; i < filelist.length; i++) {
                            const form = new FormData();
                            form.append("file", filelist[i]);
                            form.append("parentid", parent.id || "");
                            form.append("ownerid", account!.id);
                            await fileRequest(form);
                        }
                    }}
                    type={FileOptionType.FOLDER}
                />
                <DropDown.Option
                    onclick={() =>
                        openModal(
                            <TextModal
                                callback={(text) => {
                                    folderRequest({
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
