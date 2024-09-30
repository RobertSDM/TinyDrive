import { useState } from "react";
import { NotificationLevels } from "../../types/enums.ts";
import { beAPI } from "../../utils/enviromentVariables.ts";
import {
    useNotificationSystemContext,
    useUserContext,
} from "../../context/useContext.tsx";

const useDeleteFolderById = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { token, user } = useUserContext();
    const { addNotif: enqueue } = useNotificationSystemContext();

    async function fetch_(id: string) {
        setIsLoading(true);
        try {
            const res = await beAPI.delete(`/folder/delete/${id}/${user.id}`, {
                headers: {
                    Authorization: token,
                },
            });
            setIsLoading(false);
            if (res.status === 200) {
                enqueue({
                    level: NotificationLevels.INFO,
                    msg: `successfully deleted`,
                    special: res.data.name,
                });
                return true;
            } else {
                enqueue({
                    level: NotificationLevels.ERROR,
                    msg: `Error while deleting`,
                });
                return false;
            }
        } catch (err) {
            setIsLoading(false);
            enqueue({
                level: NotificationLevels.ERROR,
                msg: `Error while deleting`,
            });
            return false;
        }
    }
    return { fetch_, isLoading, status };
};

export default useDeleteFolderById;
