import useTitle from "@/shared/hooks/useTitle.tsx";
import { Item } from "@/shared/types/index.ts";
import { useEffect, useState } from "react";
import ButtonUpload from "../components/ButtonWrapper/ButtonUpload.tsx";
import ItemsView from "../components/ContentViewWrapper/ContentView.tsx";
import useMakeRequest from "@/shared/hooks/useMakeRequest.tsx";
import { ItemConfig } from "../api/config.ts";
import { defaultClient as DefaultClient } from "@/shared/api/clients.ts";
import { useUserContext } from "@/shared/context/useContext.tsx";

function Drive() {
    // const { tree, updateCurrentNode, currentNode } = useTreeContext();
    const [items, setItems] = useState<Item[]>([]);
    const title = useTitle();
    const { user } = useUserContext();
    const { isLoading, data } = useMakeRequest<Item[]>(
        {
            method: ItemConfig.method,
            path: ItemConfig.path + user.id,
        },
        DefaultClient,
        true
    );

    useEffect(() => {
        if (!data) return;

        setItems(data);
    }, [data]);

    useEffect(() => {
        title("Tiny Drive");
    }, []);

    return (
        <main className="mt-10  px-10 mx-auto mb-20">
            {/* <nav className="text-xl text-black/50">
                <Tray />
            </nav> */}
            <ButtonUpload />
            <ItemsView {...{ items, isLoading }} />
        </main>
    );
}

export default Drive;
