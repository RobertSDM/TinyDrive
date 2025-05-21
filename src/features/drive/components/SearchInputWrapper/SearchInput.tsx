import useRequest from "@/shared/hooks/useRequest.tsx";
import { useEffect, useState } from "react";
import { ItemSearch as ItemSearchConfig } from "../../api/requestConfig.ts";
import { useAuthContext } from "@/shared/context/useContext.tsx";
import { Item, ListItemResponse } from "@/shared/types/types.ts";
import { ItemType } from "@/shared/types/enums.ts";
import ItemRow from "../ItemViewWrapper/ItemRow.tsx";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
    const { account, session } = useAuthContext();
    const [query, setQuery] = useState<string>("");
    const types = ["all", ItemType.FILE, ItemType.FOLDER];
    const [type, setType] = useState<number>(0);
    const [items, setItems] = useState<Item[]>([]);
    const navigate = useNavigate();
    const {
        data,
        isLoading,
        request: search,
    } = useRequest<ListItemResponse>(
        ItemSearchConfig(
            account!.id,
            query,
            session!.accessToken,
            types[type] === "all" ? null : types[type]
        )
    );
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function open() {
        setIsOpen(true);
    }

    function close() {
        setIsOpen(false);
    }

    function changeType() {
        if (type == types.length - 1) {
            setType(0);
        } else {
            setType((prev) => prev + 1);
        }
    }

    useEffect(() => {
        if (query.length <= 1) {
            setItems([]);
            close();
            return;
        }

        let timer = setTimeout(() => {
            search();
            open();
        }, 500);
        return () => {
            clearTimeout(timer);
        };
    }, [query]);

    useEffect(() => {
        if (!data) return;
        setItems(data.data);
    }, [data]);

    return (
        <section
            className={`border px-2 py-1 rounded-md items-center relative w-1/2 hidden md:flex gap-x-4 min-w-[350px]`}
        >
            <input
                className={`outline-none w-full`}
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                placeholder="Search"
                onKeyDown={(e) => {
                    if (e.key === "Escape") {
                        e.preventDefault();
                        e.stopPropagation();
                        e.currentTarget.blur();
                    } else if (e.key === "Enter") {
                        e.preventDefault();
                        e.stopPropagation();
                        search();
                    }
                }}
            />
            <button
                className="w-20 px-2 border rounded-md"
                onClick={changeType}
            >
                {types[type].toLowerCase()}
            </button>
            <div
                className={`top-full left-0 border- border rounded-b-md bg-white absolute z-40 p-2 w-full  ${
                    isOpen ? "inline" : "hidden"
                }`}
            >
                {isLoading ? (
                    <p className="text-center">Loading...</p>
                ) : items.length > 0 ? (
                    <div className="flex-col flex">
                        {items.map((item) => (
                            <ItemRow
                                key={item.id}
                                item={item}
                                onclick={() =>
                                    navigate(
                                        `/drive${
                                            item.parentid
                                                ? `/${item.parentid}`
                                                : ""
                                        }`
                                    )
                                }
                                isSelected={false}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="font-semibold text-slate-400 text-center">
                        No items found
                    </p>
                )}
            </div>
        </section>
    );
};

export default SearchInput;
