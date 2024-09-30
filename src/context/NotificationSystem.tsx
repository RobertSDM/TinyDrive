import {
    ReactElement,
    createContext,
    useCallback,
    useEffect,
    useState,
} from "react";
import type { INotification } from "../types/types.js";

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
    const [currentOne, setCurrentOne] = useState<INotification | null>(null);

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
            setCurrentOne(getFirst());
        } else {
            setCurrentOne(null);
        }

        return notification;
    }, [getFirst, notifications]);

    useEffect(() => {
        if (!currentOne && notifications.length > 0) {
            setCurrentOne(getFirst());
        }
    }, [notifications]);

    return (
        <NotificationContext.Provider
            value={{ addNotif, removeNotif, currentOne }}
        >
            {children}
        </NotificationContext.Provider>
    );
};
