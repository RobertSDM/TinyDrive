import { NotificationLevels } from "../../types/enums.ts";
import { INotification } from "../../types/types.js";
import { beAPI } from "../../utils/index.ts";

export const deleteFileById = async (
    enqueue: (notification: INotification) => void,
    id: string,
    userId: string,
    token: string
) => {
    const res = await beAPI.delete(`/file/delete/${id}/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (res.status === 200) {
        enqueue({
            level: NotificationLevels.INFO,
            msg: `"${res.data.name}" deletado com sucesso`,
            title: "Deletado",
        });
        return res.data;
    }

    return false;
};
