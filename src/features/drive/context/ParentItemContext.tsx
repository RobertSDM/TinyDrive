import { ItemType } from "@/shared/types/enums.ts";
import { Item } from "@/shared/types/types.ts";
import { createContext, ReactNode, useState } from "react";

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
            parentid: null,
            size_prefix: "",
            creation_date: 0,
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
