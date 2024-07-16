import { useState } from "react";
import {
    useNotificationSystemContext,
    useUserContext,
} from "../../hooks/useContext.tsx";
import { NotificationLevels } from "../../types/enums.ts";
import { IFile, IFolder } from "../../types/types.js";
import { beAPI } from "../../utils/index.ts";

const useContentByFolderFetch = () => {
    const { enqueue } = useNotificationSystemContext();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [status, setStatus] = useState<boolean>(false);
    const [data, setData] = useState<{
        files: IFile[];
        folders: IFolder[];
        requestedFolder: IFolder;
    } | null>(null);
    const { token, user } = useUserContext();

    const fetch_ = async (id: string) => {
        setIsLoading(true);
        try {
            beAPI
                .get(`/content/by/folder/${id}/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        setIsLoading(false);
                        setData({
                            files: res.data.data.files,
                            folders: res.data.data.folders,
                            requestedFolder: res.data.data.requestedFolder,
                        });
                        setStatus(true);
                    }
                });
        } catch (err) {
            setIsLoading(false);
            enqueue({
                level: NotificationLevels.ERROR,
                title: "Erro ao carregar conteudo",
                msg: "Ocorreu um erro ao carregar o conteudo, por favor tente mais tarde",
            });
        }
    };

    return { isLoading, status, data, fetch_ };
};

export default useContentByFolderFetch;
