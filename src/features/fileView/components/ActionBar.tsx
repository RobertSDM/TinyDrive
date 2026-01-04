import TextModal from "@/components/TextModal.tsx";
import { driveItemsContext, modalContext } from "@/context/useContext.tsx";
import { ItemType } from "@/types.ts";
import { useEffect } from "react";
import {
    useDownloadFile,
    useDownloadFolder,
} from "@/features/fileView/hooks/requests/downloadHooks.tsx";
import { useUpdateName } from "@/features/fileView/hooks/requests/updateHooks.tsx";
import useDeleteFiles from "../hooks/fileView.tsx";

type ActionBarProps = {
    parentFolderId: string;
};
export default function ActionBar({ parentFolderId }: ActionBarProps) {
    const { selectedItem, deselectItem, selectedRange, cleanSelectionRange } =
        driveItemsContext;
    const { request: downloadFolder } = useDownloadFolder(selectedItem!);
    const { request: downloadFile } = useDownloadFile(selectedItem!);
    const { request: delete_ } = useDeleteFiles();
    const { request: update } = useUpdateName(selectedItem!);
    const { closeModal, openModal, isOpen } = modalContext;

    useEffect(() => {
        deselectItem();
        cleanSelectionRange();
    }, [parentFolderId]);

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
