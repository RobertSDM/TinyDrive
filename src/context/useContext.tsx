import { useContext } from "react";
import { NotifyContext } from "../features/notification/context/NotifyContext.tsx";
import { DriveItemsContext } from "@/features/fileHandling/context/DriveItemsContext.tsx";
import { SessionContext } from "@/features/authentication/context/SessionContext.tsx";
import { ModalContext } from "@/features/modal/context/modalContext.tsx";

export const useNotifyContext = () => useContext(NotifyContext);
export const useSessionContext = () => useContext(SessionContext);
export const useDriveItemsContext = () => useContext(DriveItemsContext);
export const useModalContext = () => useContext(ModalContext);
