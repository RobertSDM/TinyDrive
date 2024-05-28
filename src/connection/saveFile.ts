import { beAPI } from './../utils/index.js';


const saveFile = async (
    byteData: ArrayBuffer | string,
    name: string,
    extension: string,
    type: string,
    byteSize: number
) => {
    const body = {
        byteData,
        name,
        type,
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
