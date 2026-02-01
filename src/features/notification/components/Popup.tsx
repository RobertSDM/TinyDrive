import { NotificationData, NotifyLevel } from "@/types.ts";
import { useEffect, useRef } from "react";
import { Notification } from "./Notification.tsx";

type PopupProps = {
    done: () => void;
    notification: NotificationData;
};
export function Popup({ done, notification }: PopupProps) {
    const timer = useRef<number>();

    useEffect(() => {
        clearTimeout(timer.current);
        timer.current = setTimeout(done, 5000);

        return () => clearTimeout(timer.current);
    }, [notification]);

    return (
        <div
            className={`m-3 bg-purple-500 rounded-sm border border-white shadow-md px-3 inline-block max-w-60 md:max-w-72 ${
                notification.level === NotifyLevel.ERROR && "bg-red-500"
            } `}
        >
            <Notification notification={notification} close={done} />
        </div>
    );
}
