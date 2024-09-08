import {  useEffect, useState } from "react";
import { FileNode } from "../../control/TreeWrapper/FileNode.ts";
import { FolderNode } from "../../control/TreeWrapper/FolderNode.ts";
import { ITEMS_PER_PAGE } from "../../utils/enviromentVariables.ts";
import { usePaginationContext } from "../../hooks/useContext.tsx";

const PaginationControls = ({
    content,
    currentPage,
    setCurrentPage,
    id,
}: {
    id: string | null | undefined;
    content: Array<FileNode | FolderNode>;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const [totalPages, setTotalPages] = useState<number>();
    const { getSavedPage, savePage } = usePaginationContext();

    useEffect(() => {
        const newTotalPages = Math.ceil(content.length / ITEMS_PER_PAGE);
        setTotalPages(newTotalPages);
        setCurrentPage(getSavedPage(id ? id : "root") || 1);

        if (currentPage > newTotalPages) {
            setCurrentPage(newTotalPages);
            savePage(id ? id : "root", newTotalPages);
        }
    }, [content]);

    return (
        <section className="flex gap-x-2 items-center justify-end">
            <button
                onClick={() => {
                    if (currentPage === 1) {
                        return;
                    }

                    setCurrentPage((prev) => prev - 1);
                    savePage(id ? id : "root", currentPage - 1);
                }}
                className={`font-semibold text-lg lg:text-sm ${
                    currentPage === 1 ? "text-slate-300" : "text-black"
                }`}
            >
                &lt;
            </button>
            <span className="text-md lg:text-sm">
                {currentPage}/{totalPages}
            </span>
            <button
                onClick={() => {
                    if (currentPage === totalPages) {
                        return;
                    }

                    setCurrentPage((prev) => prev + 1);
                    savePage(id ? id : "root", currentPage + 1);
                }}
                className={`font-semibold text-lg lg:text-sm ${
                    currentPage === totalPages ? "text-slate-300" : "text-black"
                }`}
            >
                &gt;
            </button>
        </section>
    );
};

export default PaginationControls;
