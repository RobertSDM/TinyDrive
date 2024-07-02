import { NotificationLevels } from "../types/index.ts";
import { IFolder, INotification } from "../types/types.js";
import { beAPI } from "./../utils/index.js";

const saveFolder = async (
    name: string,
    parentId: string | null = null,
    enqueue: (notification: INotification) => void,
    userId: string,
    showNotif: boolean = true
): Promise<IFolder> => {
    const body = {
        name,
        parentId,
        owner_id: userId,
    };

    const res = await beAPI.post("/save/folder", body);

    if (res.status === 200) {
        if (showNotif) {
            enqueue({
                level: NotificationLevels.INFO,
                msg: `"${res.data.data.name}" salvo com sucesso`,
                title: "Salvamento",
                time: 2000,
            });
        }

        return res.data.data;
    } else {
        if (showNotif) {
            enqueue({
                level: NotificationLevels.INFO,
                msg: res.data.msg,
                title: "Erro ao salvar arquivo",
                time: 2000,
            });
        }
    }

    return {} as IFolder;
};

export default saveFolder;
