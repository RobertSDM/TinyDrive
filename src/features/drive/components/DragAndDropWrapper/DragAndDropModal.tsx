import {
    useAuthContext,
    useDriveItemsContext,
    useParentContext,
} from "@/shared/context/useContext.tsx";
import useRequest from "@/shared/hooks/useRequest.tsx";
import { SingleItemResponse } from "@/shared/types/types.ts";
import { ItemSaveConfig } from "../../api/requestConfig.ts";

type DragOverModalProps = {
    close: () => void;
    isOpen: boolean;
};
export default function DragAndDropModal({
    close,
    isOpen,
}: DragOverModalProps) {
    const { parent } = useParentContext();
    const { session, account } = useAuthContext();
    const { addItem } = useDriveItemsContext();
    const { request: fileRequest } = useRequest<SingleItemResponse>(
        ItemSaveConfig(session!.accessToken),
        (resp) => {
            const item = resp.data.data;
            if (item.parentid === parent.id) addItem(resp.data.data);

            return resp.data;
        }
    );

    return (
        <div
            className={`fixed flex bg-purple-400/50 w-full h-full top-0 left-0 items-center justify-center z-50`}
            onDragEnter={(e) => e.stopPropagation()}
            onDragLeave={(e) => {
                e.stopPropagation();
                close();
            }}
            onDragOver={(e) => {
                e.preventDefault();
            }}
            onDrop={async (e) => {
                e.preventDefault();
                close();
                const filelist = e.dataTransfer.files;
                for (let i = 0; i < filelist.length; i++) {
                    const form = new FormData();
                    form.append("file", filelist[i]);
                    form.append("parentid", parent.id || "");
                    form.append("ownerid", account!.id);
                    await fileRequest(form);
                }
            }}
            hidden={!isOpen}
        >
            <p className="font-semibold text-purple-900">
                Drop the file to save
            </p>
        </div>
    );
}
