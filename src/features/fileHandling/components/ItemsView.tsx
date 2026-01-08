import { useDriveItemsContext } from "@/context/useContext.tsx";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ItemRow from "./ItemRow.tsx";
import { ItemType } from "@/types.ts";
import { useFilesFromFolder } from "../hooks/fileHandlingHooks.tsx";

const sortFilters: {
    exhibitionTitle: string;
    title: string;
}[] = [
    {
        exhibitionTitle: "Name",
        title: "name",
    },
    {
        exhibitionTitle: "Update date",
        title: "upddate",
    },
];

type ItemsViewProps = {};
const ItemsView = ({}: ItemsViewProps) => {
    let { parentid } = useParams();
    const pageLoader = useRef<HTMLDivElement>(null);
    const itemsContainer = useRef<HTMLDivElement>(null);
    const { items } = useDriveItemsContext();
    const {
        addItems,
        updateItems,
        selectItem,
        selectedItem,
        createSelectionRange,
        selectedRange,
    } = useDriveItemsContext();
    const [filter, setFilter] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const {
        request: allFromFolder,
        data,
        isLoading,
    } = useFilesFromFolder(
        parentid === "drive" ? "" : parentid!,
        page,
        sortFilters[filter].title
    );

    useEffect(() => {
        setPage(0);
        updateItems([]);
    }, [parentid, filter]);

    useEffect(() => {
        allFromFolder();
    }, [page, filter, parentid]);

    useEffect(() => {
        if (!data || !data.success || data.count === 0) return;

        addItems(data.data);
    }, [data]);

    useEffect(() => {
        const loaderObserver = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];

                if (
                    !entry.isIntersecting ||
                    (!!data && data.count === 0) ||
                    !data ||
                    isLoading
                )
                    return;

                setPage((prev) => prev + 1);
            },
            {
                root: itemsContainer.current,
                rootMargin: "100px",
            }
        );

        loaderObserver.observe(pageLoader.current as Element);
        return () => loaderObserver.disconnect();
    }, [data]);

    return (
        <div className="mt-2 mx-auto space-y-4 min-w-80">
            <div className="flex w-full justify-between">
                <span className="font-semibold text-slate-500">Name</span>
                <button
                    className="w-52 border"
                    onClick={() => {
                        if (filter === sortFilters.length - 1) setFilter(0);
                        else setFilter((prev) => prev + 1);
                    }}
                >
                    order by: {sortFilters[filter].exhibitionTitle}
                </button>
            </div>
            <section
                className="flex gap-y-2 flex-col mt-5 overflow-y-scroll max-h-[60vh]"
                ref={itemsContainer}
            >
                {items
                    .filter((item) => item.type === ItemType.FOLDER)
                    .map((item) => (
                        <ItemRow
                            onclick={(e: MouseEvent) => {
                                if (e.shiftKey && selectedItem !== null) {
                                    e.preventDefault();
                                    createSelectionRange(selectedItem, item);
                                    return;
                                }
                                selectItem(item);
                            }}
                            key={item.id}
                            item={item}
                            isSelected={
                                (selectedItem !== null &&
                                    selectedItem.id === item.id) ||
                                selectedRange.includes(item)
                            }
                        />
                    ))}
                {items
                    .filter((item) => item.type === ItemType.FILE)
                    .map((item) => (
                        <ItemRow
                            onclick={(e: MouseEvent) => {
                                if (e.shiftKey && selectedItem !== null) {
                                    e.preventDefault();
                                    createSelectionRange(selectedItem, item);
                                    return;
                                }
                                selectItem(item);
                            }}
                            key={item.id}
                            item={item}
                            isSelected={
                                (selectedItem !== null &&
                                    selectedItem.id === item.id) ||
                                selectedRange.includes(item)
                            }
                        />
                    ))}
                <div ref={pageLoader}></div>
            </section>
            {items.length === 0 ? (
                <section>
                    <span className="mx-auto flex justify-center text-black/30 font-semibold">
                        Nothing was found. Upload something
                    </span>
                </section>
            ) : (
                <></>
            )}
        </div>
    );
};

export default ItemsView;
