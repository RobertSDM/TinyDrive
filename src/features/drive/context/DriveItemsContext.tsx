import { Item } from "@/shared/types/types.ts";
import { createContext, ReactNode, useState } from "react";
type DriveItemsContext = {
    items: Item[];
    removeItem: (itemid: string) => void;
    addItem: (item: Item) => void;
    addItems: (items: Item[]) => void;
    updateItems: (items: Item[]) => void;
    selectItem: (item: Item) => void;
    deselectItem: () => void;
    selectedItem: Item | null;
    selectedRange: Item[];
    cleanSelectionRange: () => void;
    createSelectionRange: (item1: Item, item2: Item) => void;
};
export const DriveItemsContext = createContext<DriveItemsContext>(
    {} as DriveItemsContext
);

type DriveItemsProviderProps = { children: ReactNode };
export function DriveItemsProvider({ children }: DriveItemsProviderProps) {
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [selectedRange, setSelectedRange] = useState<Item[]>([]);

    function selectItem(item: Item) {
        cleanSelectionRange();
        setSelectedItem(
            item.id === selectedItem?.id && selectedRange.length === 0
                ? null
                : item
        );
    }

    function deselectItem() {
        setSelectedItem(null);
    }

    function cleanSelectionRange() {
        setSelectedRange([]);
    }

    function createSelectionRange(item1: Item, item2: Item) {
        if (item1.id === item2.id) {
            selectItem(item1);
            return;
        }

        const itemIndex1 = items.findIndex((item) => item.id === item1.id);
        const itemIndex2 = items.findIndex((item) => item.id === item2.id);

        setSelectedRange(
            items.slice(
                Math.min(itemIndex1, itemIndex2),
                Math.max(itemIndex1, itemIndex2) + 1
            )
        );
    }

    function addItems(items: Item[]) {
        items.forEach((item) => {
            addItem(item);
        });
    }

    function addItem(item: Item) {
        setItems((prev) => [...prev, item]);
    }

    function updateItems(items: Item[]) {
        setItems([]);
        addItems(items);
    }

    function removeItem(itemid: string) {
        setItems((prev) => prev.filter((it) => it.id !== itemid));
    }

    return (
        <DriveItemsContext.Provider
            value={{
                items,
                createSelectionRange,
                selectedRange,
                cleanSelectionRange,
                selectedItem,
                selectItem,
                deselectItem,
                addItem,
                removeItem,
                addItems,
                updateItems,
            }}
        >
            {children}
        </DriveItemsContext.Provider>
    );
}
