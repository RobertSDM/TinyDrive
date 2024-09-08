import { NotificationLevels } from "../../types/enums.ts";
import { INotification } from "../../types/types.js";
import { beAPI } from "../../utils/enviromentVariables.ts";

type updateFolderReturn = {
    name: string;
    tray: {
        [id: string]: string;
    } | null;
};

const updateFolderName = async (
    enqueue: (notification: INotification) => void,
    newName: string,
    name: string,
    folderId: string | null,
    fileId: string,
    ownerId: string,
    parentId: string | null,
    token: string
): Promise<updateFolderReturn> => {
    const body = {
        new_name: newName,
        folder_id: folderId,
        name,
        parent_id: parentId,
    };

    try {
        const res = await beAPI.put(
            `/folder/update/name/${fileId}/${ownerId}`,
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
                title: "Save",
            });
            return { name: newName, tray: res.data.data.tray };
        }
        return { name, tray: null };
    } catch (err: any) {
        if (err.response) {
            enqueue({
                level: NotificationLevels.ERROR,
                msg: err.response.data.msg,
                title: "The name already exists in the folder",
            });
        } else {
            enqueue({
                level: NotificationLevels.ERROR,
                msg: `Error while updating the file`,
                title: "Update error",
            });
        }

        return { name, tray: null };
    }
};

export default updateFolderName;
