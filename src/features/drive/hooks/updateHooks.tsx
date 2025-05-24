import {
    useAuthContext,
    useDriveItemsContext,
    useNotify
} from "@/shared/context/useContext.tsx";
import useRequest from "@/shared/hooks/useRequest.tsx";
import { NotifyLevel } from "@/shared/types/enums.ts";
import { Item, SingleItemResponse } from "@/shared/types/types.ts";
import { ItemUpdateNameConfig } from "../api/requestConfig.ts";

export function useUpdateName(item: Item) {
    const { reloadItems } = useDriveItemsContext();
    const { session, account } = useAuthContext();
    const notify = useNotify();

    const request = useRequest<SingleItemResponse>(
        ItemUpdateNameConfig(
            item?.id! ?? "",
            account!.id,
            session!.accessToken
        ),
        (resp) => {
            notify.popup({
                level: NotifyLevel.info,
                message: `The "${item!.name}" was updated`,
            });
            item!.name = resp.data.data.name;
            reloadItems();
            return resp.data;
        }
    );

    return { ...request };
}
