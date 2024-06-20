import { NotificationLevels } from "../types/index.ts";
import { INotification } from "../types/types.js";
import { beAPI } from "./../utils/index.js";

const saveFile = async (
    enqueue: (notification: INotification) => void,
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
        byteSize,
    };

    const res = await beAPI.post("/save/file", body);

    if (res.status === 200) {
        enqueue({
            level: NotificationLevels.INFO,
            msg: `"${res.data.name}" salvo com sucesso`,
            title: "Salvamento",
            time: 200,
        });
        return res.data;
    }

    return false;
};

export default saveFile;
