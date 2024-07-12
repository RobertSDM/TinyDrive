import { NotificationLevels } from "../../types/enums.ts";
import { INotification } from "../../types/types.js";
import { beAPI } from "../../utils/index.ts";

const saveFile = async (
    enqueue: (notification: INotification) => void,
    byteData: ArrayBuffer | string,
    folderId: string | null,
    name: string,
    extension: string,
    byteSize: number,
    userId: string,
    token: string,
    showNotif: boolean = true
) => {
    const body = {
        byteData,
        folderId,
        name,
        extension,
        byteSize,
        owner_id: userId,
    };

    const res = await beAPI.post("/file/save", body, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (res.status === 200) {
        if (showNotif) {
            enqueue({
                level: NotificationLevels.INFO,
                msg: `salvo com sucesso`,
                title: "Salvamento",
                special: res.data.data.name,
            });
        }
        return res.data.data;
    }

    return false;
};

export default saveFile;
