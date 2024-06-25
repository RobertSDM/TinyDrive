import { NotificationLevels } from "../types/index.ts";
import { INotification } from "../types/types.js";
import { beAPI } from "../utils/index.ts";

export const deleteFileById = async (
    enqueue: (notification: INotification) => void,
    id: string
) => {

    const res = await beAPI.delete(`/file/delete/${id}`);

    if (res.status === 200) {
        enqueue({
            level: NotificationLevels.INFO,
            msg: `"${res.data.name}" deletado com sucesso`,
            title: "Deletado",
            time: 2000,
        });
        return res.data;
    }

    return false;
};
