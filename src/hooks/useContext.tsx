import { useContext } from "react";
import { UserContext } from "../context/UserContext.tsx";
import { NotificationContext } from "../context/NotificationSystem.tsx";
import { TreeContext } from "../context/TreeContext.tsx";
import { contentCacheContext } from "../context/ContentCacheContext.tsx";

export const useUserContext = () => {
    return useContext(UserContext);
};

export const useNotificationSystemContext = () => {
    return useContext(NotificationContext);
};

export const useTreeContext = () => {
    return useContext(TreeContext);
};

export const useContentCacheContext = () => {
    return useContext(contentCacheContext)
}
