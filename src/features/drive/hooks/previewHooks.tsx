import { useAuthContext, useNotify } from "@/shared/context/useContext.tsx";
import useRequest from "@/shared/hooks/useRequest.tsx";
import { SingleResponse } from "@/shared/types/types.ts";
import { ItemImagePreviewConfig } from "../api/requestConfig.ts";
import { NotifyLevel } from "@/shared/types/enums.ts";

export function usePreview(id: string) {
    const { account, session } = useAuthContext();
    const notify = useNotify();

    const request = useRequest<SingleResponse<string>>(
        ItemImagePreviewConfig(account!.id, id, session!.accessToken ?? ""),
        (resp) => {
            if (resp.status === 202) {
                notify.popup({
                    level: NotifyLevel.info,
                    message: resp.data.error?.message!,
                });
            }

            return resp.data;
        }
    );

    return { ...request };
}
