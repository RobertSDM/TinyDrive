import { DefaultClient } from "@/shared/api/clients.ts";
import { ItemType } from "@/shared/types/enums.ts";
import { Node } from "@/shared/types/index.ts";
import { ItemCreateConfig as ItemSaveConfig } from "../api/config.ts";

export default function saveItemService(n: Node, id: number) {
    n.children.forEach(async (c) => {
        c.item.parentid = id;
        const res = await DefaultClient({
            ...ItemSaveConfig,
            data: c.item,
            url: ItemSaveConfig.path,
        });
        const item = res.data;

        if (c.item.type === ItemType.FILE || !item) return;

        saveItemService(c, item.data.id!);
    });
}
