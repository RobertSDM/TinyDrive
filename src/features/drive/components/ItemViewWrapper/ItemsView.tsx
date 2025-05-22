import { Item } from "@/shared/types/types.ts";
import ItemRow from "./ItemRow.tsx";
import { useEffect, useState } from "react";

type ItemsViewProps = {
    items: Item[];
    isLoading: boolean;
    changeSelectedItem: (item: Item) => void;
    selectedItem: Item | null;
};

enum ItemOrder {
    name = "Name",
    updateDate = "Update date",
    creationDate = "Creation date",
}

const ItemsView = ({
    items,
    isLoading,
    changeSelectedItem,
    selectedItem,
}: ItemsViewProps) => {
    const [itemscp, setItemscp] = useState<Item[]>([]);
    const orders = Object.values(ItemOrder);
    const [pos, setPos] = useState<number>(2);

    useEffect(() => {
        if (items.length == 0) return;
        setItemscp([...items]);
    }, [items]);

    useEffect(() => {
        setItemscp((prev) =>
            [...prev].sort((a, b) => {
                switch (orders[pos]) {
                    case ItemOrder.name:
                        return a.name.localeCompare(b.name);
                    case ItemOrder.creationDate:
                        return -a.creation_date - b.creation_date;
                    case ItemOrder.creationDate:
                        return a.update_date - b.update_date;
                    default:
                        return -1;
                }
            })
        );
    }, [pos, items]);

    return (
        <div className="mt-2 mx-auto space-y-4 min-w-80">
            {items.length > 0 ? (
                <section>
                    <div className="flex w-full justify-between">
                        <span className="font-semibold text-slate-500">
                            Name
                        </span>
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
                </section>
            ) : (
                <section>
                    <span className="mx-auto flex justify-center text-black/30 font-semibold">
                        {isLoading
                            ? "Loading"
                            : "Nothing was found. Upload something"}
                    </span>
                </section>
            )}
        </div>
    );
};

export default ItemsView;
