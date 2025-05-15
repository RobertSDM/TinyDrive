import { ItemType } from "@/shared/types/enums.ts";
import { ItemData, Node } from "@/shared/types/index.ts";

function findPlaceToInsert(
    node: Node,
    path: string[],
    depth: number = 0
): [Node, number] {
    if (path.length == 0) return [node, depth];

    for (let c of node.children) {
        if (c.item.type === ItemType.FILE) continue;

        if (c.item.name === path[0]) {
            return findPlaceToInsert(c, path.slice(1), depth + 1);
        }
    }

    return [node, depth];
}

function makeFileStructure(file: File, ownerid: string, startNode: Node) {
    let wholePath: string = file.webkitRelativePath;
    if (wholePath.length === 0) wholePath = file.name;

    let directives: string[] = wholePath.split("/");
    let folders: string[] = directives.slice(0, directives.length - 1);

    let [node, depth] = findPlaceToInsert(startNode, folders);

    node = folders.slice(depth).reduce((acc, f, i) => {
        const folderItem: ItemData = {
            extension: "",
            parentid: null,
            size: 0,
            type: ItemType.FOLDER,
            name: f,
            ownerid,
            path: folders.slice(0, i + 1).join("/"),
        };

        const newNode: Node = {
            item: folderItem,
            children: [],
            buffer: null,
        };

        acc.children.push(newNode);
        return newNode;
    }, node);

    const [name, ...rest] = file.name.split(".");
    const extension = rest[rest.length - 1];

    const item: ItemData = {
        extension,
        name,
        ownerid,
        parentid: null,
        path: wholePath,
        size: file.size,
        type: ItemType.FILE,
    };

    node.children.push({
        item,
        children: [],
        buffer: file.arrayBuffer(),
    });
}

export default function transformFileToItem(
    filelist: FileList,
    ownerid: string
): Node {
    const defaultItemData: ItemData = {
        extension: "",
        name: "",
        ownerid: ownerid,
        parentid: null,
        path: "",
        size: 0,
        type: ItemType.FOLDER,
    };

    const root: Node = {
        item: Object.assign({}, defaultItemData),
        children: [],
        buffer: null,
    };

    Array.from(filelist).forEach((file) =>
        makeFileStructure(file, ownerid, root)
    );

    return root;
}
