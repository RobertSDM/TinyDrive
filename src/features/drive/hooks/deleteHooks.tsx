import {
    useAuthContext,
    useDriveItemsContext,
    useNotify,
    useParentContext,
} from "@/shared/context/useContext.tsx";
import useRequest from "@/shared/hooks/useRequest.tsx";
import { NotifyLevel } from "@/shared/types/enums.ts";
import { FailuresAndSuccesses, SingleResponse } from "@/shared/types/types.ts";
import { ItemDeleteConfig } from "../api/requestConfig.ts";

export default function useDeleteItem() {
    const { removeItem } = useDriveItemsContext();
    const { account, session } = useAuthContext();
    const { parent, changeParentToRoot } = useParentContext();
    const notify = useNotify();

    const request = useRequest<SingleResponse<FailuresAndSuccesses>>(
        ItemDeleteConfig(account!.id!, session!.accessToken),
        (resp) => {
            const respBody = resp.data.data;
            respBody.successes.forEach((id) => {
                console.log(id);
                removeItem(id);
            });

            if (respBody.successes.includes(parent.id ?? ""))
                changeParentToRoot();

            notify.popup({
                level: NotifyLevel.info,
                message: `${
                    respBody.successes.length > 1
                        ? "All items where "
                        : `The item was `
                }deleted`,
            });
            return resp.data;
        }
    );

    return { ...request };
}
