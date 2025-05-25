import {
    useModalContext,
    useParentContext,
} from "@/shared/context/useContext.tsx";
import useTitle from "@/shared/hooks/useTitle.tsx";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ActionBar from "../components/ActionsBarWrapper/ActionBar.tsx";
import Breadcrumb from "../components/BreadcrumbWrapper/Breadcrumb.tsx";
import ButtonUpload from "../components/ButtonWrapper/ButtonUpload.tsx";
import DragAndDropModal from "../components/DragAndDropWrapper/DragAndDropModal.tsx";
import ItemsView from "../components/ItemViewWrapper/ItemsView.tsx";
import { useItemById } from "../hooks/getItemsHooks.tsx";

function Drive() {
    let { parentid } = useParams();
    const { closeModal, isOpen, openModal } = useModalContext();
    const { changeParent, changeParentToRoot } = useParentContext();

    const { request: parentRequest, data: parentData } = useItemById(
        parentid === "drive" ? "" : parentid!
    );

    useTitle("Tiny Drive");

    useEffect(() => {
        if (parentid !== "drive") parentRequest();
        else changeParentToRoot();
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
            <ActionBar />
            <ItemsView />
        </main>
    );
}

export default Drive;
