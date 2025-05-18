import { Item } from "@/shared/types/index.ts";
import ItemRow from "./ItemRow.tsx";

type ItemsViewProps = {
    items: Item[];
    isLoading: boolean;
    changeSelectedItem: (item: Item) => void;
    selectedItem: Item | null;
};

const ItemsView = ({
    items,
    isLoading,
    changeSelectedItem,
    selectedItem,
}: ItemsViewProps) => {
    return (
        <div className="mt-2 mx-auto space-y-4">
            {items.length > 0 ? (
                <section className="grid grid-flow-row gap-y-2">
                    <section className="grid grid-flow-col grid-cols-contentView">
                        <span className="font-semibold text-slate-500">
                            Name
                        </span>
                    </section>
                    <section className="flex gap-y-2 flex-col">
                        {items.map((item) => (
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
