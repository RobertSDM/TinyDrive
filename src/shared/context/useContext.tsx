import { useContext } from "react";
import { UserContext } from "./UserContext.tsx";
import { NotificationContext } from "./NotificationSystem.tsx";
import { ParentItemContext } from "@/features/drive/context/ParentItemContext.tsx";

export const useUserContext = () => {
    return useContext(UserContext);
};

export const useNotificationSystemContext = () => {
    return useContext(NotificationContext);
};

export const useParentContext = () => {
    return useContext(ParentItemContext);
};
