import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { search } from "../requests/fileRequests.ts";
import { useSessionContext } from "@/context/useContext.tsx";
import { FaFile } from "react-icons/fa";
import { File } from "@/types.ts";
import { Link } from "react-router-dom";
import { FaFolderClosed } from "react-icons/fa6";

const SearchInput = () => {
    const { session } = useSessionContext();

    const [queryString, setQueryString] = useState<string>("");

    const query = useRef("");
    let timer = useRef(0);

    const typeFilter = ["all", "FILE", "FOLDER"];
    const [typeFilterIndex, setTypeOrderIndex] = useState<number>(0);

    const searchInput = useRef<HTMLDivElement>(null);
    const [isSearchResultsOpen, setIsSearchResultsOpen] = useState(false);

    function open() {
        setIsSearchResultsOpen(true);
    }

    function close() {
        setIsSearchResultsOpen(false);
    }

    const {
        data: files,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ["search", queryString],
        queryFn: () =>
            search(
                session!.userid,
                query.current,
                typeFilter[typeFilterIndex] === "all"
                    ? null
                    : typeFilter[typeFilterIndex]
            ),
        enabled: false,
    });

    function changeType() {
        if (typeFilterIndex == typeFilter.length - 1) setTypeOrderIndex(0);
        else setTypeOrderIndex((prev) => prev + 1);
    }

    useEffect(() => {
        function action(e: MouseEvent) {
            if (searchInput.current!.contains(e.target as Element)) open();
            else close();
        }

        document.addEventListener("click", action);
        return () => document.removeEventListener("click", action);
    }, []);

    function sendQuery() {
        clearTimeout(timer.current);

        if (query.current.length === 0) return;

        timer.current = Number(
            setTimeout(() => {
                refetch();
            }, 500)
        );
    }

    return (
        <section
            className={`border px-2 py-1 rounded-md items-center relative w-1/2 hidden md:flex gap-x-4 min-w-[350px] border-slate-300`}
            ref={searchInput}
        >
            <input
                className={`outline-none w-full`}
                onChange={(e) => {
                    query.current = e.target.value;
                    setQueryString(e.target.value);
                    sendQuery();
                }}
                value={queryString}
                placeholder="Search"
                onKeyDown={(e) => {
                    if (e.key === "Escape") {
                        e.preventDefault();
                        e.currentTarget.blur();
                    } else if (e.key === "Enter") {
                        e.preventDefault();
                        e.stopPropagation();
                        sendQuery();
                    }
                }}
            />
            <button
                className="w-20 px-2 border rounded-md border-slate-300"
                onClick={changeType}
            >
                {typeFilter[typeFilterIndex].toLowerCase()}
            </button>
            {isSearchResultsOpen && (
                <div
                    className={`top-full left-0 border rounded-b-md bg-white absolute z-40 p-2 w-full`}
                >
                    {isFetching ? (
                        <p className="font-semibold text-slate-400 text-center">
                            Loading...
                        </p>
                    ) : files !== undefined && files.length > 0 ? (
                        <div className="flex-col flex gap-y-2">
                            {files.map((file) => (
                                <FileRowView file={file} />
                            ))}
                        </div>
                    ) : (
                        <p className="font-semibold text-slate-400 text-center">
                            No items found
                        </p>
                    )}
                </div>
            )}
        </section>
    );
};

type FileRowViewProps = { file: File };
function FileRowView({ file }: FileRowViewProps) {
    if (!file.is_dir)
        return (
            <div className={`flex items-center gap-x-2`}>
                <FaFile className={`min-h-4 min-w-4 text-slate-500`} />
                <span
                    className={`whitespace-nowrap text-ellipsis overflow-hidden`}
                >
                    {`${file.filename}`}
                </span>
                <span>
                    {`${file.extension} - ${file.size} ${file.size_prefix}`}
                </span>
            </div>
        );

    return (
        <Link to={`/drive/${file.id}`} className={`flex items-center gap-x-2`}>
            <FaFolderClosed className={`min-h-4 min-w-4 text-slate-500`} />
            <span
                className={`whitespace-nowrap text-ellipsis overflow-hidden max-w-60`}
            >
                {file.filename}
            </span>
        </Link>
    );
}

export default SearchInput;
