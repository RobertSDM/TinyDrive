import ModalProvider from "@/shared/context/ModalContext.tsx";
import {
    useAuthContext,
    useDriveItemsContext,
    useParentContext,
} from "@/shared/context/useContext.tsx";
import useTitle from "@/shared/hooks/useTitle.tsx";
import {
    Item,
    ListItemResponse,
    SingleItemResponse,
} from "@/shared/types/types.ts";
import { useEffect, useState } from "react";
import ButtonUpload from "../components/ButtonWrapper/ButtonUpload.tsx";
import ItemsView from "../components/ContentViewWrapper/ItemsView.tsx";
import { ItemAllFromFolder, ItemById } from "../api/requestConfig.ts";
import useRequest from "@/shared/hooks/useRequest.tsx";
import { useParams } from "react-router-dom";
import ActionBar from "../components/ActionsBarWrapper/ActionBar.tsx";

function Drive() {
    let { parentid } = useParams();
    const { items, updateItems } = useDriveItemsContext();
    const { account, session } = useAuthContext();
    const { changeParent } = useParentContext();
    const { isLoading, data, request } = useRequest<ListItemResponse>(
        ItemAllFromFolder(
            account!.id,
            parentid === "drive" ? "" : parentid!,
            session!.accessToken ?? ""
        )
    );
    const { request: parentRequest, data: parentData } =
        useRequest<SingleItemResponse>(
            ItemById(
                account!.id,
                parentid === "drive" ? "" : parentid!,
                session!.accessToken ?? ""
            )
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

    useTitle("Tiny Drive");
    useEffect(() => {
        if (!data || !data.success) return;

        updateItems(data.data!);
    }, [data]);

    useEffect(() => {
        changeSelectedItemToNull();
        if (parentid !== "drive") parentRequest();
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
