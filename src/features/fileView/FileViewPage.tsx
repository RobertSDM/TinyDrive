import {
    authContext,
    modalContext,
    parentContext,
} from "@/context/useContext.tsx";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ActionBar from "./components/ActionBar.tsx";
import Breadcrumb from "./components/Breadcrumb.tsx";
import ButtonUpload from "./components/ButtonUpload.tsx";
import DragAndDropModal from "./components/DragAndDropModal.tsx";
import ItemsView from "./components/ItemsView.tsx";
import { useRequest } from "@/hooks/useRequest.tsx";
import { HTTPMethods, SingleItemResponse } from "@/types.ts";

export default function FileView() {
    let { parentid: paramsParentFolderId } = useParams();
    const parentid =
        paramsParentFolderId === "drive" ? "" : paramsParentFolderId!;

    const { account, session } = authContext;
    const { closeModal, isOpen, openModal } = modalContext;
    const { changeParent, changeParentToRoot } = parentContext;

    const { request: parentFolderRequest, data: parentData } =
        useRequest<SingleItemResponse>();

    useEffect(() => {
        if (paramsParentFolderId === "drive") {
            changeParentToRoot();
            return;
        }

        parentFolderRequest(
            `/item/${account!.id}${parentid === "" ? "" : "/" + parentid}`,
            HTTPMethods.GET,
            null,
            session!.accessToken ?? ""
        );
    }, [paramsParentFolderId]);

    useEffect(() => {
        if (parentData!.success) return;

        changeParent(parentData!.data);
        document.title = "Tiny Drive |" + parentData?.data.name || "Tiny Drive";
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
            <ActionBar {...{ parentFolderId: parentid }} />
            <ItemsView />
        </main>
    );
}
