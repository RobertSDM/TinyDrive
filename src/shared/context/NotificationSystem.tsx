import {
    ReactElement,
    createContext,
    useCallback,
    useEffect,
    useState,
} from "react";
import type { INotification } from "../types/types.ts";

type context = {
    addNotif: (notification: INotification) => void;
    removeNotif: () => void;
    currentOne: INotification | null;
};

export const NotificationContext = createContext<context>({} as context);

export const NotificationProvider = ({
    children,
}: {
    children: ReactElement;
}) => {
    const [notifications, setNotifications] = useState<INotification[]>([]);

    const [currentNotif, setCurrentNotif] = useState<INotification | null>(
        null
    );

    const addNotif = useCallback((notification: INotification) => {
        const id = Date.now();
        notification["id"] = id;
        setNotifications((prev) => [...prev, notification]);
    }, []);

    const getFirst = useCallback(() => {
        return notifications[0];
    }, [notifications]);

    const removeNotif = useCallback(() => {
        const notification = getFirst();
        setNotifications((prev) => {
            prev.shift();
            return prev;
        });

        if (notifications.length > 0) {
            setCurrentNotif(getFirst());
        } else {
            setCurrentNotif(null);
        }

        return notification;
    }, [notifications]);

    useEffect(() => {
        if (!currentNotif && notifications.length > 0) {
            setCurrentNotif(getFirst());
        }
    }, [notifications.length]);

    return (
        <NotificationContext.Provider
            value={{ addNotif, removeNotif, currentOne: currentNotif }}
        >
            {children}
        </NotificationContext.Provider>
    );
};
