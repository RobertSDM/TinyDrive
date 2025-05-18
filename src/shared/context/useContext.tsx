import { useContext } from "react";
import { NotificationContext } from "./NotificationSystem.tsx";
import { ParentItemContext } from "@/features/drive/context/ParentItemContext.tsx";
import { ModalContext } from "./ModalContext.tsx";
import { DriveItemsContext } from "@/features/drive/context/DriveItemsContext.tsx";
import { AuthContext } from "./AuthContext.tsx";

export const useNotificationSystemContext = () => {
    return useContext(NotificationContext);
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const useParentContext = () => {
    return useContext(ParentItemContext);
};

export const useModalContext = () => {
    return useContext(ModalContext);
};

export const useDriveItemsContext = () => {
    return useContext(DriveItemsContext);
};
