import { NotificationLevels } from "../../../../types/enums.ts";
import { IFile, INotification } from "../../../../types/types.ts";
import { beAPI } from "../../../../utils/enviromentVariables.ts";

const saveFile = async (
    enqueue: (notification: INotification) => void,
    byteData: ArrayBuffer | string,
    name: string,
    extension: string,
    byteSize: number,
    userId: string,
    token: string,
    folderId: string | null = null,
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
        const res = await beAPI.post("/file/save", body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

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
                msg: `error while saving`,
                special: name
            });
        }

        throw err;
    }
};

export default saveFile;
