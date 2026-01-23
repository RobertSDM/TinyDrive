import {
    useDriveItemsContext,
    useNotifyContext,
    useSessionContext,
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
    const { session } = useSessionContext();
    const { notify } = useNotifyContext();
    const { update } = useDriveItemsContext();

    return { session, notify, update };
}

export function useDeleteFile() {
    const { session, notify, update } = useRequiredContext();

    return useMutation({
        mutationFn: (fileids: string[]) => deleteFile(session!.userid, fileids),
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
    });
}

export default function useUpdateName(fileid: string) {
    const { session, notify, update } = useRequiredContext();

    return useMutation({
        mutationFn: (body: FilenameRequest) =>
            updateName(fileid, session!.userid, body),
        onSuccess: (files: File[]) => {
            for (let file of files) {
                update({
                    type: "update",
                    file: file,
                });
            }

            notify({
                level: NotifyLevel.INFO,
                message: files.length > 1 ? "nomes alterados" : "nome alterado",
                type: "popup",
            });
        },
    });
}

export function useUploadFile(parentid: string) {
    const { session, notify, update } = useRequiredContext();

    return useMutation({
        mutationFn: (body: FileList) =>
            uploadFile(session!.userid, parentid, body),
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
    });
}

export function useUploadFolder() {
    const { session, notify, update } = useRequiredContext();

    return useMutation({
        mutationFn: (body: FilenameRequest) =>
            uploadFolder(session!.userid, body),
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
    const { session } = useRequiredContext();

    return useMutation({
        mutationKey: ["downloadFile"],
        mutationFn: (fileids: string[]) =>
            downloadFile(fileids, session!.userid),
    });
}
