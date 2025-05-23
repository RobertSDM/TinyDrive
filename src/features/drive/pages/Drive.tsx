import {
    useAuthContext,
    useDriveItemsContext,
    useModalContext,
    useParentContext
} from "@/shared/context/useContext.tsx";
import useRequest from "@/shared/hooks/useRequest.tsx";
import useTitle from "@/shared/hooks/useTitle.tsx";
import {
    Item,
    ListItemResponse,
    SingleItemResponse
} from "@/shared/types/types.ts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemAllFromFolder, ItemById } from "../api/requestConfig.ts";
import ActionBar from "../components/ActionsBarWrapper/ActionBar.tsx";
import Breadcrumb from "../components/BreadcrumbWrapper/Breadcrumb.tsx";
import ButtonUpload from "../components/ButtonWrapper/ButtonUpload.tsx";
import DragAndDropModal from "../components/DragAndDropWrapper/DragAndDropModal.tsx";
import ItemsView from "../components/ItemViewWrapper/ItemsView.tsx";

function Drive() {
    let { parentid } = useParams();
    const { closeModal, isOpen, openModal } = useModalContext();
    const { items, updateItems } = useDriveItemsContext();
    const { account, session } = useAuthContext();
    const { changeParent, changeParentToRoot } = useParentContext();
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
        else changeParentToRoot();

        request();
    }, [parentid]);

    useEffect(() => {
        if (!parentData || !parentData.success) return;

        changeParent(parentData.data);
    }, [parentData]);

    return (
        <main
            className="max-w-7xl mx-auto mb-20 px-10 w-full flex-1"
            onDragEnter={(e) => {
                if (e.dataTransfer.types.includes("Files")) {
                    openModal(
                        <DragAndDropModal close={closeModal} isOpen={isOpen} />
                    );
                }
            }}
        >
            <Breadcrumb />
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
        </main>
    );
}

export default Drive;
