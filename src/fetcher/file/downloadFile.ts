import { beAPI } from "../../utils/enviromentVariables.ts";

const downloadFile = async (userId: string, id: string, token: string) => {
    try {
        const res = await beAPI.get(`/file/download/${id}/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.status === 200) {
            return res.data;
        }
    } catch (err) {
        return false;
    }
};

export default downloadFile;
