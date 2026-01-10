import {
    useDriveItemsContext,
    useModalContext,
    useSessionContext,
} from "@/context/useContext.tsx";
import { File } from "@/types.ts";

import {
    deleteFolderById,
    downloadFile,
    downloadFolder,
    updateName,
} from "../requests/fileRequests.ts";
import { useMutation, useQuery } from "@tanstack/react-query";

type ActionBarProps = {
    parentFolderId: string;
    selectionRange: File[];
};
export default function ActionBar({
    parentFolderId,
    selectionRange,
}: ActionBarProps) {
    const { update: updateItems } = useDriveItemsContext();
    const { session } = useSessionContext();
    const { openModal } = useModalContext();

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
            <button
                className="bg-red-200 hover:bg-red-500 hover:text-white p-2"
                onClick={() =>
                    openModal("confirm", {
                        fn: () => {
                            deleteFileMut.mutate({
                                itemids: [
                                    ...selectionRange.map((item) => item.id),
                                ],
                            });
                            // .then(() => {
                            //     deselectItem();
                            //     cleanSelectionRange();
                            // });
                        },
                        title: "Are you sure? All the data from the folder will be lost",
                    })
                }
            >
                Delete
            </button>
            <button
                className="bg-slate-200 hover:bg-slate-500 hover:text-white p-2"
                onClick={() =>
                    openModal("text", {
                        fn: (name) => updateFileMut.mutate({ name }),
                        title: "Type the name",
                    })
                }
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
