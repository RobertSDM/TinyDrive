import { useContext } from "react";
import { NotifyContext } from "../features/notification/context/NotifyContext.tsx";
import { DriveFilesContext } from "@/features/fileHandling/context/DriveItemsContext.tsx";
import { SessionContext } from "@/features/authentication/context/SessionContext.tsx";
import { ModalContext } from "@/features/modal/context/modalContext.tsx";

export const useNotifyContext = () => {
    const { notify } = useContext(NotifyContext);
    return notify;
};
export const useSessionContext = () => useContext(SessionContext);
export const useDriveItemsContext = () => useContext(DriveFilesContext);
export const useModalContext = () => useContext(ModalContext);
