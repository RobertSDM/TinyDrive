import { useDriveItemsContext } from "@/shared/context/useContext.tsx";
import { MouseEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAllFromFolder } from "../../hooks/getItemsHooks.tsx";
import ItemRow from "./ItemRow.tsx";
import sortFilters from "../../constants/itemsSort.ts";
import { ItemType } from "@/shared/types/enums.ts";

type ItemsViewProps = {};
const ItemsView = ({}: ItemsViewProps) => {
    let { parentid } = useParams();
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
    const { request: allFromFolder, data } = useAllFromFolder(
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
        function action() {
            const { scrollTop, scrollHeight, clientHeight } =
                document.documentElement;

            if (scrollTop + clientHeight < scrollHeight || data?.count === 0)
                return;

            setPage((prev) => prev + 1);
        }

        document.addEventListener("scroll", action);
        return () => document.removeEventListener("scroll", action);
    }, [data]);

    return (
        <div className="mt-2 mx-auto space-y-4 min-w-80">
            <section>
                <div className="flex w-full justify-between">
                    <span className="font-semibold text-slate-500">Name</span>
                    <button
                        className="w-52 border "
                        onClick={() => {
                            if (filter === sortFilters.length - 1) setFilter(0);
                            else setFilter((prev) => prev + 1);
                        }}
                    >
                        order by: {sortFilters[filter].exhibitionTitle}
                    </button>
                </div>
                <section className="flex gap-y-2 flex-col mt-5">
                    {items
                        .filter((item) => item.type === ItemType.FOLDER)
                        .map((item) => (
                            <ItemRow
                                onclick={(e: MouseEvent) => {
                                    if (e.shiftKey && selectedItem !== null) {
                                        e.preventDefault();
                                        createSelectionRange(
                                            selectedItem,
                                            item
                                        );
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
                                        createSelectionRange(
                                            selectedItem,
                                            item
                                        );
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
            </section>
        </div>
    );
};

export default ItemsView;
