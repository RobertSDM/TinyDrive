// import useSearchHook from "../control/searchHook.ts";

import { useEffect, useRef, useState } from "react";
import useContentSearchByName from "../../fetcher/content/useContentSeachByName.ts";
import ButtonType from "../Buttons/ButtonType.tsx";
import SearchResultItem from "./SearchResultItem.tsx";
import { DELAY_TO_SEARCH_CONTENT } from "../../utils/index.ts";

const SearchInput = () => {
    const timer = useRef<NodeJS.Timeout>();
    const [searchValue, setSearchValue] = useState<string>("");
    const { data, fetch_, isLoading, setIsLoading } = useContentSearchByName();
    const limitToStartCounting = 1;
    const [contentType, setContentType] = useState<"file" | "folder" | null>(
        null
    );
    const [isTypeButtonOpen, setIsTypeButtonOpen] = useState<boolean>(false);

    function clearSearchInput() {
        setSearchValue("");
    }

    function restartCounter() {
        clearTimeout(timer.current);
    }

    function startCounting(value: string) {
        timer.current = setTimeout(() => {
            fetch_(value, contentType);
        }, DELAY_TO_SEARCH_CONTENT);
    }

    useEffect(() => {
        if (searchValue.length <= limitToStartCounting ) {
            return;
        }
        fetch_(searchValue, contentType);
    }, [contentType]);

    return (
        <div
            className={`border border-slate-300 px-2 py-1 rounded-md items-center relative w-1/2 hidden md:flex gap-x-4 min-w-[450px] ${
                searchValue.length <= limitToStartCounting
                    ? "border"
                    : "border border-b-transparent rounded-b-none"
            }`}
            onKeyDown={(e) => {
                if (e.key === "Escape") {
                    clearSearchInput();
                }
            }}
        >
            <input
                className={`outline-none w-full bg-transparent`}
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
                className={`top-full -left-[1px]  border-slate-300 border rounded-b-md bg-white absolute  ${
                    searchValue.length > limitToStartCounting
                        ? "flex"
                        : "hidden"
                } flex-col w-[calc(100%_+_2px)]`}
                onBlur={() => clearSearchInput()}
            >
                {data &&
                !isLoading &&
                [...data["files"], ...data["folders"]].length > 0 ? (
                    [...data["files"], ...data["folders"]]?.map((i) => (
                        <SearchResultItem key={i.id} item={i} />
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
