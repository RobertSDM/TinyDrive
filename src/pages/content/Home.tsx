import { useEffect, useMemo, useState } from "react";
import ButtonUpload from "../../components/Buttons/ButtonUpload.tsx";
import ContentView from "../../components/ContentViewWrapper/ContentView.tsx";
import Tray from "../../components/Tray.tsx";
import useRootContentFetch from "../../fetcher/content/useRootContentFetch.ts";
import {
    usePaginationContext,
    useTreeContext,
} from "../../context/useContext.tsx";
import useQueryParams from "../../hooks/useQueryParams.tsx";
import useTitle from "../../hooks/useTitle.tsx";
import { apiResponseToTreeNodes } from "../../utils/dataConvertion.ts";
import { orderByName } from "../../utils/filterFunctions.ts";
import { useNavigate } from "react-router-dom";

function Home() {
    const { tree, updateCurrentNode, setContent, content } = useTreeContext();
    const setTitle = useTitle();
    const navigate = useNavigate();

    const [page] = useQueryParams("p", 1, Number);

    const { isLoading, fetch_ } = useRootContentFetch();

    const [totalPages, setTotalPages] = useState<number>(0);
    const { pagesCache, setPagesCache } = usePaginationContext();

    useMemo(() => {
        setTitle("Tiny Drive");
    }, []);

    useEffect(() => {
        if (page < 1) {
            navigate(`?p=${1}`);
        }
        const updatedNode = updateCurrentNode(tree.getRoot());

        const childNodes = updatedNode.getChildrenValues();

        let pageCacheKey = updatedNode.getId();

        if (
            pagesCache[pageCacheKey] &&
            pagesCache[pageCacheKey].loadedPages.includes(page)
        ) {
            setContent(orderByName(childNodes));
            setTotalPages(pagesCache[pageCacheKey].totalPages);
            return;
        }

        fetch_(page).then((res) => {
            if (!res) return;

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

            // Get the root files and folders
            apiResponseToTreeNodes(res.content, tree, tree.getRoot());
            setTotalPages(res.totalPages);

            setContent(orderByName(updatedNode.getChildrenValues()));
        });
    }, [page]);

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
                setTotalPages={setTotalPages}
                id={null}
                page={page}
                content={content}
                isLoading={isLoading}
                totalPages={totalPages}
            />
        </main>
    );
}

export default Home;
