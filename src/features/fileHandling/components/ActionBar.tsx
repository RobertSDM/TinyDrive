import { useModalContext, useSessionContext } from "@/context/useContext.tsx";

import {
    deleteFolderById,
    downloadFile,
    updateName,
} from "../requests/fileRequests.ts";
import { useMutation } from "@tanstack/react-query";
import { File, FilenameRequest } from "@/types.ts";

type ActionBarProps = {
    selectionRange: number[];
    files: File[];
};
export default function ActionBar({
    selectionRange,
    files: filesOrdered,
}: ActionBarProps) {
    const { session } = useSessionContext();
    const { openModal } = useModalContext();

    const downloadFileMut = useMutation({
        mutationKey: ["downloadFile"],
        mutationFn: (fileids: string[]) =>
            downloadFile(fileids, session!.userid),
    });

    const deleteFileMut = useMutation({
        mutationFn: (fileids: string[]) =>
            deleteFolderById(session!.userid, fileids),
    });

    const updateFileMut = useMutation({
        mutationFn: (body: FilenameRequest) =>
            updateName(
                filesOrdered[selectionRange[0]].id!,
                session!.userid,
                body
            ),
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

    if (selectionRange.length === 0) return <div className={"h-10 p-1"}></div>;

    return (
        <div
            className={
                "h-10 px-1 rounded-md flex items-center gap-x-2 select-none"
            }
        >
            <button
                className="bg-red-200 hover:bg-red-500 hover:text-white p-2"
                onClick={() =>
                    openModal("confirm", {
                        fn: () => {
                            deleteFileMut.mutate([
                                ...filesOrdered
                                    .slice(
                                        selectionRange[0],
                                        selectionRange[1] + 1
                                    )
                                    .map((item) => item.id!),
                            ]);
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
                        fn: (name) => updateFileMut.mutate({ filename: name }),
                        title: "Type the name",
                    })
                }
            >
                Rename
            </button>
            <button
                className="bg-slate-200 hover:bg-slate-500 hover:text-white p-2"
                onClick={() => {
                    if (
                        selectionRange[0] === selectionRange[1] &&
                        filesOrdered[selectionRange[0]].is_dir
                    ) {
                        downloadFileMut.mutate([
                            filesOrdered[selectionRange[0]].id!,
                        ]);
                        return;
                    }

                    const files: string[] = [];

                    for (let file of filesOrdered.slice(
                        selectionRange[0],
                        selectionRange[1] + 1
                    )) {
                        if (file.is_dir) continue;
                        files.push(file.id!);
                    }

                    downloadFileMut.mutate(files);
                }}
            >
                Download
            </button>
        </div>
    );
}
