import { ReactNode, createContext, useEffect, useState } from "react";
import {
    BaseNotification,
    PopupNotification,
    ProgressNotification,
    TimedNotification,
} from "../types.ts";

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
            <div className="fixed bottom-0 right-0 z-[60]">{notification}</div>
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

    return (
        <div className="mr-10 mb-5 bg-white pt-1 rounded-sm border border-slate-400 shadow-md px-3">
            <Notification notification={notification} close={done} />
        </div>
    );
};

type ProgressProps = Props & {
    notification: ProgressNotification;
};
Notify.Progress = ({ notification, done }: ProgressProps) => {
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        async function run() {
            for await (const value of notification.progress()) {
                setProgress((value * 100) / notification.target);
            }
            done();
        }

        run();
    }, []);

    useEffect(() => {
        console.log(progress);
    }, [progress]);

    return (
        <div className="mr-10 mb-5 bg-white  pt-1 rounded-sm border border-slate-400 border-b-transparent shadow-md">
            <div className="px-3">
                <Notification notification={notification} />
            </div>
            <div
                style={{ width: `${progress}%` }}
                className="h-[3px] bg-purple-500"
            ></div>
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

    return (
        <div className="mr-10 mb-5 bg-white pt-1 rounded-sm border border-slate-400 shadow-md px-3">
            <Notification notification={notification} close={done} />
        </div>
    );
};

type NotificationProps = {
    notification: BaseNotification;
    close?: () => void;
};
function Notification({ notification, close }: NotificationProps) {
    return (
        <div className="flex gap-x-3 max-w-72 my-1 items-center">
            <p className="text-slate-800">{notification.message}</p>
            {close !== undefined ? (
                <div className="flex items-start">
                    <p
                        className="cursor-pointer  font-semibold text-lg px-1"
                        onClick={close}
                    >
                        x
                    </p>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
