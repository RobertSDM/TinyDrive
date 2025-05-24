import useRequest from "@/shared/hooks/useRequest.tsx";
import { SingleItemResponse } from "@/shared/types/types.ts";
import { ItemSaveConfig, ItemSaveFolderConfig } from "../api/requestConfig.ts";
import {
    useAuthContext,
    useDriveItemsContext,
    useNotify,
    useParentContext,
} from "@/shared/context/useContext.tsx";
import { AxiosError } from "axios";
import { NotifyLevel } from "@/shared/types/enums.ts";

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
    const notify = useNotify();

    const request = useRequest<SingleItemResponse>(
        ItemSaveFolderConfig(session!.accessToken),
        (resp) => {
            addItem(resp.data.data);

            return resp.data;
        },
        (error) => {
            if (!(error instanceof AxiosError)) return error;

            notify.popup({
                level: NotifyLevel.error,
                message: error.response!.data.error!.message,
            });
        }
    );

    return { ...request };
}

export function useUploadItem() {
    const { account, session } = useAuthContext();
    const { parent } = useParentContext();
    const { addItem } = useDriveItemsContext();
    const notify = useNotify();

    const request = useRequest<SingleItemResponse>(
        ItemSaveConfig(session!.accessToken),
        (resp) => {
            if (!resp.data.success) {
                notify.popup({
                    level: NotifyLevel.error,
                    message: resp.data.error!.message,
                });
            }

            const item = resp.data.data;
            if (item.parentid === parent.id) addItem(resp.data.data);

            return resp.data;
        },
        (err) => {
            if (!(err instanceof AxiosError)) return err;

            notify.popup({
                level: NotifyLevel.error,
                message: err.response!.data.error!.message,
            });
        }
    );

    function req(filelist: FileList) {
        uploadFileList(filelist, parent.id || "", account!.id, request.request);
    }

    return { ...request, request: req };
}
