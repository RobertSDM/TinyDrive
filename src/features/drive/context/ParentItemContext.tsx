import { ItemType } from "@/shared/types/enums.ts";
import { Item } from "@/shared/types/index.ts";
import { createContext, ReactElement, useRef, useState } from "react";

type ParentItemProviderProps = { children: ReactElement[] };
type ParentItemContextProps = {
    parent: Item;
    changeParent: (parent: Item) => void;
    changeParentToRoot: () => void;
};

export const ParentItemContext = createContext<ParentItemContextProps>(
    {} as ParentItemContextProps
);

export function ParentItemProvider({ children }: ParentItemProviderProps) {
    const root = createRootItem();
    const [parent, setParent] = useState<Item>(root);

    function createRootItem(): Item {
        return {
            id: null,
            name: "root",
            extension: "",
            path: "/",
            type: ItemType.FOLDER,
            size: 0,
            size_prefix: "",
            creation_data: 0,
            update_date: 0,
        };
    }

    function changeParent(newParent: Item) {
        setParent(newParent);
    }

    function changeParentToRoot() {
        setParent(root);
    }

    return (
        <ParentItemContext.Provider
            value={{ parent: parent, changeParent, changeParentToRoot }}
        >
            {children}
        </ParentItemContext.Provider>
    );
}
