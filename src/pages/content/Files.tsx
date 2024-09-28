import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ButtonUpload from "../../components/Buttons/ButtonUpload.tsx";
import ContentView from "../../components/ContentViewWrapper/ContentView.tsx";
import useContentByFolderFetch from "../../fetcher/content/useContentByFolderFetch.ts";
import {
    usePaginationContext,
    useTreeContext,
} from "../../hooks/useContext.tsx";
import useQueryParams from "../../hooks/useQueryParams.tsx";
import useTitle from "../../hooks/useTitle.tsx";
import {
    addThreePoints,
    apiResponseToTreeNodes,
} from "../../utils/dataConvertion.ts";
import { orderByName } from "../../utils/filterFunctions.ts";

const Folder = () => {
    const { tray, tree, updateCurrentNode, currentNode, content, setContent } =
        useTreeContext();
    const setTitle = useTitle();
    const { pagesCache, setPagesCache } = usePaginationContext();

    const { id } = useParams();
    const [page] = useQueryParams("p", 1, Number);
    const { isLoading, fetch_ } = useContentByFolderFetch();

    // save the current page + id in a cache having the totalPages as value
    const [totalPages, setTotalPages] = useState<number>(0);

    useMemo(() => {
        setTitle(
            currentNode.getName() !== "/"
                ? `Tiny Drive | ${addThreePoints(currentNode.getName(), 16)}`
                : "Tiny Drive"
        );
    }, []);

    useEffect(() => {
        if (!id) {
            return;
        }

        // If the folders is on the Tree Structure
        let updatedNode = tree.getFolderNodes()[id] || null;
        let childNodes;

        if (updatedNode) {
            // grouping all files and folders from tree
            childNodes = [
                ...updatedNode.getFolders(),
                ...updatedNode.getFiles(),
            ];
            updateCurrentNode(updatedNode);
        }

        const pageCacheKey = id;

        if (
            childNodes &&
            pagesCache[pageCacheKey] &&
            pagesCache[pageCacheKey].loadedPages.includes(page)
        ) {
            setContent(orderByName(childNodes));
            setTotalPages(pagesCache[pageCacheKey].totalPages);
            return;
        }

        fetch_(id, page).then((res) => {
            if (!res) return;

            const { requestedFolder: reqFolder } = res;

            // If folder is not on the Tree Structure
            if (!updatedNode) {
                const folderNode = tree.createFolderNode(
                    reqFolder.name,
                    // not passing the parentNode to connect
                    null,
                    reqFolder.folderC_id!,
                    reqFolder.id,
                    reqFolder.tray,
                    // making the folder an island
                    true
                );

                updatedNode = updateCurrentNode(folderNode);
            }

            setPagesCache((prev) => {
                if (prev[pageCacheKey]) {
                    prev[pageCacheKey].loadedPages.push(page);
                } else {
                    prev[pageCacheKey] = {
                        loadedPages: [page],
                        totalPages: res.totalPages,
                    };
                }

                return {
                    ...prev,
                    [pageCacheKey]: {
                        loadedPages: prev[pageCacheKey].loadedPages,
                        totalPages: res.totalPages,
                    },
                };
            });

            // Converts the content from the api into nodes to the Tree Structure
            apiResponseToTreeNodes(res.content, tree, updatedNode!);
            setTotalPages(res.totalPages);

            childNodes = [
                ...updatedNode.getFiles(),
                ...updatedNode.getFolders(),
            ];

            setContent(orderByName(childNodes));
        });
    }, [id, page]);

    return (
        <main className="mt-10 w-full md:max-w-[90%] px-10 mx-auto mb-20">
            <nav className="text-xl text-black/50">
                {tray.map((item, index) => {
                    return (
                        <Link
                            className={`${
                                item.link != "" &&
                                "hover:bg-purple-200 p-1 hover:rounded-md"
                            }`}
                            key={index}
                            to={item.link}
                        >
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <section className="mt-5 mx-auto border-t border-black/10 py-4 space-y-10 mb-10">
                <ButtonUpload page={page} setTotalPages={setTotalPages} />
            </section>
            <ContentView
                id={id}
                page={page}
                setTotalPages={setTotalPages}
                content={content}
                isLoading={isLoading}
                totalPages={totalPages}
            />
        </main>
    );
};

export default Folder;
