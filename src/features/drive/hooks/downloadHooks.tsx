import useRequest from "@/shared/hooks/useRequest.tsx";
import { Item, SingleResponse } from "@/shared/types/types.ts";
import {
    ItemDownloadConfig,
    ItemDownloadFolderConfig,
} from "../api/requestConfig.ts";
import { useAuthContext, useNotify } from "@/shared/context/useContext.tsx";
import { NotifyLevel } from "@/shared/types/enums.ts";

export function useDownloadFolder(item: Item) {
    const { session, account } = useAuthContext();
    const notify = useNotify();

    const request = useRequest<Blob>(
        ItemDownloadFolderConfig(
            account!.id,
            item?.id! ?? "",
            session!.accessToken
        ),
        (resp) => {
            const bloburl = URL.createObjectURL(resp.data);
            const $a = document.createElement("a");
            $a.download = "";
            $a.href = bloburl;

            $a.click();
            $a.remove();

            return resp.data;
        }
    );

    function req(body?: Object | Object[]) {
        request.request(body);
        notify.popup({
            level: NotifyLevel.info,
            message: `Downloading the ${item.type.toLowerCase()} "${item.name}${
                item.extension
            }"`,
        });
    }

    return { ...request, request: req };
}

export function useDonwloadFile(item: Item) {
    const { session, account } = useAuthContext();
    const notify = useNotify();

    const request = useRequest<SingleResponse<string>>(
        ItemDownloadConfig(account!.id, item?.id! ?? "", session!.accessToken),
        (resp) => {
            const $a = document.createElement("a");
            $a.download = "";
            $a.href = resp.data.data;

            $a.click();
            $a.remove();

            return resp.data;
        }
    );

    function req(body?: Object | Object[]) {
        notify.popup({
            level: NotifyLevel.info,
            message: `Downloading the ${item.type.toLowerCase()} "${item.name}${
                item.extension
            }"`,
        });
        request.request(body);
    }

    return { ...request, request: req };
}
