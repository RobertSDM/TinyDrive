import { ReactNode, createContext, useEffect, useRef, useState } from "react";
import { NotificationData } from "../../../types.ts";
import { Popup } from "../components/Popup.tsx";
import { Progress } from "../components/Progress.tsx";

type context = {
    notify: (notification: NotificationData) => void;
    setProgress: React.Dispatch<React.SetStateAction<number>>;
};

export const NotifyContext = createContext<context>({} as context);

export const Notify = ({ children }: { children: ReactNode }) => {
    const queue = useRef<NotificationData[]>([]);
    const isShowing = useRef<boolean>(false);

    const [notificationShown, setNotificationShown] =
        useState<NotificationData | null>(null);
    const [progress, setProgress] = useState<number>(0);

    function done() {
        dequeue();
    }

    function notify(notification: NotificationData) {
        if (isShowing.current) {
            queue.current = [...queue.current, notification];
        } else {
            setNotificationShown(notification);
            isShowing.current = true;
        }
    }

    function dequeue() {
        const tmp = [...queue.current];
        const notificationRemoved = tmp.shift();

        if (!!notificationRemoved) {
            setNotificationShown(notificationRemoved);
        } else {
            setNotificationShown(null);
            isShowing.current = false;
        }

        queue.current = tmp;
    }

    useEffect(() => {
        return () => {
            queue.current = [];
        };
    }, []);

    return (
        <NotifyContext.Provider value={{ notify, setProgress }}>
            {!!notificationShown && (
                <div className="fixed bottom-0 right-0 z-[60] w-full h-full">
                    {notificationShown.type === "popup" ? (
                        <Popup {...{ done, notification: notificationShown }} />
                    ) : (
                        <Progress
                            {...{
                                done,
                                notification: notificationShown,
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
