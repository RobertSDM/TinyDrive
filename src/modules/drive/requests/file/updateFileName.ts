import { NotificationLevels } from "../../../../types/enums.ts";
import { INotification } from "../../../../types/types.ts";
import { beAPI } from "../../../../utils/enviromentVariables.ts";

const updateFileName = async (
    enqueue: (notification: INotification) => void,
    newName: string,
    name: string,
    folderId: string | null,
    extension: string,
    fileId: string,
    ownerId: string,
    token: string
): Promise<string> => {
    const body = {
        new_name: newName,
        folder_id: folderId,
        name,
        extension,
    };

    try {
        const res = await beAPI.put(
            `/file/update/name/${fileId}/${ownerId}`,
            body,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (res.status === 200) {
            enqueue({
                level: NotificationLevels.INFO,
                msg: `updated with success`,
            });
            return newName;
        }
        return name;
    } catch (err: any) {
        if (err.response) {
            enqueue({
                level: NotificationLevels.ERROR,
                msg: err.response.data.msg,
            });
        } else {
            enqueue({
                level: NotificationLevels.ERROR,
                msg: `Error while updating the file`,
            });
        }

        return name;
    }
};

export default updateFileName;
