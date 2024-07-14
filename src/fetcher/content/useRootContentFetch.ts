import { useState } from "react";
import {
    useNotificationSystemContext,
    useUserContext,
} from "../../hooks/useContext.tsx";
import { NotificationLevels } from "../../types/enums.ts";
import { IFile, IFolder } from "../../types/types.js";
import { beAPI } from "../../utils/index.ts";

const useRootContentFetch = () => {
    const { enqueue } = useNotificationSystemContext();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [status, setStatus] = useState<boolean>(false);
    const [data, setData] = useState<{
        files: IFile[];
        folders: IFolder[];
    }>(
        {} as {
            files: IFile[];
            folders: IFolder[];
        }
    );
    const user = JSON.parse(localStorage.getItem("user-info")!);
    const { token } = useUserContext();

    async function fetch_() {
        try {
            beAPI
                .get(`/content/all/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    setIsLoading(false);

                    if (res.status === 200) {
                        setStatus(true);
                        setData(res.data.data);
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
    }

    return { isLoading, status, data, fetch_ };
};

export default useRootContentFetch;
