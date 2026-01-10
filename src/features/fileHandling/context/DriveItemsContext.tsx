import { File } from "@/types.ts";
import { createContext, useReducer } from "react";

type context = {
    items: File[];
    update: React.Dispatch<{
        type: "add" | "del" | "update" | "clear";
        item: File;
    }>;
};
export const DriveItemsContext = createContext<context>({} as context);

export function DriveItemsProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [items, update] = useReducer(itemsReducer, [] as File[]);

    return (
        <DriveItemsContext.Provider value={{ items, update }}>
            {children}
        </DriveItemsContext.Provider>
    );
}

function itemsReducer(
    state: File[],
    action: { type: string; item: File }
): File[] {
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
        case "clear": {
            return [];
        }
    }
    return state;
}
