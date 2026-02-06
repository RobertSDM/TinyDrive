import { useContext } from "react";
import { NotifyContext } from "../features/notification/context/NotifyContext.tsx";
import { FilesContext } from "@/features/fileHandling/context/FilesContext.tsx";
import { AccountContext } from "@/features/authentication/context/AccountContext.tsx";
import { ModalContext } from "@/features/modal/context/modalContext.tsx";

export const useNotifyContext = () => {
    const { notify } = useContext(NotifyContext);
    return notify;
};
export const useAccountContext = () => useContext(AccountContext);
export const useFilesContext = () => useContext(FilesContext);
export const useModalContext = () => useContext(ModalContext);
