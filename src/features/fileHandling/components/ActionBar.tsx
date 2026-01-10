import {
    useDriveItemsContext,
    useSessionContext,
} from "@/context/useContext.tsx";
import { Item, ItemType } from "@/types.ts";
import { useEffect, useState } from "react";

import {
    deleteFolderById,
    downloadFile,
    downloadFolder,
    updateName,
} from "../requests/fileRequests.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import ConfirmModal from "@/components/ConfirmModal.tsx";
import TextModal from "@/components/TextModal.tsx";

type ActionBarProps = {
    parentFolderId: string;
    selectionRange: Item[];
};
export default function ActionBar({
    parentFolderId,
    selectionRange,
}: ActionBarProps) {
    const { update: updateItems } = useDriveItemsContext();
    const { session } = useSessionContext();

    const { refetch: downloadFolderQ } = useQuery({
        queryKey: ["downloadFolder"],
        queryFn: () => downloadFolder("", session!.userid),
        enabled: false,
    });
    const { refetch: downloadFileQ } = useQuery({
        queryKey: ["downloadFolder"],
        queryFn: () => downloadFile("", session!.userid),
        enabled: false,
    });

    const deleteFileMut = useMutation({
        mutationFn: (body: Object) => deleteFolderById(session!.userid, body),
    });

    const updateFileMut = useMutation({
        mutationFn: (body: Object) => updateName("", session!.userid, body),
    });

    const [isNameModalOpen, setIsNameModalOpen] = useState(false);
    const [isConfirmDeleteModalOpen, setIsConfirmModalOpen] = useState(false);

    // useEffect(() => {
    //     function action(e: KeyboardEvent) {
    //         if (!selectedItem) return;

    //         if (e.key === "Delete") {
    //             e.stopPropagation();
    //             e.preventDefault();

    //             const confirmDelete = confirm(
    //                 "Are you sure? All the data from the folder will be lost"
    //             );
    //             if (!confirmDelete) return;

    //             let ids;
    //             if (selectedRange.length > 0) {
    //                 ids = [...selectedRange.map((item) => item.id)];
    //             } else {
    //                 ids = [selectedItem.id];
    //             }

    //             delete_({
    //                 itemids: ids,
    //             });
    //             //.then(() => {
    //             //     deselectItem();
    //             //     cleanSelectionRange();
    //             // });
    //         }
    //     }
    // }, [selectedItem, selectedRange]);

    if (selectionRange.length === 0) return <div className={"h-10 px-1"}></div>;

    return (
        <div className={"h-10 px-1 rounded-md flex items-center gap-x-2"}>
            <ConfirmModal
                close={() => setIsConfirmModalOpen(false)}
                fn={() => {
                    deleteFileMut.mutate({
                        itemids: [...selectionRange.map((item) => item.id)],
                    });
                    // .then(() => {
                    //     deselectItem();
                    //     cleanSelectionRange();
                    // });
                }}
                isOpen={isConfirmDeleteModalOpen}
                title="Are you sure? All the data from the folder will be lost"
            />
            <TextModal
                close={() => setIsNameModalOpen(false)}
                fn={(name) => updateFileMut.mutate({ name })}
                isOpen={isNameModalOpen}
                title="Type the name"
            />
            <button
                className="bg-red-200 hover:bg-red-500 hover:text-white p-2"
                onClick={() => setIsConfirmModalOpen(true)}
            >
                Delete
            </button>
            <button
                className="bg-slate-200 hover:bg-slate-500 hover:text-white p-2"
                onClick={() => setIsNameModalOpen(true)}
            >
                Rename
            </button>
            <button
                className="bg-slate-200 hover:bg-slate-500 hover:text-white p-2"
                onClick={() => {
                    if (selectionRange.length === 1) {
                    }
                }}
            >
                Download
            </button>
        </div>
    );
}
