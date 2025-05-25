import { useDriveItemsContext } from "@/shared/context/useContext.tsx";
import { Item } from "@/shared/types/types.ts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAllFromFolder } from "../../hooks/getItemsHooks.tsx";
import ItemRow from "./ItemRow.tsx";
import sortFilters from "../../constants/itemsSort.ts";

type ItemsViewProps = {
    changeSelectedItem: (item: Item) => void;
    selectedItem: Item | null;
};

const ItemsView = ({ changeSelectedItem, selectedItem }: ItemsViewProps) => {
    let { parentid } = useParams();
    const { folders, files } = useDriveItemsContext();
    const { addItems, updateItems } = useDriveItemsContext();
    const [filter, setFilter] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const {
        request: allFromFolder,
        data,
        isLoading,
    } = useAllFromFolder(
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
                <section className="flex gap-y-2 flex-col ">
                    {folders.map((item) => (
                        <ItemRow
                            onclick={() => changeSelectedItem(item)}
                            key={item.id}
                            item={item}
                            isSelected={
                                selectedItem !== null &&
                                selectedItem.id === item.id
                            }
                        />
                    ))}
                    {files.map((item) => (
                        <ItemRow
                            onclick={() => changeSelectedItem(item)}
                            key={item.id}
                            item={item}
                            isSelected={
                                selectedItem !== null &&
                                selectedItem.id === item.id
                            }
                        />
                    ))}
                </section>
                {folders.length === 0 && files.length === 0 ? (
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
