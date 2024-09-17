import { FaFile, FaFolderClosed, FaLink } from "react-icons/fa6";
import { Link } from "react-router-dom";
import DownloadButton from "../Buttons/DownloadButton.tsx";
import { TSeachFile, TSearchFolder } from "../../types/types.js";
import { addThreePoints } from "../../utils/dataConvertion.ts";
import { useEffect, useRef, useState } from "react";
import { useDownloadContent } from "../../hooks/useContent.tsx";

const isFile = (item: TSeachFile | TSearchFolder) => {
    return (item as TSeachFile)?.byteSize !== undefined;
};

const SearchResultItem = ({ item }: { item: TSeachFile | TSearchFolder }) => {
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const downloadState = useRef<boolean>(false);
    const downloadContent = useDownloadContent(
        item.id,
        item.name,
        downloadState,
        isFile(item)
    );

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    function formatName(name: string) {
        return windowWidth < 1280 ? addThreePoints(name, 40) : name;
    }

    return (
        <>
            {isFile(item) ? (
                <span className="hover:bg-purple-50 px-2 py-1 md:px-5 flex items-center justify-between">
                    <section className="flex items-center justify-between gap-x-10">
                        <span className="flex items-center gap-x-2">
                            <FaFile className="text-slate-700" />
                            {formatName(item.name)}.
                            {(item as TSeachFile).extension}
                        </span>
                    </section>
                    <DownloadButton onclick={downloadContent} />
                </span>
            ) : (
                <Link
                    to={`/folder/${item.id}`}
                    key={item.id}
                    className="hover:bg-purple-50 px-2 md:px-5  py-1 select-none flex justify-between"
                >
                    <span className="flex items-center gap-x-2">
                        <FaFolderClosed className="text-slate-700" />
                        {formatName(item.name)}
                    </span>
                    <FaLink className="text-slate-400 min-h-8 min-w-8 p-[0.45rem]" />
                </Link>
            )}
        </>
    );
};

export default SearchResultItem;
