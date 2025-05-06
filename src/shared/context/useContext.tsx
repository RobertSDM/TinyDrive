import { useContext } from "react";
import { UserContext } from "./UserContext.tsx";
import { NotificationContext } from "./NotificationSystem.tsx";
import { TreeContext } from "./TreeContext.tsx";
import { PaginationContext } from "@/features/drive/context/paginationSave.tsx";

export const useUserContext = () => {
    return useContext(UserContext);
};

export const useNotificationSystemContext = () => {
    return useContext(NotificationContext);
};

export const useTreeContext = () => {
    return useContext(TreeContext);
};

export const usePaginationContext = () => {
    return useContext(PaginationContext);
};
