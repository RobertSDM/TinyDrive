import { NotificationLevels } from "../types/index.ts";
import { IFolder, INotification } from "../types/types.js";
import { beAPI } from "./../utils/index.js";

const saveFolder = async (
    name: string,
    parentId: string | null = null,
    enqueue: (notification: INotification) => void
): Promise<IFolder> => {
    const body = {
        name,
        parentId,
    };

    const res = await beAPI.post("/save/folder", body);

    if (res.status === 200) {
        enqueue({
            level: NotificationLevels.INFO,
            msg: `"${res.data.name}" salvo com sucesso`,
            title: "Salvamento",
            time: 2000,
        });

        return res.data;
    }

    return {} as IFolder;
};

export default saveFolder;
