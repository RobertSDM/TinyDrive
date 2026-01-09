import { Item } from "@/types.ts";
import { createContext, useReducer } from "react";

type context = {
    items: Item[];
    update: React.Dispatch<{
        type: string;
        item: Item;
    }>;
};
export const DriveItemsContext = createContext<context>({} as context);

export function DriveItemsProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [items, update] = useReducer(itemsReducer, [] as Item[]);

    return (
        <DriveItemsContext.Provider value={{ items, update }}>
            {children}
        </DriveItemsContext.Provider>
    );
}

function itemsReducer(
    state: Item[],
    action: { type: string; item: Item }
): Item[] {
    switch (action.type) {
        case "add":
            return [...state, action.item];
        case "del": {
            let tmp = [...state];
            tmp = tmp.filter((item) => item.id !== action.item.id);
            return tmp;
        }
        case "update": {
            let tmp = [...state];
            tmp = tmp.filter((item) => item.id !== action.item.id);
            return [...tmp, action.item];
        }
    }
    return state;
}
