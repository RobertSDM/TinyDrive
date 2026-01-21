import { NotificationData, NotifyLevel } from "@/types.ts";
import { Notification } from "./Notification.tsx";
import { useEffect } from "react";

type ProgressProps = {
    done: () => void;
    notification: NotificationData;
    progress: number;
};
export function Progress({ notification, progress, done }: ProgressProps) {
    useEffect(() => {
        if (progress >= 100) done();
    }, [progress]);

    return (
        <div
            className={`m-3 bg-purple-500 rounded-sm border border-white shadow-md px-3 inline-block ${
                notification.level === NotifyLevel.ERROR && "bg-red-500"
            } `}
        >
            <Notification notification={notification} close={done} />
            <div
                style={{ width: `${progress}%` }}
                className="h-[3px] bg-white"
            ></div>
        </div>
    );
}
