import { NotificationLevels } from "../../types/enums.ts";
import { IFolder, INotification } from "../../types/types.js";
import { beAPI } from "../../utils/index.ts";

const saveFolder = async (
    name: string,
    parentId: string | null = null,
    enqueue: (notification: INotification) => void,
    userId: string,
    showNotif: boolean = true,
    token: string
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
                msg: `"${res.data.data.name}" salvo com sucesso`,
                title: "Salvamento",
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
    }

    return {} as IFolder;
};

export default saveFolder;
