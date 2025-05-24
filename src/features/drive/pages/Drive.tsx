import {
    useDriveItemsContext,
    useModalContext,
    useParentContext
} from "@/shared/context/useContext.tsx";
import useTitle from "@/shared/hooks/useTitle.tsx";
import {
    Item
} from "@/shared/types/types.ts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ActionBar from "../components/ActionsBarWrapper/ActionBar.tsx";
import Breadcrumb from "../components/BreadcrumbWrapper/Breadcrumb.tsx";
import ButtonUpload from "../components/ButtonWrapper/ButtonUpload.tsx";
import DragAndDropModal from "../components/DragAndDropWrapper/DragAndDropModal.tsx";
import ItemsView from "../components/ItemViewWrapper/ItemsView.tsx";
import { useAllFromFolder, useItemById } from "../hooks/getItemsHooks.tsx";

function Drive() {
    let { parentid } = useParams();
    const { closeModal, isOpen, openModal } = useModalContext();
    const { items, updateItems } = useDriveItemsContext();
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const { changeParent, changeParentToRoot } = useParentContext();
    const {
        request: allFromFolder,
        data,
        isLoading,
    } = useAllFromFolder(parentid === "drive" ? "" : parentid!);
    const { request: parentRequest, data: parentData } = useItemById(
        parentid === "drive" ? "" : parentid!
    );

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

        allFromFolder();
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
