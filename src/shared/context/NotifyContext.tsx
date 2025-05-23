import { ReactNode, createContext, useEffect, useState } from "react";
import {
    BaseNotification,
    PopupNotification,
    ProgressNotification,
    TimedNotification,
} from "../types/types.ts";

type context = {
    popup: (notification: PopupNotification) => void;
    progress: (notification: ProgressNotification) => void;
    timed: (notification: TimedNotification) => void;
};

export const NotifyContext = createContext<context>({} as context);

export const Notify = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<JSX.Element[]>([]);
    const [notification, setNotification] = useState<JSX.Element | undefined>(
        undefined
    );

    function done() {
        setNotification(undefined);
    }

    function enqueue(notification: JSX.Element) {
        setNotifications((prev) => [...prev, notification]);
    }

    function popup(notification: PopupNotification) {
        enqueue(<Notify.Popup notification={notification} done={done} />);
    }

    function timed(notification: TimedNotification) {
        enqueue(<Notify.Timed notification={notification} done={done} />);
    }

    function progress(notification: ProgressNotification) {
        enqueue(<Notify.Progress notification={notification} done={done} />);
    }

    function dequeue(): JSX.Element | undefined {
        if (notifications.length == 0) {
            return;
        }

        const tmp = [...notifications];
        const notification = tmp.shift();
        setNotifications(tmp);
        return notification;
    }

    useEffect(() => {
        if (notifications.length === 0 || notification) return;
        setNotification(dequeue());
    }, [notifications, notification]);

    return (
        <NotifyContext.Provider value={{ popup, progress, timed }}>
            <div className="fixed top-0 left-0 z-[60]">{notification}</div>
            {children}
        </NotifyContext.Provider>
    );
};

type Props = {
    done: () => void;
};
type PopupProps = Props & {
    notification: PopupNotification;
};
Notify.Popup = ({ done, notification }: PopupProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            done();
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return <Notification notification={notification} close={done} />;
};

type ProgressProps = Props & {
    notification: ProgressNotification;
};
Notify.Progress = ({ notification, done }: ProgressProps) => {
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        async function run() {
            for await (const value of notification.progress()) {
                setProgress(value);
            }
            done();
        }

        run();
    }, []);

    return (
        <div>
            <Notification notification={notification} />
            <span>
                <p>{progress}</p>
                <p>{notification.target}</p>
            </span>
        </div>
    );
};

type TimedProps = Props & {
    notification: TimedNotification;
};
Notify.Timed = ({ notification, done }: TimedProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            done();
        }, notification.duration);

        return () => clearTimeout(timer);
    }, []);

    return <Notification notification={notification} close={done} />;
};

type NotificationProps = {
    notification: BaseNotification;
    close?: () => void;
};
function Notification({ notification, close }: NotificationProps) {
    return (
        <>
            <div>
                <p>{notification.message}</p>
            </div>
            {close !== undefined ? <div onClick={close}>X</div> : <></>}
        </>
    );
}
