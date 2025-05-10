import { Item } from "@/shared/types/index.ts";
import ItemRow from "./ItemRow.tsx";

type ItemsViewProps = {
    items: Item[];
    isLoading: boolean;
};

const ItemsView = ({ items, isLoading }: ItemsViewProps) => {
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
                            <ItemRow key={item.id} item={item} />
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
