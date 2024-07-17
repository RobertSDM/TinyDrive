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

    try {
        const res = await beAPI.post("/file/save", body, {
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
            } else {
                enqueue({
                    level: NotificationLevels.ERROR,
                    msg: `could not be saved`,
                    title: "Save error",
                    special: res.data.data.name,
                });
                return false;
            }
            return res.data.data;
        }
    } catch (err) {
        enqueue({
            level: NotificationLevels.ERROR,
            msg: `Error while saving the file`,
            title: "Save error",
        });
        return false;
    }
};

export default saveFile;
