import { beAPI } from "../../utils/enviromentVariables.ts";

const downloadFolder = async (userId: string, id: string, token: string):Promise<ArrayBuffer> => {
    try {
        const res = await beAPI.get(`/folder/download/zip/${id}/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/zip",
            },
            responseType: "arraybuffer",
        });

        if (res.status === 200) {
            return res.data;
        }
        return new ArrayBuffer(0);
    } catch (err) {
        console.log(err);
        return new ArrayBuffer(0);
    }
};

export default downloadFolder;
