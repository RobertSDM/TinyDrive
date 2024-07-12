import { useEffect, useState } from "react";
import {
    useNotificationSystemContext,
    useUserContext,
} from "../../hooks/useContext.tsx";
import { NotificationLevels } from "../../types/enums.ts";
import { IFile, IFolder } from "../../types/types.js";
import { beAPI } from "../../utils/index.ts";

const useContentByFolderFetch = (id: string) => {
    const { enqueue } = useNotificationSystemContext();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [status, setStatus] = useState<boolean>(false);
    const [data, setData] = useState<{
        files: IFile[];
        folders: IFolder[];
        requestedFolder: IFolder;
    }>(
        {} as {
            files: IFile[];
            folders: IFolder[];
            requestedFolder: IFolder;
        }
    );
    const user = JSON.parse(localStorage.getItem("user-info")!);
    const { token } = useUserContext();

    useEffect(() => {
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
    }, []);

    return { isLoading, status, data };
};

export default useContentByFolderFetch;
