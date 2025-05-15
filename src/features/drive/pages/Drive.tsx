import ModalProvider from "@/shared/context/ModalContext.tsx";
import {
    useDriveItemsContext,
    useParentContext,
    useUserContext,
} from "@/shared/context/useContext.tsx";
import useFetcher from "@/shared/hooks/useRequest.tsx";
import useTitle from "@/shared/hooks/useTitle.tsx";
import {
    Item,
    ListItemResponse,
    SingleItemResponse,
} from "@/shared/types/index.ts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemAllFromFolder, ItemById } from "../api/config.ts";
import ActionBar from "../components/ActionsBarWrapper/ActionBar.tsx";
import ButtonUpload from "../components/ButtonWrapper/ButtonUpload.tsx";
import ItemsView from "../components/ContentViewWrapper/ItemsView.tsx";
import { DefaultClient } from "@/shared/api/clients.ts";

function Drive() {
    let { parentid } = useParams();
    const { items, updateItems } = useDriveItemsContext();
    const title = useTitle();
    const { user } = useUserContext();
    const { changeParent } = useParentContext();
    const { isLoading, data, request } = useFetcher<ListItemResponse>(
        ItemAllFromFolder(user.id, parentid === "drive" ? "" : parentid!),
        DefaultClient
    );
    const { request: parentRequest, data: parentData } =
        useFetcher<SingleItemResponse>(
            ItemById(user.id, parentid === "drive" ? "" : parentid!)
        );
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    function changeSelectedItem(item: Item) {
        if (item.id === selectedItem?.id) {
            setSelectedItem(null);
            return;
        }
        setSelectedItem(item);
    }

    function changeSelectedItemToNull() {
        setSelectedItem(null);
    }

    useEffect(() => {
        if (!data || !data.success) return;

        updateItems(data.data!);
    }, [data]);

    useEffect(() => {
        title("Tiny Drive");
    }, []);

    useEffect(() => {
        changeSelectedItemToNull();
        parentRequest();
        request();
    }, [parentid]);

    useEffect(() => {
        if (!parentData || !parentData.success) return;

        changeParent(parentData.data);
    }, [parentData]);

    return (
        <main className="mt-10  px-10 mx-auto mb-20">
            {/* <nav className="text-xl text-black/50">
                <Tray />
            </nav> */}
            <ModalProvider>
                <ButtonUpload />
                <ActionBar
                    item={selectedItem}
                    closeActionBar={changeSelectedItemToNull}
                />
                <ItemsView
                    {...{
                        items,
                        isLoading,
                        changeSelectedItem,
                        selectedItem,
                    }}
                />
            </ModalProvider>
        </main>
    );
}

export default Drive;
