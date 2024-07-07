import { NotificationLevels } from "../../types/enums.ts";
import { IFile, IFolder, INotification } from "../../types/types.js";
import { beAPI } from "../../utils/index.ts";

const getContentByFolder = async (
    id: string,
    userId: string,
    enqueue: (notification: INotification) => void,
    token: string
): Promise<
    false | { files: IFile[]; folders: IFolder[]; requestedFolder: IFolder }
> => {
    try {
        const res = await beAPI.get(`/content/by/folder/${id}/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res.status === 200) {
            return res.data.data;
        }

        return {} as {
            files: IFile[];
            folders: IFolder[];
            requestedFolder: IFolder;
        };
    } catch (err) {
        enqueue({
            level: NotificationLevels.ERROR,
            title: "Erro ao carregar conteudo",
            msg: "Ocorreu um erro ao carregar o conteudo, por favor tente mais tarde",
        });

        return false;
    }
};

export default getContentByFolder;
