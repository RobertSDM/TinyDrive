import { useContext } from "react";
import { UserContext } from "./UserContext.tsx";
import { NotificationContext } from "./NotificationSystem.tsx";

export const useUserContext = () => {
    return useContext(UserContext);
};

export const useNotificationSystemContext = () => {
    return useContext(NotificationContext);
};
