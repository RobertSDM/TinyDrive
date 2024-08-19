import { NotificationLevels } from "../../types/enums.ts";
import { beAPI } from "../../utils/enviromentVariables.ts";
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
    try {
        const res = await beAPI.post("/folder/save", body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.status === 200) {
            if (showNotif) {
                enqueue({
                    level: NotificationLevels.INFO,
                    msg: `saved with success`,
                    title: "Save",
                    special: res.data.data.name,
                });
            }
            return res.data.data;
        }
        return {} as IFolder;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        if (err.response) {
            enqueue({
                level: NotificationLevels.ERROR,
                msg: err.response.data.msg,
                title: "Register error",
            });
        } else {
            enqueue({
                level: NotificationLevels.ERROR,
                msg: "Error while saving the folder",
                title: "Error",
            });
        }
        return {} as IFolder;
    }
};

export default saveFolder;
