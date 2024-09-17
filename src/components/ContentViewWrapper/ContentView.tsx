import { useState } from "react";
import { FileNode } from "../../control/TreeWrapper/FileNode.ts";
import { FolderNode } from "../../control/TreeWrapper/FolderNode.ts";
import { ITEMS_PER_PAGE } from "../../utils/enviromentVariables.ts";
import PaginationControls from "../PaginationWrapper/PaginationControls.tsx";
import ContentRow from "./ContentRow.tsx";

const ContentView = ({
    content,
    isLoading,
    id,
}: {
    id: string | undefined | null;
    content: Array<FileNode | FolderNode>;
    isLoading: boolean;
}) => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    return (
        <div className="mt-2 mx-auto space-y-4">
            {content.length > 0 ? (
                <section
                // className="grid grid-flow-row gap-y-2 "
                >
                    <PaginationControls
                        id={id}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                        content={content}
                    />
                    <section
                    // className="grid grid-flow-col grid-cols-contentView "
                    >
                        <span className="font-semibold text-slate-500">
                            Name
                        </span>
                    </section>
                    <section className="space-y-2">
                        {content
                            .slice(
                                currentPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE,
                                currentPage * ITEMS_PER_PAGE
                            )
                            .map((f) => (
                                <ContentRow
                                    key={f.getId()}
                                    item={f}
                                />
                            ))}
                    </section>
                </section>
            ) : (
                <section>
                    <span className="mx-auto flex justify-center text-black/30 font-semibold">
                        {!isLoading
                            ? "No content saved. What about start now?"
                            : "Loading..."}
                    </span>
                </section>
            )}
        </div>
    );
};

export default ContentView;
