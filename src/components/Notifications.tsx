import { useContext, useEffect, useState } from "react";
import { NotificationContext } from "../context/NotificationSystem.tsx";
import { NotificationLevels } from "../types/enums.ts";
import { addThreePoints } from "../control/dataConvert.ts";

const Notifications = () => {
    const { dequeue, currentOne } = useContext(NotificationContext);

    const [perc, setPerc] = useState<number>(100);
    const [time, setTime] = useState<number>(4000);
    const subAmount = 10;

    useEffect(() => {
        if (perc >= 0 && currentOne) {
            const interval = setInterval(() => {
                const newTime = time - subAmount;
                const newPerc = (newTime * perc) / time;
                setPerc(newPerc);
                setTime(newTime);
                if (newPerc <= 0) {
                    dequeue();
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
                    className={`${
                        currentOne.level === NotificationLevels.ERROR
                            ? "error-notifications"
                            : "info-notifications"
                    }`}
                >
                    <div className="flex justify-between">
                        <span
                            className={`${
                                currentOne.level === NotificationLevels.ERROR
                                    ? "text-white"
                                    : "text-purple-500"
                            } font-bold text-lg`}
                        >
                            {currentOne.title}
                        </span>
                        <span
                            className={`${
                                currentOne.level === NotificationLevels.ERROR
                                    ? "text-white"
                                    : "text-purple-500"
                            } text-xl cursor-pointer`}
                            onClick={() => {
                                dequeue();
                                setPerc(100);
                                setTime(4000);
                            }}
                        >
                            x
                        </span>
                    </div>
                    <div className="mb-3">
                        <p
                            className={`${
                                currentOne.level === NotificationLevels.ERROR
                                    ? "text-white"
                                    : "text-purple-500"
                            }`}
                        >
                            {currentOne.special ? (
                                <>
                                    <span className="font-semibold">
                                        "
                                        {addThreePoints(currentOne.special, 30)}
                                        "
                                    </span>
                                    <span>{" "}{currentOne.msg}</span>
                                </>
                            ) : (
                                currentOne.msg
                            )}
                        </p>
                    </div>
                    <div
                        className={`border ${
                            currentOne.level === NotificationLevels.ERROR
                                ? "border-white"
                                : "border-purple-500"
                        }`}
                        style={{
                            width: `${perc}%`,
                        }}
                    ></div>
                </div>
            )}
        </>
    );
};

export default Notifications;
