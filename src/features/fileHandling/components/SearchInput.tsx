import { useEffect, useRef, useState } from "react";
import { Item } from "@/types.ts";
import { ItemType } from "@/types.ts";
import ItemRow from "./ItemRow.tsx";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../hooks/fileHandlingHooks.tsx";

const SearchInput = () => {
    const [query, setQuery] = useState<string>("");
    const types = ["all", ItemType.FILE, ItemType.FOLDER];
    const [type, setType] = useState<number>(0);
    const [items, setItems] = useState<Item[]>([]);
    const $search = useRef<HTMLElement | null>(null);
    const navigate = useNavigate();
    const {
        data,
        isLoading,
        request: search,
    } = useSearch(query, types[type] === "all" ? null : types[type]);
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

    useEffect(() => {
        function action(e: KeyboardEvent) {
            if (e.key == "Escape") {
                e.preventDefault();
                e.stopPropagation();
                close();
            }
        }

        document.addEventListener("keydown", action);

        return () => document.removeEventListener("keydown", action);
    }, []);

    useEffect(() => {
        function action(e: MouseEvent) {
            if (
                $search.current &&
                $search.current.contains(e.target as Element)
            ) {
                open();
            } else close();
        }

        document.addEventListener("click", action);
        return () => document.removeEventListener("click", action);
    });

    return (
        <section
            className={`border px-2 py-1 rounded-md items-center relative w-1/2 hidden md:flex gap-x-4 min-w-[350px] border-slate-300`}
            ref={$search}
        >
            <input
                className={`outline-none w-full`}
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                placeholder="Search"
                onKeyDown={(e) => {
                    if (e.key === "Escape") {
                        e.preventDefault();
                        e.currentTarget.blur();
                    } else if (e.key === "Enter") {
                        e.preventDefault();
                        e.stopPropagation();
                        search();
                    }
                }}
            />
            <button
                className="w-20 px-2 border rounded-md border-slate-300"
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
                    <div className="flex-col flex gap-y-2">
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
