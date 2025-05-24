import useRequest from "@/shared/hooks/useRequest.tsx";
import { ListItemResponse, SingleItemResponse } from "@/shared/types/types.ts";
import { ItemAllFromFolder, ItemById } from "../api/requestConfig.ts";
import { useAuthContext } from "@/shared/context/useContext.tsx";

export function useAllFromFolder(parentid: string) {
    const { account, session } = useAuthContext();

    const request = useRequest<ListItemResponse>(
        ItemAllFromFolder(account!.id, parentid, session!.accessToken ?? "")
    );

    return { ...request };
}

export function useItemById(id: string) {
    const { account, session } = useAuthContext();

    const request = useRequest<SingleItemResponse>(
        ItemById(account!.id, id, session!.accessToken ?? "")
    );

    return { ...request };
}
