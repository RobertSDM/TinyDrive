import useRequest from "@/shared/hooks/useRequest.tsx";
import { Item } from "@/shared/types/types.ts";
import {
    ItemDownloadConfig,
    ItemDownloadFolderConfig,
} from "../api/requestConfig.ts";
import { useAuthContext, useNotify } from "@/shared/context/useContext.tsx";
import { NotifyLevel } from "@/shared/types/enums.ts";
import { AxiosError } from "axios";

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
            const contentDisposition: string =
                resp.headers["content-disposition"];
            const filename = contentDisposition
                .split(";")[1]
                .split("=")[1]
                .replaceAll('"', "")
                .replaceAll("'", "");
            const bloburl = URL.createObjectURL(resp.data);
            const $a = document.createElement("a");
            $a.download = filename;
            $a.href = bloburl;

            $a.click();
            $a.remove();

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

export function useDonwloadFile(item: Item) {
    const { session, account } = useAuthContext();
    const notify = useNotify();

    const request = useRequest<Blob>(
        ItemDownloadConfig(account!.id, item?.id! ?? "", session!.accessToken),
        (resp) => {
            try {
                const contentDisposition: string =
                    resp.headers["content-disposition"];
                const filename = contentDisposition
                    .split(";")[1]
                    .split("=")[1]
                    .replaceAll('"', "")
                    .replaceAll("'", "");
                const bloburl = URL.createObjectURL(resp.data);
                const $a = document.createElement("a");
                $a.download = filename;
                $a.href = bloburl;

                $a.click();
                $a.remove();
            } catch (err) {
                console.log(err);
            }

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
