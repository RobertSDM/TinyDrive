import { useState } from "react";
import {
    useNotificationSystemContext,
    useUserContext,
} from "../../hooks/useContext.tsx";
import { NotificationLevels } from "../../types/enums.ts";
import { IFile, IFolder } from "../../types/types.js";
import { beAPI } from "../../utils/enviromentVariables.ts";

type TData = {
    content: Array<IFile | IFolder>;
    totalPages: number;
};

const useRootContentFetch = () => {
    const { addNotif: enqueue } = useNotificationSystemContext();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { token, user } = useUserContext();

    async function fetch_(page: number) {
        setIsLoading(true);
        try {
            const res = await beAPI.get(`/content/all/${user.id}?p=${page}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.status === 200) {
                setIsLoading(false);
                return {
                    content: res.data.content,
                    totalPages: res.data.totalCount,
                    page: res.data.page,
                } as TData;
            } else {
                setIsLoading(false);
                return null;
            }
        } catch (err) {
            setIsLoading(false);
            enqueue({
                level: NotificationLevels.ERROR,
                title: "Error loading the content",
                msg: "Error while loading the content. Please try again",
            });
            return null;
        }
    }

    return { isLoading, fetch_ };
};

export default useRootContentFetch;
