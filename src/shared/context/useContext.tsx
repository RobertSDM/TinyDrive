import { useContext } from "react";
import { UserContext } from "./UserContext.tsx";
import { NotificationContext } from "./NotificationSystem.tsx";
import { ParentItemContext } from "@/features/drive/context/ParentItemContext.tsx";
import { ModalContext } from "./ModalContext.tsx";
import { DriveItemsContext } from "@/features/drive/context/DriveItemsContext.tsx";

export const useUserContext = () => {
    return useContext(UserContext);
};

export const useNotificationSystemContext = () => {
    return useContext(NotificationContext);
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
