import { NotificationData } from "@/types.ts";

type NotificationProps = {
    notification: NotificationData;
    close: () => void;
};
export function Notification({ notification, close }: NotificationProps) {
    return (
        <div className="flex gap-x-3 max-w-72 my-1 items-center justify-between">
            <p className="text-slate-800">{notification.message}</p>
            <div className="flex items-start">
                <p
                    className="cursor-pointer  font-semibold text-lg px-1"
                    onClick={close}
                >
                    x
                </p>
            </div>
        </div>
    );
}
