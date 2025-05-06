import { Item } from "@/shared/types/types.ts";
import ContentRow from "./ContentRow.tsx";

type ItemsViewProps = {
    items: Item[];
    isLoading: boolean;
};

const ItemsView = ({ items, isLoading }: ItemsViewProps) => {
    return (
        <div className="mt-2 mx-auto space-y-4">
            {items.length > 0 ? (
                <section
                // className="grid grid-flow-row gap-y-2 "
                >
                    <section
                    // className="grid grid-flow-col grid-cols-contentView "
                    >
                        <span className="font-semibold text-slate-500">
                            Name
                        </span>
                    </section>
                    <section className="space-y-2">
                        {items.map((item) => (
                            <ContentRow key={item.id} item={item} />
                        ))}
                    </section>
                </section>
            ) : (
                <section>
                    <span className="mx-auto flex justify-center text-black/30 font-semibold">
                        {isLoading
                            ? "Loading..."
                            : "No content saved. What about start now?"}
                    </span>
                </section>
            )}
        </div>
    );
};

export default ItemsView;
