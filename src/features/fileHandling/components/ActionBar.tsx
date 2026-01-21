import { useModalContext } from "@/context/useContext.tsx";

import { File } from "@/types.ts";
import useUpdateName, {
    useDeleteFile,
    useDownloadFile,
} from "../hooks/fileServices.tsx";
import { FaTrash } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import React from "react";

type ActionBarProps = {
    selectionRange: number[];
    files: File[];
};
export default function ActionBar({
    selectionRange,
    files: filesOrdered,
}: ActionBarProps) {
    const { openModal } = useModalContext();

    const downloadFileMut = useDownloadFile();
    const deleteFileMut = useDeleteFile();
    const updateFileMut = useUpdateName(
        filesOrdered[selectionRange[0]]?.id ?? ""
    );

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
            <SimpleButton
                classname="bg-red-200 hover:bg-red-500 hover:text-white group"
                onclick={() =>
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
                icon={
                    <FaTrash
                        className="text-red-500 group-hover:text-white"
                        size={20}
                    />
                }
            />

            <SimpleButton
                classname="bg-slate-200 hover:bg-slate-500 group"
                onclick={() =>
                    openModal("text", {
                        fn: (name) => updateFileMut.mutate({ filename: name }),
                        title: "Type the name",
                    })
                }
                icon={
                    <MdEdit
                        size={20}
                        className="text-slate-500 group-hover:text-white"
                    />
                }
            />
            <SimpleButton
                classname="bg-slate-200 hover:bg-slate-500 group"
                onclick={() => {
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
                icon={
                    <MdDownload
                        size={20}
                        className="text-slate-500 group-hover:text-white"
                    />
                }
            />
        </div>
    );
}

type SimpleButtonProps = {
    onclick: () => void;
    icon: React.ReactNode;
    classname?: string;
};
function SimpleButton({ onclick, icon, classname }: SimpleButtonProps) {
    return (
        <button
            className={`hover:text-white p-2 rounded-sm ${classname}`}
            onClick={onclick}
        >
            {icon}
        </button>
    );
}
