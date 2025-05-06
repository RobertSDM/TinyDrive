import { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useNotificationSystemContext } from "../../context/useContext.tsx";
import { NotificationLevels, NotificationTypes } from "../../types/enums.ts";

const Notifications = () => {
    const { removeNotif, currentOne } = useNotificationSystemContext();

    const [perc, setPerc] = useState<number>(100);
    const [time, setTime] = useState<number>(4000);
    const subAmount = 10;

    useEffect(() => {
        if (perc >= 0 && currentOne && currentOne.type !== "static") {
            const interval = setInterval(() => {
                const newTime = time - subAmount;
                const newPerc = (newTime * perc) / time;
                setPerc(newPerc);
                setTime(newTime);
                if (newPerc <= 0) {
                    removeNotif();
                    clearInterval(interval);
                    setPerc(100);
                    setTime(4000);
                    return;
                }
            }, subAmount);

            return () => clearInterval(interval);
        }
    }, [perc, currentOne]);

    return (
        <>
            {currentOne && (
                <div
                    className={`notification-base ${
                        currentOne.level === NotificationLevels.ERROR
                            ? "error-notifications"
                            : "info-notifications"
                    } ${
                        currentOne.type === NotificationTypes.STATIC
                            ? "notification-base-static"
                            : "notification-base-dynamic"
                    } space-y-2`}
                >
                    <div className="flex justify-between gap-x-5">
                        <div>
                            <span className={`text-white space-x-2`}>
                                {currentOne.special && (
                                    <span className="font-semibold">" "</span>
                                )}
                            </span>
                            <span className="text-white">
                                {" "}
                                {currentOne.msg}
                            </span>
                        </div>
                        <span
                            className={`text-white text-xl cursor-pointer`}
                            onClick={() => {
                                removeNotif();
                                setPerc(100);
                                setTime(4000);
                            }}
                        >
                            <MdOutlineClose
                                className={`font-bold min-h-1 min-w-1 cursor-pointer text-white`}
                            />
                        </span>
                    </div>
                    {currentOne.type !== "static" && (
                        <div
                            className={`border border-white`}
                            style={{
                                width: `${perc}%`,
                            }}
                        ></div>
                    )}
                </div>
            )}
        </>
    );
};

export default Notifications;
