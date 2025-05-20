import { ServerClient } from "@/shared/api/requestClients.ts";
import { ItemType } from "@/shared/types/enums.ts";
import { Item, Node, SingleItemResponse } from "@/shared/types/types.ts";
import { ItemSaveConfig } from "../api/requestConfig.ts";

export async function* saveItemService(
    n: Node,
    id: string
): AsyncGenerator<Item, void, unknown> {
    for (let i = 0; i < n.children.length; i++) {
        const c = n.children[i];

        c.item.parentid = id;
        const config = ItemSaveConfig();
        const res = await ServerClient({
            ...config,
            data: c.item,
            url: config.path,
        });
        const item: SingleItemResponse = res.data;
        if (!item.data) continue;

        yield item.data;

        if (c.item.type === ItemType.FILE) continue;

        yield* saveItemService(c, item.data.id!);
    }
}
