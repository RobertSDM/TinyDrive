import { beAPI } from "./../utils/index.js";

const saveFolder = async (
    name: string,
) => {
    const body = {
        name,
    };

    const res = await beAPI.post("/save/folder", body);

    console.log(res)

    if (res.status === 200) {
        return res.data.id;
    }

    return false;
};

export default saveFolder;
