import {
    useDriveItemsContext,
    useNotifyContext,
    useAccountContext,
} from "@/context/useContext.tsx";
import { useMutation } from "@tanstack/react-query";
import {
    deleteFile,
    downloadFile,
    updateName,
    uploadFile,
    uploadFolder,
} from "../requests/fileRequests.ts";
import { File, FilenameRequest, NotifyLevel } from "@/types.ts";

function useRequiredContext() {
    const { account } = useAccountContext();
    const notify = useNotifyContext();
    const { update } = useDriveItemsContext();

    return { account, notify, update };
}

export function useDeleteFile() {
    const { account, notify, update } = useRequiredContext();

    return useMutation({
        mutationFn: (fileids: string[]) => deleteFile(account!.id, fileids),
        onSuccess: (files) => {
            for (let file of files) {
                update({
                    type: "del",
                    file: file,
                });
            }

            notify({
                level: NotifyLevel.INFO,
                message:
                    files.length > 1
                        ? "Todos os arquivos foram deletados"
                        : "O arquivo foi deletado",
                type: "popup",
            });
        },
        onError: () => {
            notify({
                level: NotifyLevel.ERROR,
                message: "Erro ao deletar",
                type: "popup",
            });
        },
    });
}

export default function useUpdateName(fileid: string) {
    const { account, notify, update } = useRequiredContext();

    return useMutation({
        mutationFn: (body: FilenameRequest) =>
            updateName(fileid, account!.id, body),
        onSuccess: (files: File[]) => {
            for (let file of files) {
                update({
                    type: "update",
                    file: file,
                });
            }

            notify({
                level: NotifyLevel.INFO,
                message: "nome alterado",
                type: "popup",
            });
        },
        onError: () => {
            notify({
                level: NotifyLevel.ERROR,
                message: "Erro ao atualizar o nome do arquivo",
                type: "popup",
            });
        },
    });
}

export function useUploadFile(parentid: string) {
    const { account, notify, update } = useRequiredContext();

    return useMutation({
        mutationFn: (body: FileList) => uploadFile(account!.id, parentid, body),
        onMutate: () => {
            notify({
                level: NotifyLevel.INFO,
                message: "Enviando arquivos",
                type: "popup",
            });
        },
        onSuccess: (files: File[]) => {
            for (let file of files) {
                update({
                    type: "add",
                    file: file,
                });
            }

            notify({
                level: NotifyLevel.INFO,
                message: "Foi feito o upload de todos os arquivos",
                type: "popup",
            });
        },
        onError: () => {
            notify({
                level: NotifyLevel.ERROR,
                message: "Erro ao enviar um arquivo",
                type: "popup",
            });
        },
    });
}

export function useUploadFolder(parentid: string | null) {
    const { account, notify, update } = useRequiredContext();

    return useMutation({
        mutationFn: (body: FilenameRequest) =>
            uploadFolder(account!.id, parentid, body),
        onSuccess: (files: File[]) => {
            update({
                type: "add",
                file: files[0],
            });

            notify({
                level: NotifyLevel.INFO,
                message: "A pasta foi criada",
                type: "popup",
            });
        },
        onError: () => {
            notify({
                level: NotifyLevel.ERROR,
                message: "Erro ao criar a pasta",
                type: "popup",
            });
        },
    });
}

export function useDownloadFile() {
    const { account, notify } = useRequiredContext();

    return useMutation({
        mutationKey: ["downloadFile"],
        mutationFn: (fileids: string[]) => downloadFile(fileids, account!.id),
        onError: () => {
            notify({
                level: NotifyLevel.ERROR,
                message: "Erro ao fazer o download",
                type: "popup",
            });
        },
    });
}
