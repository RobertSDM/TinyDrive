import { BACKEND_URL } from './../utils/index.js';


const saveFile = async (
    convertetByteData: ArrayBuffer | string,
    name: string,
    extension: string,
    type: string,
    byteSize: number
) => {
    

    const res = await fetch(`${BACKEND_URL}/save/file`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http:localhost:5173",
        },
        body: JSON.stringify({
            byteData: convertetByteData,
            name,
            type,
            extension,
            byteSize,
        }),
    });

    if (res.ok) {
        console.log("Salvou bem");
        return true;
    }

    console.log("Deu ruim");
    return false;
};

export default saveFile;
