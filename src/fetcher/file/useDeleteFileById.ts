import { useState } from "react";
import { NotificationLevels } from "../../types/enums.ts";
import { beAPI } from "../../utils/enviromentVariables.ts";
import {
    useNotificationSystemContext,
    useUserContext,
} from "../../hooks/useContext.tsx";

const useDeleteFileById = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { token, user } = useUserContext();
    const { enqueue } = useNotificationSystemContext();

    async function fetch_(id: string) {
        setIsLoading(true);
        try {
            const res = await beAPI.delete(`/file/delete/${id}/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setIsLoading(false);
            if (res.status === 200) {
                enqueue({
                    level: NotificationLevels.INFO,
                    msg: `deletado com sucesso`,
                    title: "Deletado",
                    special: res.data.name,
                });
                return true;
            } else {
                enqueue({
                    level: NotificationLevels.ERROR,
                    msg: `Error while deleting`,
                    title: "Error",
                });
                return false;
            }
        } catch (err) {
            setIsLoading(false);
            enqueue({
                level: NotificationLevels.ERROR,
                msg: `Error while deleting`,
                title: "Error",
            });
            return false;
        }
    }

    return { fetch_, isLoading };
};
export default useDeleteFileById;
