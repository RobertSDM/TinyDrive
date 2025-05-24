import TextModal from "@/shared/components/ModalWrapper/TextModal.tsx";
import {
    useModalContext
} from "@/shared/context/useContext.tsx";
import { ItemType } from "@/shared/types/enums.ts";
import { Item } from "@/shared/types/types.ts";
import { useEffect } from "react";
import useDeleteItem from "../../hooks/deleteHooks.tsx";
import {
    useDonwloadFile,
    useDownloadFolder,
} from "../../hooks/downloadHooks.tsx";
import { useUpdateName } from "../../hooks/updateHooks.tsx";

type ActionBarProps = {
    item: Item | null;
    closeActionBar: () => void;
};
export default function ActionBar({ item, closeActionBar }: ActionBarProps) {
    const { request: downloadFolder } = useDownloadFolder(item!);
    const { request: downloadFile } = useDonwloadFile(item!);
    const { request: delete_ } = useDeleteItem();
    const { request: update } = useUpdateName(item!);
    const { closeModal, openModal } = useModalContext();

    useEffect(() => {
        function action(e: KeyboardEvent) {
            if (!item) return;

            if (e.key === "Delete") {
                e.stopPropagation();
                e.preventDefault();

                const confirmDelete = confirm(
                    "Are you sure? All the data from the folder will be lost"
                );
                if (!confirmDelete) return;
                delete_({
                    itemids: [item?.id ?? ""],
                }).then(closeActionBar);
            }
        }

        window.addEventListener("keydown", action);

        return () => {
            window.removeEventListener("keydown", action);
        };
    }, [item]);

    return (
        <div
            className={`h-10  px-1 rounded-md my-2 flex items-center gap-x-2  "bg-white"
            `}
        >
            {item && (
                <>
                    <button
                        className="hover:bg-red-400 bg-red-200 px-2 py-1 rounded-md hover:text-white active:scale-95"
                        onClick={() => {
                            const confirmDelete = confirm(
                                "Are you sure? All the data from the folder will be lost"
                            );
                            if (!confirmDelete) return;

                            delete_({
                                itemids: [item?.id ?? ""],
                            }).then(closeActionBar);
                        }}
                    >
                        Delete
                    </button>
                    <button
                        className="hover:bg-slate-400 bg-slate-200 px-2 py-1 rounded-md hover:text-white active:scale-95"
                        onClick={() => {
                            openModal(
                                <TextModal
                                    close={closeModal}
                                    callback={(name) => {
                                        update({
                                            name,
                                        });
                                    }}
                                    isOpen={true}
                                />
                            );
                        }}
                    >
                        Rename
                    </button>
                    <button
                        className="hover:bg-slate-400 bg-slate-200 px-2 py-1 rounded-md hover:text-white active:scale-95"
                        onClick={() => {
                            if (item.type === ItemType.FILE) {
                                downloadFile();
                            } else {
                                downloadFolder();
                            }
                        }}
                    >
                        Download
                    </button>
                </>
            )}
        </div>
    );
}
