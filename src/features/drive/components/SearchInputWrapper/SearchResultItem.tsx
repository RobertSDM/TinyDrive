import { useRef } from "react";
import { FaFile, FaFolderClosed } from "react-icons/fa6";
import { Link } from "react-router-dom";
import DownloadButton from "../ButtonWrapper/DownloadButton.tsx";
import { TSeachFile, TSearchFolder } from "@/shared/types/types.ts";
import { useDownloadContent } from "@/shared/hooks/useContent.tsx";

const isFile = (item: TSeachFile | TSearchFolder) => {
    return (item as TSeachFile)?.byteSize !== undefined;
};

const SearchResultItem = ({
    item,
    nodeId,
}: {
    item: TSeachFile | TSearchFolder;
    nodeId: React.MutableRefObject<string>;
}) => {
    const downloadState = useRef<boolean>(false);
    const downloadContent = useDownloadContent(
        item.id,
        item.name,
        downloadState,
        isFile(item)
    );

    return (
        <div className="flex justify-between px-4 gap-x-4">
            <Link
                id={nodeId.current}
                to={`/folder/${item.id}`}
                key={item.id}
                className="py-1 flex items-center overflow-hidden"
            >
                {isFile(item) ? (
                    <FaFile className="text-slate-700 mr-2 min-h-4 min-w-4" />
                ) : (
                    <FaFolderClosed className="text-slate-700 mr-2 min-h-4 min-w-4" />
                )}
                <span className="overflow-hidden whitespace-nowrap text-ellipsis text-nowrap ">
                    {item.name}
                </span>
                <span>
                    {isFile(item) ? "." + (item as TSeachFile).extension : ""}
                </span>
            </Link>
            <DownloadButton onclick={downloadContent} />
        </div>
    );
};

export default SearchResultItem;
