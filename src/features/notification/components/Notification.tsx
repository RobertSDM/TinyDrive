import { NotificationData } from "@/types.ts";
import { IoClose } from "react-icons/io5";
type NotificationProps = {
    notification: NotificationData;
    close: () => void;
};
export function Notification({ notification, close }: NotificationProps) {
    return (
        <div className="flex max-w-72 p-1 items-start justify-between">
            <p className="text-white">{notification.message}</p>
            <div className="flex items-start">
                <p
                    className="cursor-pointer font-semibold text-lg px-1 text-white"
                    onClick={close}
                >
                    <IoClose />
                </p>
            </div>
        </div>
    );
}
