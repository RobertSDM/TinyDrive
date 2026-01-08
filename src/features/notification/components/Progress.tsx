import { NotificationData } from "@/types.ts";
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
        <div className="mr-10 mb-5 bg-white pt-1 rounded-sm border border-slate-400 border-b-transparent shadow-md w-full">
            <Notification notification={notification} close={done} />
            <div
                style={{ width: `${progress}%` }}
                className="h-[3px] bg-purple-500"
            ></div>
        </div>
    );
}
