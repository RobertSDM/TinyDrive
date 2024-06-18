import { beAPI } from './../utils/index.js';


const saveFile = async (
    byteData: ArrayBuffer | string,
    folderId: string | null,
    name: string,
    extension: string,
    byteSize: number
) => {
    const body = {
        byteData,
        folderId,
        name,
        extension,
        byteSize
    }

    const res = await beAPI.post("/save/file", body)

    if(res.status === 200){
        return res.data
    }

    return false;
};

export default saveFile;
