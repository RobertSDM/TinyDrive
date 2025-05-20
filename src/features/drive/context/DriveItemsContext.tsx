import { Item } from "@/shared/types/types.ts";
import { createContext, ReactNode, useState } from "react";
type DriveItemsContext = {
    items: Item[];
    removeItem: (item: Item) => void;
    addItem: (item: Item) => void;
    updateItems: (items: Item[]) => void;
    reloadItems: () => void;
};
export const DriveItemsContext = createContext<DriveItemsContext>(
    {} as DriveItemsContext
);

type DriveItemsProviderProps = { children: ReactNode };
export function DriveItemsProvider({ children }: DriveItemsProviderProps) {
    const [items, setItems] = useState<Item[]>([]);

    function reloadItems() {
        setItems((prev) => [...prev]);
    }

    function updateItems(items: Item[]) {
        setItems(items);
    }

    function addItem(item: Item) {
        setItems((prev) => [...prev, item]);
    }

    function removeItem(item: Item) {
        setItems((prev) => prev.filter((it) => it.id !== item.id));
    }

    return (
        <DriveItemsContext.Provider
            value={{ items, addItem, removeItem, updateItems, reloadItems }}
        >
            {children}
        </DriveItemsContext.Provider>
    );
}
