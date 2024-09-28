import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ButtonUpload from "../../components/Buttons/ButtonUpload.tsx";
import ContentView from "../../components/ContentViewWrapper/ContentView.tsx";
import useRootContentFetch from "../../fetcher/content/useRootContentFetch.ts";
import {
    usePaginationContext,
    useTreeContext,
} from "../../hooks/useContext.tsx";
import useTitle from "../../hooks/useTitle.tsx";
import { apiResponseToTreeNodes } from "../../utils/dataConvertion.ts";
import { orderByName } from "../../utils/filterFunctions.ts";
import useQueryParams from "../../hooks/useQueryParams.tsx";

function Home() {
    const { tray, tree, updateCurrentNode, setContent, content } =
        useTreeContext();
    const setTitle = useTitle();

    const [page] = useQueryParams("p", 1, Number);
    const { isLoading, fetch_ } = useRootContentFetch();

    const [totalPages, setTotalPages] = useState<number>(0);
    const { pagesCache, setPagesCache } = usePaginationContext();

    useMemo(() => {
        setTitle("Tiny Drive");
    }, []);

    useEffect(() => {
        const updatedNode = updateCurrentNode(tree.getRoot());

        const childNodes = [
            ...updatedNode.getFiles(),
            ...updatedNode.getFolders(),
        ];

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
                }else{
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

            setContent(
                orderByName([
                    ...updatedNode.getFiles(),
                    ...updatedNode.getFolders(),
                ])
            );
        });
    }, [page]);

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
