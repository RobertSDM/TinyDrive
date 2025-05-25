import { useDriveItemsContext } from "@/shared/context/useContext.tsx";
import { Item } from "@/shared/types/types.ts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAllFromFolder } from "../../hooks/getItemsHooks.tsx";
import ItemRow from "./ItemRow.tsx";

type ItemsViewProps = {
    changeSelectedItem: (item: Item) => void;
    selectedItem: Item | null;
};

enum ItemOrder {
    name = "Name",
    updateDate = "Update date",
    creationDate = "Creation date",
}

const ItemsView = ({ changeSelectedItem, selectedItem }: ItemsViewProps) => {
    let { parentid } = useParams();
    const { items } = useDriveItemsContext();
    const { updateItems } = useDriveItemsContext();
    const [itemscp, setItemscp] = useState<Item[]>([]);
    const orders = Object.values(ItemOrder);
    const [pos, setPos] = useState<number>(2);
    const [page, setPage] = useState<number>(1);
    const {
        request: allFromFolder,
        data,
        isLoading,
    } = useAllFromFolder(parentid === "drive" ? "" : parentid!, page);

    useEffect(() => {
        setItemscp([...items]);
    }, [items]);

    useEffect(() => {
        allFromFolder();
    }, [parentid]);

    useEffect(() => {
        if (!data || !data.success) return;
        if (data.count === 0) return;

        updateItems(data.data);
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

    useEffect(() => {
        setItemscp((prev) =>
            prev.sort((a, b) => {
                switch (orders[pos]) {
                    case ItemOrder.name:
                        return a.name.localeCompare(b.name);
                    case ItemOrder.creationDate:
                        return -a.creation_date - b.creation_date;
                    case ItemOrder.updateDate:
                        return a.update_date - b.update_date;
                    default:
                        return -1;
                }
            })
        );
    }, [pos]);

    useEffect(() => {
        if (page === 1) return;

        allFromFolder();
    }, [page]);

    return (
        <div className="mt-2 mx-auto space-y-4 min-w-80">
            <section>
                <div className="flex w-full justify-between">
                    <span className="font-semibold text-slate-500">Name</span>
                    <button
                        className="w-52 border "
                        onClick={() => {
                            if (pos === orders.length - 1) setPos(0);
                            else setPos((prev) => prev + 1);
                        }}
                    >
                        order by: {orders[pos]}
                    </button>
                </div>
                <section className="flex gap-y-2 flex-col ">
                    {[...itemscp].map((item) => (
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
                {isLoading ? (
                    <section>
                        <span className="mx-auto flex justify-center text-black/30 font-semibold">
                            Loading
                        </span>
                    </section>
                ) : items.length == 0 ? (
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
