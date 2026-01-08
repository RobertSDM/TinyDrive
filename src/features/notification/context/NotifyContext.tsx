import { ReactNode, createContext, useEffect, useState } from "react";
import { NotificationData } from "../../../types.ts";
import { Popup } from "../components/Popup.tsx";
import { Progress } from "../components/Progress.tsx";

type context = {
    notify: (notification: NotificationData) => void;
    setProgress: React.Dispatch<React.SetStateAction<number>>;
};

export const NotifyContext = createContext<context>({} as context);

export const Notify = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<NotificationData[]>([]);
    const [progress, setProgress] = useState<number>(0);

    function done() {
        dequeue();
    }

    function notify(notification: NotificationData) {
        setNotifications((prev) => [...prev, notification]);
    }

    function dequeue() {
        const tmp = [...notifications];
        tmp.shift();
        setNotifications(tmp);
    }

    useEffect(() => {
        return () => setNotifications([]);
    }, []);

    return (
        <NotifyContext.Provider value={{ notify, setProgress }}>
            {notifications.length > 0 && (
                <div className="fixed bottom-0 right-0 z-[60] w-full h-full">
                    {notifications[0].type === "popup" ? (
                        <Popup {...{ done, notification: notifications[0] }} />
                    ) : (
                        <Progress
                            {...{
                                done,
                                notification: notifications[0],
                                progress,
                            }}
                        />
                    )}
                </div>
            )}
            {children}
        </NotifyContext.Provider>
    );
};
