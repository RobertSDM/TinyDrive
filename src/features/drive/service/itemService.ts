import { Node, SingleItemResponse } from "@/shared/types/index.ts";
import { makeRequest } from "../../../shared/api/itemRequest.ts";
import { ItemCreateConfig as ItemSaveConfig } from "../api/config.ts";
import { DefaultClient } from "@/shared/api/clients.ts";
import { ItemType } from "@/shared/types/enums.ts";

export default function saveItem(n: Node, id: number) {
    n.children.forEach(async (c) => {
        c.item.parentid = id;
        const item = await makeRequest<SingleItemResponse>(
            { ...ItemSaveConfig, body: c.item },
            DefaultClient
        );

        if (c.item.type === ItemType.FILE || !item) return;

        saveItem(c, item.data.id!);
    });
}
