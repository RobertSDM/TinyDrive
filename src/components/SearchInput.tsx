// import useSearchHook from "../control/searchHook.ts";

import { useRef, useState } from "react";
import { TSeachFile } from "../types/types.js";
import { FaFolderClosed, FaFile } from "react-icons/fa6";
import { HiDownload } from "react-icons/hi";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../utils/index.ts";
import { FaLink } from "react-icons/fa6";
import useContentSearchByName from "../fetcher/content/useContentSeachByName.ts";
import ButtonType from "./ButtonType.tsx";
const SearchInput = () => {
    const searchElement = useRef<HTMLInputElement | null>(null);

    const [searchValue, setSearchValue] = useState<string>("");
    const { data, fetch_, isLoading } = useContentSearchByName();
    const limitToStartCounting = 2;
    const [contentType, setContentType] = useState<"file" | "folder" | null>(
        null
    );
    const timer = useRef<NodeJS.Timeout>();

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
        }, 300);
    }

    return (
        <div
            className={`border border-slate-300 px-2 py-1 rounded-md items-center relative w-1/2 hidden md:flex gap-x-4 min-w-[400px] ${
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
                className={`outline-none w-full  rounded-md`}
                ref={searchElement}
                onChange={(e) => {
                    setSearchValue(e.target.value);
                    restartCounter();
                    if (e.target.value.length > limitToStartCounting) {
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
                    [...data["files"], ...data["folders"]]?.map((i) => {
                        if ((i as TSeachFile)?.byteSize !== undefined) {
                            return (
                                <span
                                    key={i.id}
                                    className="hover:bg-purple-50 px-2 py-1 md:px-5 flex items-center justify-between"
                                >
                                    <section className="flex items-center justify-between gap-x-10">
                                        <span className="flex items-center gap-x-2">
                                            <FaFile className="text-slate-700" />
                                            {i.name +
                                                "." +
                                                (i as TSeachFile).extension}
                                        </span>
                                        <span className="md:hidden lg:inline">
                                            {(i as TSeachFile).byteSize +
                                                (i as TSeachFile).prefix}
                                        </span>
                                    </section>
                                    <Link
                                        to={`${BACKEND_URL}/file/download/${i.id}`}
                                        target="_blank"
                                        download
                                    >
                                        <HiDownload
                                            className={` bg-white border  border-purple-500 hover:bg-purple-500 hover:text-white rounded-full aspect-square min-h-8 min-w-8 p-[0.45rem]`}
                                        />
                                    </Link>
                                </span>
                            );
                        } else {
                            return (
                                <Link
                                    to={`/folder/${i.id}`}
                                    key={i.id}
                                    className="hover:bg-purple-50 px-2 md:px-5  py-1 select-none flex justify-between"
                                >
                                    <span className="flex items-center gap-x-2">
                                        <FaFolderClosed className="text-slate-700" />
                                        {i.name}
                                    </span>
                                    <FaLink className="text-slate-400 min-h-8 min-w-8 p-[0.45rem]" />
                                </Link>
                            );
                        }
                    })
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
