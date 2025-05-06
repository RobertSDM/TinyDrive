type Tree = {
    [key: string]: string[];
};

const tree: Tree = {
    "a/b/c": ["file.txt"],
    "a/b": ["file.txt"],
    "a/b/d": ["file.txt"],
    "a/b/d/f": ["file.txt"],
};

type Payload = {
    [key: string]: { parentId: number | null; id: number | null };
};

const payloads: Payload = {};

Object.keys(tree).forEach((k) => {
    payloads[k] = {
        parentId: null,
        id: null,
    };
});

function getParent(path: string) {
    let ps = path.split("/");
    ps.pop();
    return ps.join("/");
}

function getParentFolders(tree: Tree): Set<string> {
    const toCreate: Set<string> = new Set();

    Object.keys(tree).forEach((k) => {
        const p = getParent(k);

        if (tree[p] != undefined) {
            toCreate.add(p);
        }
    });

    return toCreate;
}

const parentFolders = Array.from(getParentFolders(tree));

// Create folders
const saveFolder = (f: string) => {
    return Math.floor(Math.random() * 90);
};

parentFolders.map(async (f) => {
    const id = saveFolder(f.split("/").pop()!);

    payloads[f] = {
        id: id,
        parentId: null,
    };
});

// Create child folders
Object.keys(payloads).forEach((k) => {
    let p = getParent(k);

    if (tree[p] != undefined) {
        payloads[k].parentId = payloads[p].id;
    }
});

console.log(payloads);
