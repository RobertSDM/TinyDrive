import useRequest from "@/shared/hooks/useRequest.tsx";
import { ListItemResponse, SingleItemResponse } from "@/shared/types/types.ts";
import { ItemAllFromFolder, ItemByIdConfig } from "../api/requestConfig.ts";
import { useAuthContext } from "@/shared/context/useContext.tsx";

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

    const request = useRequest<SingleItemResponse>(
        ItemByIdConfig(account!.id, id, session!.accessToken ?? "")
    );

    return { ...request };
}
