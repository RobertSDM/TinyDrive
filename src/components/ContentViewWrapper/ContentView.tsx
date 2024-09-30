import { FileNode } from "../../model/three/FileNode.ts";
import { FolderNode } from "../../model/three/FolderNode.ts";
import { ITEMS_PER_PAGE } from "../../utils/enviromentVariables.ts";
import PaginationControls from "../PaginationWrapper/PaginationControls.tsx";
import ContentRow from "./ContentRow.tsx";

const ContentView = ({
    content,
    isLoading,
    id,
    totalPages,
    page,
    setTotalPages,
}: {
    id: string | undefined | null;
    content: Array<FileNode | FolderNode>;
    isLoading: boolean;
    totalPages: number;
    page: number;
    setTotalPages: React.Dispatch<React.SetStateAction<number>>;
}) => {
    return (
        <div className="mt-2 mx-auto space-y-4">
            {content.length > 0 ? (
                <section
                // className="grid grid-flow-row gap-y-2 "
                >
                    <PaginationControls
                        totalPages={totalPages}
                        id={id}
                        page={page}
                    />
                    <section
                    // className="grid grid-flow-col grid-cols-contentView "
                    >
                        <span className="font-semibold text-slate-500">
                            Name
                        </span>
                    </section>
                    <section className="space-y-2">
                        {content.length <= ITEMS_PER_PAGE
                            ? content.map((f) => (
                                  <ContentRow
                                      page={page}
                                      setTotalPages={setTotalPages}
                                      key={f.getId()}
                                      item={f}
                                      totalPages={totalPages}
                                  />
                              ))
                            : content
                                  .slice(
                                      page * ITEMS_PER_PAGE - ITEMS_PER_PAGE,
                                      page * ITEMS_PER_PAGE
                                  )
                                  .map((f) => (
                                      <ContentRow
                                          page={page}
                                          setTotalPages={setTotalPages}
                                          key={f.getId()}
                                          item={f}
                                          totalPages={totalPages}
                                      />
                                  ))}
                    </section>
                </section>
            ) : (
                <section>
                    <span className="mx-auto flex justify-center text-black/30 font-semibold">
                        {isLoading
                            ? "Loading..."
                            : page > 1
                            ? "No content found on the page"
                            : "No content saved. What about start now?"}
                    </span>
                </section>
            )}
        </div>
    );
};

export default ContentView;
