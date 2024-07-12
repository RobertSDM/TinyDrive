import { NotificationLevels } from "../../types/enums.ts";
import { beAPI } from "../../utils/index.ts";
import { IFolder, INotification } from "../../types/types.js";

const saveFolder = async (
    name: string,
    parentId: string | null = null,
    userId: string,
    token: string,
    enqueue: (notification: INotification) => void,
    showNotif: boolean = true
): Promise<IFolder> => {
    const body = {
        name,
        parentId,
        owner_id: userId,
    };
    const res = await beAPI.post("/folder/save", body, {
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
    } else {
        if (showNotif) {
            enqueue({
                level: NotificationLevels.INFO,
                msg: res.data.msg,
                title: "Erro ao salvar arquivo",
            });
        }
        return {} as IFolder;
    }
};

export default saveFolder;
