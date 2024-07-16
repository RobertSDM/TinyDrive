import { useState } from "react";
import {
    useNotificationSystemContext,
    useUserContext,
} from "../../hooks/useContext.tsx";
import { NotificationLevels } from "../../types/enums.ts";
import { IFile, IFolder } from "../../types/types.js";
import { beAPI } from "../../utils/index.ts";

type TData = {
    files: IFile[];
    folders: IFolder[];
};

const useRootContentFetch = () => {
    const { enqueue } = useNotificationSystemContext();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<TData | null>(null);
    const { token, user } = useUserContext();

    function fetch_() {
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

    return { isLoading, data, fetch_ };
};

export default useRootContentFetch;
