import { useEffect, useRef, useState } from "react";
import useContentSearchByName from "../../fetcher/content/useContentSeachByName.ts";
import ButtonType from "../Buttons/ButtonType.tsx";
import SearchResultItem from "./SearchResultItem.tsx";
import { DELAY_TO_SEARCH_CONTENT } from "../../utils/enviromentVariables.ts";

const SearchInput = () => {
    const timer = useRef<NodeJS.Timeout>();
    const [searchValue, setSearchValue] = useState<string>("");
    const { data, fetch_, isLoading, setIsLoading } = useContentSearchByName();
    const limitToStartCounting = 1;
    const [contentType, setContentType] = useState<"file" | "folder" | null>(
        null
    );
    const [isTypeButtonOpen, setIsTypeButtonOpen] = useState<boolean>(false);
    const nodeId = useRef<string>(
        Math.floor(new Date().getTime() * Math.random()).toString()
    );
    const inputEl = useRef<HTMLInputElement>(null);
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

    function restartCounter() {
        clearTimeout(timer.current);
    }

    async function startCounting(value: string) {
        timer.current = setTimeout(() => {
            fetch_(value, contentType);
        }, DELAY_TO_SEARCH_CONTENT);
    }

    useEffect(() => {
        if (searchValue.length > limitToStartCounting) {
            window.addEventListener("click", (e) => {
                if (nodeId.current === (e.target as Node).parentElement!.id) {
                    return;
                }
                inputEl.current?.blur();
                setIsInputFocused(false);
            });
        }
        return () => {
            window.removeEventListener("click", (e) => {
                if (nodeId.current === (e.target as Node).parentElement!.id) {
                    return;
                }
                inputEl.current?.blur();
                setIsInputFocused(false);
            });
        };
    }, [searchValue]);

    return (
        <div
            id={nodeId.current}
            className={`border-slate-300 px-4 py-1 rounded-md items-center relative w-1/2 hidden md:flex gap-x-4 min-w-[350px] ${
                searchValue.length <= limitToStartCounting || !isInputFocused
                    ? "border"
                    : "border border-b-transparent rounded-b-none"
            }`}
            onKeyDown={(e) => {
                if (e.key === "Escape") {
                    inputEl.current?.blur();
                    setIsInputFocused(false);
                }
            }}
        >
            <input
                ref={inputEl}
                className={`outline-none w-full bg-transparent`}
                onFocus={() => {
                    setIsInputFocused(true);
                }}
                onChange={(e) => {
                    setSearchValue(e.target.value);
                    restartCounter();
                    if (e.target.value.length > limitToStartCounting) {
                        setIsLoading(true);
                        startCounting(e.target.value);
                    }
                }}
                value={searchValue}
                type="text"
                placeholder="Search"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        if (isLoading) return;
                        fetch_(searchValue, contentType);
                    }
                }}
            />
            <ButtonType
                isOpen={isTypeButtonOpen}
                setIsOpen={setIsTypeButtonOpen}
                type={contentType}
                setType={setContentType}
            />
            <div
                id={nodeId.current}
                className={`top-full -left-[1px]  border-slate-300 border rounded-b-md bg-white absolute  ${
                    isInputFocused && searchValue.length > limitToStartCounting
                        ? "flex"
                        : "hidden"
                } flex-col w-[calc(100%_+_2px)]`}
            >
                {data &&
                !isLoading &&
                [...data["files"], ...data["folders"]].length > 0 ? (
                    [...data["files"], ...data["folders"]]?.map((i) => (
                        <SearchResultItem key={i.id} item={i} nodeId={nodeId} />
                    ))
                ) : (
                    <span className="text-slate-400 font-semibold text-sm p-2 mx-auto">
                        {isLoading ? "searching..." : "No results found"}
                    </span>
                )}
            </div>
        </div>
    );
};

export default SearchInput;
