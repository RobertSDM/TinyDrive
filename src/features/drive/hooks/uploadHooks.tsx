import useRequest from "@/shared/hooks/useRequest.tsx";
import { SingleItemResponse } from "@/shared/types/types.ts";
import { ItemSaveConfig, ItemSaveFolderConfig } from "../api/requestConfig.ts";
import {
    useAuthContext,
    useDriveItemsContext,
    useParentContext,
} from "@/shared/context/useContext.tsx";

async function uploadFileList(
    filelist: FileList,
    parentid: string,
    ownerid: string,
    request: (body: Object) => Promise<void>
) {
    for (let i = 0; i < filelist.length; i++) {
        const form = new FormData();
        form.append("file", filelist[i]);
        form.append("parentid", parentid);
        form.append("ownerid", ownerid);
        await request(form);
    }
}

export function useUploadFolder() {
    const { session } = useAuthContext();
    const { addItem } = useDriveItemsContext();

    const request = useRequest<SingleItemResponse>(
        ItemSaveFolderConfig(session!.accessToken),
        (resp) => {
            addItem(resp.data.data);

            return resp.data;
        }
    );

    return { ...request };
}

export function useUploadItem() {
    const { account, session } = useAuthContext();
    const { parent } = useParentContext();
    const { addItem } = useDriveItemsContext();

    const request = useRequest<SingleItemResponse>(
        ItemSaveConfig(session!.accessToken),
        (resp) => {
            const item = resp.data.data;
            if (item.parentid === parent.id) addItem(resp.data.data);

            return resp.data;
        }
    );

    function req(filelist: FileList) {
        uploadFileList(filelist, parent.id || "", account!.id, request.request);
    }

    return { ...request, request: req };
}
