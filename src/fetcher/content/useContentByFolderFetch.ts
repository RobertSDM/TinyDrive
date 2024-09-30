import { useState } from "react";
import {
    useNotificationSystemContext,
    useUserContext,
} from "../../hooks/useContext.tsx";
import { NotificationLevels } from "../../types/enums.ts";
import { beAPI } from "../../utils/enviromentVariables.ts";
import { IFile, IFolder } from "../../types/types.js";

type TData = {
    content: Array<IFile | IFolder>;
    totalPages: number;
    requestedFolder: IFolder;
};

const useContentByFolderFetch = () => {
    const { addNotif: enqueue } = useNotificationSystemContext();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { token, user } = useUserContext();

    const fetch_ = async (id: string, page: number) => {
        setIsLoading(true);
        try {
            const res = await beAPI.get(
                `/content/by/folder/${id}/${user.id}?p=${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (res.status === 200) {
                setIsLoading(false);
                return {
                    content: res.data.content,
                    requestedFolder: res.data.requestedFolder,
                    totalPages: res.data.totalCount,
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
    };

    return { isLoading, fetch_ };
};

export default useContentByFolderFetch;
