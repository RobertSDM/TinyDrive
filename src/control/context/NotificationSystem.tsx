import { ReactElement, createContext, useEffect, useState } from "react";
import type { INotification } from "../../types/types.d.ts";

type context = {
    enqueue: (notification: INotification) => void;
    dequeue: () => void;
    notifications: INotification[];
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

    function enqueue(notification: INotification) {
        const id = Date.now();
        notification["id"] = id;
        setNotifications((prev) => [...prev, notification]);
    }

    function dequeue() {
        const notification = notifications[0];
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
    }

    useEffect(() => {
        if (!currentOne && notifications.length > 0) {
            setCurrentOne(getFirst());
        }
    }, [notifications]);

    function getFirst() {
        return notifications[0];
    }

    return (
        <NotificationContext.Provider
            value={{ enqueue, dequeue, notifications, currentOne }}
        >
            {children}
        </NotificationContext.Provider>
    );
};
