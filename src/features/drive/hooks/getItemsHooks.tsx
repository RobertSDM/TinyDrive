import useRequest from "@/shared/hooks/useRequest.tsx";
import { ListItemResponse, SingleItemResponse } from "@/shared/types/types.ts";
import { ItemAllFromFolder, ItemByIdConfig } from "../api/requestConfig.ts";
import { useAuthContext, useNotify } from "@/shared/context/useContext.tsx";
import { AxiosError } from "axios";
import { NotifyLevel } from "@/shared/types/enums.ts";

export function useAllFromFolder(
    parentid: string,
    page: number = 0,
    sort: string = "name"
) {
    const { account, session } = useAuthContext();

    const request = useRequest<ListItemResponse>(
        ItemAllFromFolder(
            account!.id,
            parentid,
            session!.accessToken ?? "",
            page,
            sort
        )
    );

    return { ...request };
}

export function useItemById(id: string) {
    const { account, session } = useAuthContext();
    const notify = useNotify();

    const request = useRequest<SingleItemResponse>(
        ItemByIdConfig(account!.id, id, session!.accessToken ?? ""),
        (resp) => resp.data,
        (err) => {
            if (!(err instanceof AxiosError)) return err;
            if (!err?.response?.data) return err;

            notify.popup({
                level: NotifyLevel.error,
                message: err.response.data.error.message,
            });
        }
    );

    return { ...request };
}
