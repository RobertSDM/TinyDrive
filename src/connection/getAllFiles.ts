import { NotificationLevels } from "../types/index.ts";
import type { IFile, IFolder, INotification } from "../types/types.d.ts";
import { beAPI } from "../utils/index.ts";

const getAllFilesByFolderId = async (
    id: string | "/",
    userId: string
): Promise<false | IFile[]> => {
    try {
        const res = await beAPI.get(`/get_content/${id}/${userId}`);

        if (res.status === 200) {
            return res.data as IFile[];
        }

        return [] as IFile[];
    } catch (err) {
        console.log(err);
        return false;
    }
};

const getAllRootFiles = async (
    userId: string,
    enqueue: (notification: INotification) => void
): Promise<false | { files: IFile[]; folders: IFolder[] }> => {
    try {
        const res = await beAPI.get(`/get_root_content/${userId}`);

        if (res.status === 200) {
            return res.data.data;
        }

        return {} as { files: IFile[]; folders: IFolder[] };
    } catch (err) {
        enqueue({
            level: NotificationLevels.ERROR,
            title: "Erro ao carregar conteudo",
            msg: "Ocorreu um erro ao carregar o conteudo, por favor tente mais tarde",
            time: 4000,
        });

        return false;
    }
};

const getByFolder = async (
    id: string,
    userId: string,
    enqueue: (notification: INotification) => void
): Promise<
    false | { files: IFile[]; folders: IFolder[]; requestedFolder: IFolder }
> => {
    try {
        const res = await beAPI.get(`/from/folder/${id}/${userId}`);

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
            time: 4000,
        });

        return false;
    }
};

export { getAllFilesByFolderId, getAllRootFiles, getByFolder };
