import { NotificationData } from "@/types.ts";
import { useEffect, useRef } from "react";
import { Notification } from "./Notification.tsx";

type PopupProps = {
    done: () => void;
    notification: NotificationData;
};
export function Popup({ done, notification }: PopupProps) {
    const timer = useRef<NodeJS.Timeout>();

    useEffect(() => {
        clearTimeout(timer.current);
        timer.current = setTimeout(done, 5000);

        return () => clearTimeout(timer.current);
    }, [notification]);

    return (
        <div className="mr-10 mb-5 bg-white pt-1 rounded-sm border border-slate-400 shadow-md px-3">
            <Notification notification={notification} close={done} />
        </div>
    );
}
