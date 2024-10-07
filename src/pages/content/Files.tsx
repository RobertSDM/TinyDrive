import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonUpload from "../../components/Buttons/ButtonUpload.tsx";
import ContentView from "../../components/ContentViewWrapper/ContentView.tsx";
import Tray from "../../components/Tray.tsx";
import useContentByFolderFetch from "../../fetcher/content/useContentByFolderFetch.ts";
import {
    usePaginationContext,
    useTreeContext,
} from "../../context/useContext.tsx";
import useQueryParams from "../../hooks/useQueryParams.tsx";
import useTitle from "../../hooks/useTitle.tsx";
import { FolderNode } from "../../model/three/FolderNode.ts";
import {
    addThreePoints,
    apiResponseToTreeNodes,
} from "../../utils/dataConvertion.ts";
import { orderByName } from "../../utils/filterFunctions.ts";

const Folder = () => {
    const { tree, updateCurrentNode, currentNode, content, setContent } =
        useTreeContext();
    const setTitle = useTitle();
    const navigate = useNavigate();
    const { pagesCache, setPagesCache } = usePaginationContext();

    const { id } = useParams();
    const [page] = useQueryParams("p", 1, Number);
    const { isLoading, fetch_ } = useContentByFolderFetch();

    // save the current page + id in a cache having the totalPages as value
    const [totalPages, setTotalPages] = useState<number>(0);

    useMemo(() => {
        setTitle(
            currentNode.getName() !== "/"
                ? `${addThreePoints(currentNode.getName(), 16)} | Tiny Drive`
                : "Tiny Drive"
        );
    }, [currentNode.getName()]);

    useEffect(() => {
        if (!id) {
            return;
        }

        // If the folders is on the Tree Structure
        let updatedNode = tree.getNodes()[id] as FolderNode;
        let childNodes;

        if (updatedNode) {
            // grouping all files and folders from tree
            childNodes = updatedNode.getChildrenValues();
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
                const folderNode = new FolderNode(
                    reqFolder.id,
                    reqFolder.name,
                    reqFolder.folderC_id!,
                    reqFolder.tray,
                    null
                );

                tree.addNode(
                    folderNode,
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

            childNodes = updatedNode.getChildrenValues();

            setContent(orderByName(childNodes));
            updateCurrentNode(updatedNode);
        });
    }, [id, page]);

    useEffect(() => {
        if (page < 1) {
            navigate(`?p=${1}`);
        }
        if (!pagesCache[id!]) {
            setContent([]);
        }
    }, []);

    return (
        <main className="mt-10 w-full md:max-w-[90%] px-10 mx-auto mb-20">
            <nav className="text-xl text-black/50">
                <Tray />
            </nav>

            <section className="mt-5 mx-auto border-t border-black/10 py-4 space-y-10 mb-10">
                <ButtonUpload
                    totalPages={totalPages}
                    page={page}
                    setTotalPages={setTotalPages}
                />
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
