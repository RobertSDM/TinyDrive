import {
    useDriveItemsContext,
    useModalContext,
    useSessionContext,
} from "@/context/useContext.tsx";
import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { File } from "@/types.ts";
import { useQuery } from "@tanstack/react-query";
import { filesInFolder } from "../requests/fileRequests.ts";
import { FaFile } from "react-icons/fa";
import { FaFolderClosed } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ActionBar from "./ActionBar.tsx";
import DragAndDrop from "./DragAndDropModal.tsx";

const filterOrder = [
    { title: "Name", value: "name" },
    { title: "Update date", value: "updated.at" },
];

type ItemsViewProps = {
    parentid: string;
};
const FileList = ({ parentid }: ItemsViewProps) => {
    const itemsContainer = useRef<HTMLDivElement>(null);

    const currentPage = useRef<number>(0);
    const [filter, setFilter] = useState(0);

    const [isDragAndDropOpen, setIsDragAndDropOpen] = useState(false);

    const { openModal } = useModalContext();
    const { files: filesDrive, update } = useDriveItemsContext();

    const filesOrdered = useMemo(() => {
        let fs = [...filesDrive];
        let tmp;
        for (let i = 0; i < fs.length; i++) {
            if (!fs[i].is_dir) continue;

            for (let si = i; si > 0 && !fs[si - 1].is_dir; si--) {
                tmp = fs[si];
                fs[si] = fs[si - 1];
                fs[si - 1] = tmp;
            }
        }

        return fs;
    }, [filesDrive]);

    const { session } = useSessionContext();

    const [selectedRange, setSelectedRange] = useState<number[]>([]);

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

    const {
        data: files,
        isFetching,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["fileList"],
        queryFn: () =>
            filesInFolder(
                session!.userid,
                parentid,
                currentPage.current,
                filterOrder[filter].value
            ),
        retry: false,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (isFetching || isError) return;

        update({ type: "clear", file: {} as File });
        files!.forEach((f) => update({ file: f, type: "add" }));
    }, [files]);

    useEffect(() => {
        setSelectedRange([]);
        refetch();
    }, [parentid]);

    // useEffect(() => {
    //     const loaderObserver = new IntersectionObserver((_) => {}, {
    //         root: itemsContainer.current,
    //         rootMargin: "100px",
    //     });

    //     loaderObserver.observe(pageLoader.current as Element);

    //     return () => loaderObserver.disconnect();
    // }, []);

    // if (isFetching)
    //     return (
    //         <div className="flex w-full h-full justify-center items-center">
    //             <LogoLoader />
    //         </div>
    //     );

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
                <span className="mr-2">Filter by</span>
                <button
                    className="w-40 border text-center select-none h-8"
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
            </section>
            {filesDrive.length === 0 && (
                <div>
                    <span className="mx-auto flex justify-center text-black/30 font-semibold">
                        Nothing was found. Upload something!
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

    return (
        <section
            onClick={onclick}
            onDoubleClick={(e) => {
                e.preventDefault();
                if (file.is_dir) return;

                previewFile(file);
            }}
            className={`border-b hover:bg-purple-100 hover:border-none hover:border-purple-100 flex items-center h-12 max-h-12 min-h-12 p-4 cursor-default select-none justify-between overflow-hidden ${
                isSelected &&
                "bg-purple-300 hover:bg-purple-400 border-none text-white"
            }`}
        >
            {!file.is_dir ? (
                <div className={`flex items-center`}>
                    <FaFile
                        className={`mr-2 min-h-4 min-w-4 text-slate-500 ${
                            isSelected && "text-white"
                        }`}
                    />
                    <span
                        className={`whitespace-nowrap text-ellipsis overflow-hidden`}
                    >
                        {`${file.filename}`}
                    </span>
                    <span>
                        {`${file.extension} - ${file.size} ${file.size_prefix}`}
                    </span>
                </div>
            ) : (
                <Link
                    to={`/drive/${file.id}`}
                    onClick={() => {
                        update({ type: "clear", file: {} as File });
                    }}
                    className={`flex items-center`}
                >
                    <FaFolderClosed
                        className={` mr-2 min-h-4 min-w-4 text-slate-500 ${
                            isSelected && "text-white"
                        }`}
                    />
                    <span
                        className={`whitespace-nowrap text-ellipsis overflow-hidden max-w-60`}
                    >
                        {file.filename}
                    </span>
                </Link>
            )}
            <div
                className={`text-slate-500 hidden md:block ${
                    isSelected && "text-white"
                }`}
            >
                {`Updated at: ${new Date(file.updated_at)
                    .toLocaleDateString()
                    .split("/")
                    .map((d) => d.padStart(2, "0"))
                    .join("/")}`}
            </div>
        </section>
    );
}

export default FileList;
