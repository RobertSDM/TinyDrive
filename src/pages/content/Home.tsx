import { useEffect } from "react";
import { Link } from "react-router-dom";
import ButtonUpload from "../../components/Buttons/ButtonUpload.tsx";
import ContentView from "../../components/ContentViewWrapper/ContentView.tsx";
import useRootContentFetch from "../../fetcher/content/useRootContentFetch.ts";
import { useTreeContext } from "../../hooks/useContext.tsx";
import useTitle from "../../hooks/useTitle.tsx";
import { apiResponseToTreeNodes } from "../../utils/dataConvertion.ts";
import { orderByName } from "../../utils/filterFunctions.ts";

function Home() {
    const { tray, tree, updateCurrentNode, setContent, content } =
        useTreeContext();
    const { data, isLoading, fetch_ } = useRootContentFetch();

    const setTitle = useTitle();
    setTitle("Tiny Drive");

    useEffect(() => {
        const updatedNode = updateCurrentNode(tree.getRoot());
        const nodeNodes = [
            ...updatedNode.getFiles(),
            ...updatedNode.getFolders(),
        ];
        if (nodeNodes.length > 0) {
            setContent(
                orderByName([
                    ...updatedNode.getFiles(),
                    ...updatedNode.getFolders(),
                ])
            );
            return;
        }
        if (!data) {
            fetch_();
        }
        if (isLoading) return;
        // Get the root files and folders
        apiResponseToTreeNodes(data!, tree, tree.getRoot());
        setContent(
            orderByName([
                ...updatedNode.getFiles(),
                ...updatedNode.getFolders(),
            ])
        );
        // tree.viewTree();
    }, [data]);

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
                <ButtonUpload />
            </section>
            <ContentView id={null} content={content} isLoading={isLoading} />
        </main>
    );
}

export default Home;
