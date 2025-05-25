import { ItemType } from "@/shared/types/enums.ts";
import { Item } from "@/shared/types/types.ts";
import { createContext, ReactNode, useState } from "react";
type DriveItemsContext = {
    folders: Item[];
    files: Item[];
    removeItem: (itemid: string) => void;
    addItem: (item: Item) => void;
    addItems: (items: Item[]) => void;
    updateItems: (items: Item[]) => void;
};
export const DriveItemsContext = createContext<DriveItemsContext>(
    {} as DriveItemsContext
);

type DriveItemsProviderProps = { children: ReactNode };
export function DriveItemsProvider({ children }: DriveItemsProviderProps) {
    const [folders, setFolders] = useState<Item[]>([]);
    const [files, setFiles] = useState<Item[]>([]);

    function addItems(items: Item[]) {
        items.forEach((item) => {
            addItem(item);
        });
    }

    function addItem(item: Item) {
        if (item.type === ItemType.FILE) {
            setFiles((prev) => [...prev, item]);
        } else {
            setFolders((prev) => [...prev, item]);
        }
    }

    function updateItems(items: Item[]) {
        setFiles([])
        setFolders([])
        addItems(items)
    }

    function removeItem(itemid: string) {
        setFiles((prev) => prev.filter((it) => it.id !== itemid));
        setFolders((prev) => prev.filter((it) => it.id !== itemid));
    }

    return (
        <DriveItemsContext.Provider
            value={{
                folders,
                files,
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
