import TextModal from "@/shared/components/ModalWrapper/TextModal.tsx";
import {
    useDriveItemsContext,
    useModalContext,
} from "@/shared/context/useContext.tsx";
import { ItemType } from "@/shared/types/enums.ts";
import { useEffect } from "react";
import useDeleteItem from "../../hooks/deleteHooks.tsx";
import {
    useDonwloadFile,
    useDownloadFolder,
} from "../../hooks/downloadHooks.tsx";
import { useUpdateName } from "../../hooks/updateHooks.tsx";
import { useParams } from "react-router-dom";

type ActionBarProps = {};
export default function ActionBar({}: ActionBarProps) {
    const { parentid } = useParams();
    const { selectedItem, deselectItem, selectedRange, cleanSelectionRange } =
        useDriveItemsContext();
    const { request: downloadFolder } = useDownloadFolder(selectedItem!);
    const { request: downloadFile } = useDonwloadFile(selectedItem!);
    const { request: delete_ } = useDeleteItem();
    const { request: update } = useUpdateName(selectedItem!);
    const { closeModal, openModal, isOpen } = useModalContext();

    useEffect(() => {
        deselectItem();
        cleanSelectionRange();
    }, [parentid]);

    useEffect(() => {
        function action(e: KeyboardEvent) {
            if (!selectedItem) return;

            if (e.key === "Delete") {
                e.stopPropagation();
                e.preventDefault();

                const confirmDelete = confirm(
                    "Are you sure? All the data from the folder will be lost"
                );
                if (!confirmDelete) return;

                let ids;
                if (selectedRange.length > 0) {
                    ids = [...selectedRange.map((item) => item.id)];
                } else {
                    ids = [selectedItem.id];
                }

                delete_({
                    itemids: ids,
                }).then(() => {
                    deselectItem();
                    cleanSelectionRange();
                });
            }
        }

        window.addEventListener("keydown", action);

        return () => {
            window.removeEventListener("keydown", action);
        };
    }, [selectedItem, selectedRange]);

    return (
        <div
            className={`h-10  px-1 rounded-md my-2 flex items-center gap-x-2  "bg-white"
            `}
        >
            {selectedItem && (
                <>
                    <button
                        className="hover:bg-red-400 bg-red-200 px-2 py-1 rounded-md hover:text-white active:scale-95"
                        onClick={() => {
                            const confirmDelete = confirm(
                                "Are you sure? All the data from the folder will be lost"
                            );
                            if (!confirmDelete) return;

                            let ids;
                            if (selectedRange.length > 0) {
                                ids = [...selectedRange.map((item) => item.id)];
                            } else {
                                ids = [selectedItem.id];
                            }

                            delete_({
                                itemids: ids,
                            }).then(() => {
                                deselectItem();
                                cleanSelectionRange();
                            });
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
                                    isOpen={isOpen}
                                />
                            );
                        }}
                    >
                        Rename
                    </button>
                    <button
                        className="hover:bg-slate-400 bg-slate-200 px-2 py-1 rounded-md hover:text-white active:scale-95"
                        onClick={() => {
                            if (selectedItem.type === ItemType.FILE) {
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
