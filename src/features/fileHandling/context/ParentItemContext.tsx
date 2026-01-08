import { Item, ItemType } from "@/types.ts";
import { createContext, ReactNode, useRef, useState } from "react";

type ParentItemContextProps = {
    parent: Item;
    changeParent: (parent: Item) => void;
    changeParentToRoot: () => void;
};

export const ParentItemContext = createContext<ParentItemContextProps>(
    {} as ParentItemContextProps
);

type ParentItemProviderProps = { children: ReactNode };
export function ParentItemProvider({ children }: ParentItemProviderProps) {
    const root = useRef<Item>(createRootItem());
    const [parent, setParent] = useState<Item>(root.current);

    function createRootItem(): Item {
        return {
            id: null,
            name: "root",
            extension: "",
            path: "/",
            type: ItemType.FOLDER,
            size: 0,
            parentid: null,
            content_type: "",
            size_prefix: "",
            creation_date: 0,
            update_date: 0,
        };
    }

    function changeParent(newParent: Item) {
        setParent(newParent);
    }

    function changeParentToRoot() {
        setParent(root.current);
    }

    return (
        <ParentItemContext.Provider
            value={{ parent: parent, changeParent, changeParentToRoot }}
        >
            {children}
        </ParentItemContext.Provider>
    );
}
