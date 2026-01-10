import {
    useDriveItemsContext,
    useSessionContext,
} from "@/context/useContext.tsx";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { File, FileType } from "@/types.ts";
import { useQuery } from "@tanstack/react-query";
import { filesFromFolder } from "../requests/fileRequests.ts";
import { FaFile } from "react-icons/fa";
import { FaFolderClosed } from "react-icons/fa6";
import { Link } from "react-router-dom";

const filterOrder = [
    { title: "Name", value: "name" },
    { title: "Update date", value: "updated.at" },
];

type ItemsViewProps = {};
const FileList = ({}: ItemsViewProps) => {
    const pageLoader = useRef<HTMLDivElement>(null);
    const itemsContainer = useRef<HTMLDivElement>(null);

    const currentPage = useRef<number>(1);
    const [filter, setFilter] = useState(0);

    const { items, update } = useDriveItemsContext();
    const { session } = useSessionContext();

    // const files: Item[] = [
    //     {
    //         content_type: "text/plain ",
    //         creation_date: new Date().getTime(),
    //         extension: "txt",
    //         id: "123",
    //         name: "não abra!",
    //         parentid: null,
    //         path: "/",
    //         size: 10,
    //         size_prefix: "kb",
    //         type: ItemType.FILE,
    //         update_date: new Date().getTime(),
    //     },
    //     {
    //         content_type: "",
    //         creation_date: new Date().getTime(),
    //         extension: "txt",
    //         id: "321",
    //         name: "senhas muitwo importates             dsadsadawdwadsawdsawd wadsassssssssssssssssssssssssssssssssssssss",
    //         parentid: null,
    //         path: "/",
    //         size: 10,
    //         size_prefix: "kb",
    //         type: ItemType.FOLDER,
    //         update_date: new Date().getTime(),
    //     },
    // ];

    const {
        data: files,
        isFetching,
        isError,
    } = useQuery({
        queryKey: ["fileList"],
        queryFn: () =>
            filesFromFolder(
                session!.userid,
                "",
                currentPage.current,
                filterOrder[filter].value
            ),
        retry: false,
    });

    useEffect(() => {
        if (isFetching || isError) return;

        update({ type: "clear", item: {} as File });
        files!.forEach((f) => update({ item: f, type: "add" }));
    }, [files]);

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
        <div className="mt-2 mx-auto space-y-4 min-w-80 w-full max-w-5xl">
            <button
                className="w-52 border text-center "
                onClick={() => {
                    if (filter === filterOrder.length - 1) setFilter(0);
                    else setFilter((prev) => prev + 1);
                }}
            >
                Filter by: {filterOrder[filter].title}
            </button>
            <section
                className="flex gap-y-2 flex-col mt-5 overflow-y-scroll max-h-[60vh]"
                ref={itemsContainer}
            >
                {items
                    .filter((item) => item.type === FileType.FOLDER)
                    .map((item) => (
                        <ItemRow
                            onclick={(e: MouseEvent) => {
                                // if (e.shiftKey && selectedItem !== null) {
                                //     e.preventDefault();
                                //     createSelectionRange(selectedItem, item);
                                //     return;
                                // }
                                // selectItem(item);
                            }}
                            key={item.id}
                            item={item}
                            isSelected={false}
                        />
                    ))}
                {items
                    .filter((item) => item.type === FileType.FILE)
                    .map((item) => (
                        <ItemRow
                            onclick={(e: MouseEvent) => {
                                // if (e.shiftKey && selectedItem !== null) {
                                //     e.preventDefault();
                                //     createSelectionRange(selectedItem, item);
                                //     return;
                                // }
                                // selectItem(item);
                            }}
                            key={item.id}
                            item={item}
                            isSelected={true}
                        />
                    ))}
                <div ref={pageLoader}></div>
            </section>
            {items.length === 0 && (
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
    item: File;
    isSelected: boolean;
    onclick: (e: MouseEvent) => void;
};

function ItemRow({ item, onclick, isSelected }: ItemRowProps) {
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    return (
        <section
            onClick={onclick}
            onDoubleClick={(e) => {
                e.preventDefault();
                if (item.type === FileType.FOLDER) return;

                setIsPreviewOpen(true);
            }}
            className={`border-b hover:bg-purple-100 hover:border-none hover:border-purple-100 flex items-center h-12 max-h-12 min-h-12 p-4 cursor-default select-none justify-between ${
                isSelected &&
                "bg-purple-300 hover:bg-purple-400 border-none text-white"
            }`}
        >
            {/* <Preview
                close={() => setIsPreviewOpen(false)}
                isOpen={isPreviewOpen}
                item={item}
            /> */}

            {item.type === FileType.FILE ? (
                <div className={`flex items-center`}>
                    <FaFile
                        className={`mr-2 min-h-4 min-w-4 text-slate-500 ${
                            isSelected && "text-white"
                        }`}
                    />
                    <span
                        className={`whitespace-nowrap text-ellipsis overflow-hidden`}
                    >
                        {`${item.name}`}
                    </span>
                    <span>
                        {`.${item.extension} - ${item.size} ${item.size_prefix}`}
                    </span>
                </div>
            ) : (
                <Link to={`/drive/${item.id}`} className={`flex items-center`}>
                    <FaFolderClosed
                        className={` mr-2 min-h-4 min-w-4 text-slate-500 ${
                            isSelected && "text-white"
                        }`}
                    />
                    <span
                        className={`whitespace-nowrap text-ellipsis overflow-hidden max-w-60`}
                    >
                        {item.name}
                    </span>
                </Link>
            )}
            <div
                className={`text-slate-500 hidden md:block ${
                    isSelected && "text-white"
                }`}
            >
                {`Updated at: ${new Date(item.update_date)
                    .toLocaleDateString()
                    .split("/")
                    .map((d) => d.padStart(2, "0"))
                    .join("/")}`}
            </div>
        </section>
    );
}

export default FileList;
