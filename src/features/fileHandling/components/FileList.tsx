import {
    useDriveItemsContext,
    useModalContext,
    useAccountContext,
} from "@/context/useContext.tsx";
import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { File } from "@/types.ts";
import { useQuery } from "@tanstack/react-query";
import { filesInFolder } from "../requests/fileRequests.ts";
import { FaFile } from "react-icons/fa";
import { FaFolderClosed } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ActionBar from "./ActionBar.tsx";
import DragAndDrop from "./DragAndDropModal.tsx";

const filterOrder = [
    { title: "Nome", value: "name" },
    { title: "Data atualização", value: "updated.at" },
];

function useBubbleFolders(files: File[]) {
    return useMemo(() => {
        let filesCopy = [...files];
        let tmp;
        for (let i = 0; i < filesCopy.length; i++) {
            if (!filesCopy[i].is_dir) continue;

            for (
                let swap_index = i;
                swap_index > 0 && !filesCopy[swap_index - 1].is_dir;
                swap_index--
            ) {
                tmp = filesCopy[swap_index];
                filesCopy[swap_index] = filesCopy[swap_index - 1];
                filesCopy[swap_index - 1] = tmp;
            }
        }

        return filesCopy;
    }, [files]);
}

type ItemsViewProps = {
    parentid: string;
};
const FileList = ({ parentid }: ItemsViewProps) => {
    const itemsContainer = useRef<HTMLDivElement>(null);
    const pageLoader = useRef<HTMLDivElement>(null);

    const currentPage = useRef<number>(0);
    const [filter, setFilter] = useState(0);

    const [isDragAndDropOpen, setIsDragAndDropOpen] = useState(false);
    const [selectedRange, setSelectedRange] = useState<number[]>([]);

    const { account, isLoading } = useAccountContext();
    const { openModal } = useModalContext();
    const { files: filesDrive, update } = useDriveItemsContext();

    const filesOrdered = useBubbleFolders(filesDrive);

    const { data: files, isFetching } = useQuery({
        queryKey: ["fileList", parentid],
        queryFn: () =>
            filesInFolder(
                account!.id,
                parentid,
                currentPage.current,
                filterOrder[filter].value
            ),
        retry: false,
        enabled: !isLoading || !!account,
        refetchOnWindowFocus: false,
    });

    function selectionRange(start: number, end: number = -1) {
        if (end >= filesDrive.length)
            throw new Error("End index cannot be greater than the items list");

        if (end === -1 && selectedRange[0] === start) {
            setSelectedRange([]);
            return;
        }

        if (end === -1) setSelectedRange([start, start]);
        else setSelectedRange([start, end]);
    }

    useEffect(() => {
        if (!files) return;

        update({ file: {} as File, type: "clear" });
        files!.forEach((f) => update({ file: f, type: "add" }));

        const loaderObserver = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];

                if (
                    !entry.isIntersecting ||
                    files!.length % 12 !== 0 ||
                    files!.length === 0
                )
                    return;

                currentPage.current += 1;
            },
            {
                root: itemsContainer.current,
                rootMargin: "50px",
            }
        );

        loaderObserver.observe(pageLoader.current as Element);

        return () => loaderObserver.disconnect();
    }, [isFetching]);

    useEffect(() => {
        setSelectedRange([]);
        currentPage.current = 0;
        update({ file: {} as File, type: "clear" });
    }, [parentid]);

    return (
        <div
            className="relative h-[648px] space-y-2"
            onDragEnter={(e) => {
                if (!e.dataTransfer.types.includes("Files")) return;

                setIsDragAndDropOpen(true);
            }}
        >
            <DragAndDrop
                close={() => setIsDragAndDropOpen(false)}
                isOpen={isDragAndDropOpen}
                parentid={parentid}
            />
            <ActionBar selectionRange={selectedRange} files={filesOrdered} />
            <div>
                <span className="mr-2 text-sm md:text-base">Filtro</span>
                <button
                    className="px-4 border text-center select-none h-8 text-sm md:text-base"
                    onClick={() => {
                        if (filter === filterOrder.length - 1) setFilter(0);
                        else setFilter((prev) => prev + 1);
                    }}
                >
                    {filterOrder[filter].title}
                </button>
            </div>
            <section
                className="flex gap-y-2 flex-col overflow-y-scroll max-h-[60vh]"
                ref={itemsContainer}
            >
                {filesOrdered.map((item, index) => {
                    return (
                        <FileRow
                            previewFile={(file) => {
                                openModal("preview", {
                                    fn: () => {},
                                    title: "",
                                    file,
                                });
                            }}
                            onclick={(e: MouseEvent) => {
                                if (e.shiftKey) {
                                    e.preventDefault();
                                    selectionRange(selectedRange[0], index);
                                    return;
                                }
                                selectionRange(index);
                            }}
                            key={item.id}
                            file={item}
                            isSelected={
                                index >= selectedRange[0] &&
                                index <= selectedRange[1]
                            }
                        />
                    );
                })}
                <div ref={pageLoader}></div>
            </section>
            {filesDrive.length === 0 && (
                <div>
                    <span className="mx-auto flex justify-center text-black/30 font-semibold">
                        {isFetching
                            ? "Carregando..."
                            : "Nada foi encontrado. Salve algo!"}
                    </span>
                </div>
            )}
        </div>
    );
};

type ItemRowProps = {
    file: File;
    isSelected: boolean;
    onclick: (e: MouseEvent) => void;
    previewFile: (file: File) => void;
};

function FileRow({ file, onclick, isSelected, previewFile }: ItemRowProps) {
    const { update } = useDriveItemsContext();
    const navigate = useNavigate();

    return (
        <section
            onClick={onclick}
            onDoubleClick={(e) => {
                e.preventDefault();
                if (file.is_dir) return;

                previewFile(file);
            }}
            className={`border-b text-sm md:text-base hover:bg-purple-100 hover:border-none hover:border-purple-100 flex items-center h-12 max-h-12 min-h-12 p-4 cursor-default select-none justify-between overflow-hidden gap-x-4 ${
                isSelected &&
                "bg-purple-300 hover:bg-purple-400 border-none text-white"
            }`}
        >
            <div
                className={`flex items-center w-[clamp(25em,100%,55rem)] overflow-hidden`}
            >
                {file.is_dir ? (
                    <FaFolderClosed
                        className={` mr-2 min-h-4 min-w-4 text-slate-500 ${
                            isSelected && "text-white"
                        }`}
                    />
                ) : (
                    <FaFile
                        className={`mr-2 min-h-4 min-w-4 text-slate-500 ${
                            isSelected && "text-white"
                        }`}
                    />
                )}
                <span
                    onClick={(e) => {
                        if (file.is_dir) e.stopPropagation();

                        if (!file.is_dir) return;

                        navigate(`/drive/${file.id}`);
                        update({
                            type: "clear",
                            file: {} as File,
                        });
                    }}
                    className={`whitespace-nowrap text-ellipsis overflow-hidden 
                        ${file.is_dir && "cursor-pointer"} ${
                        file.extension === "" && "mr-2"
                    }`}
                >
                    {`${file.filename}`}
                </span>
                {!file.is_dir && (
                    <span className="text-nowrap">
                        {`${file.extension} - ${file.size} ${file.size_prefix}`}
                    </span>
                )}
            </div>

            <div
                className={`text-slate-500 hidden md:block text-nowrap ${
                    isSelected && "text-white"
                }`}
            >
                {`Ultima atualização: ${new Date(file.updated_at)
                    .toLocaleDateString("pt-BR")
                    .split("/")
                    .map((d) => d.padStart(2, "0"))
                    .join("/")}`}
            </div>
        </section>
    );
}

export default FileList;
