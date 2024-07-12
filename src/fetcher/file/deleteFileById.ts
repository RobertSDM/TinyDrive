import { NotificationLevels } from "../../types/enums.ts";
import { INotification } from "../../types/types.js";
import { beAPI } from "../../utils/index.ts";

const deleteFileById = async (
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
            msg: `deletado com sucesso`,
            title: "Deletado",
            special: res.data.name,
        });
        return res.data;
    }

    return false;
};
export default deleteFileById;
