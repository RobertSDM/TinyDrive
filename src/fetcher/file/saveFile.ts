import { IFile } from "./../../types/types.js";
import { NotificationLevels, NotificationTypes } from "../../types/enums.ts";
import { INotification } from "../../types/types.js";
import { beAPI } from "../../utils/enviromentVariables.ts";

const saveFile = async (
    enqueue: (notification: INotification) => void,
    byteData: ArrayBuffer | string,
    name: string,
    extension: string,
    byteSize: number,
    userId: string,
    token: string,
    folderId: string | null = null,
    showNotif: boolean = true
): Promise<IFile> => {
    const body = {
        byteData,
        folderId,
        name,
        extension,
        byteSize,
        owner_id: userId,
    };

    try {
        if (showNotif) {
            enqueue({
                level: NotificationLevels.INFO,
                msg: `upload started`,
                type: NotificationTypes.STATIC,
            });
        }

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
                    type: NotificationTypes.STATIC,
                    special: res.data.data.name,
                });
            }
        }
        return res.data.data;
    } catch (err: any) {
        if (err.response) {
            enqueue({
                level: NotificationLevels.ERROR,
                msg: err.response.data.msg,
            });
        } else {
            enqueue({
                level: NotificationLevels.ERROR,
                msg: `Error while saving the file`,
            });
        }

        throw err;
    }
};

export default saveFile;
