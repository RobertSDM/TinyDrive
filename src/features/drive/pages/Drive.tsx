import { DefaultClient } from "@/shared/api/clients.ts";
import { useUserContext } from "@/shared/context/useContext.tsx";
import useFetcher from "@/shared/hooks/useRequest.tsx";
import useTitle from "@/shared/hooks/useTitle.tsx";
import { Item, ListItemResponse } from "@/shared/types/index.ts";
import { useEffect, useState } from "react";
import { ItemRootAllConfig } from "../api/config.ts";
import ButtonUpload from "../components/ButtonWrapper/ButtonUpload.tsx";
import ItemsView from "../components/ContentViewWrapper/ItemsView.tsx";

function Drive() {
    const [items, setItems] = useState<Item[]>([]);
    const title = useTitle();
    const { user } = useUserContext();
    const { isLoading, data } = useFetcher<ListItemResponse>(
        {
            ...ItemRootAllConfig,
            path: ItemRootAllConfig.path + user.id,
        },
        DefaultClient,
        true
    );

    useEffect(() => {
        if (!data || !data.success) return;

        setItems(data.data!);
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
