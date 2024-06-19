import { beAPI } from "./../utils/index.js";

const saveFolder = async (name: string, parentId: string | null = null) => {
    const body = {
        name,
        parentId,
    };

    const res = await beAPI.post("/save/folder", body);

    if (res.status === 200) {
        return res.data.id;
    }

    return false;
};

export default saveFolder;
