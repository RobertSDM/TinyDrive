import { useContext, useEffect, useState } from "react";
import { NotificationContext } from "../control/context/NotificationSystem.tsx";
import { INotification } from "../types/types.js";
// import { INotification } from "../types/index.js";

const InfoNotification = ({
    dequeue,
    notification,
}: {
    dequeue: () => void;
    notification: INotification;
}) => {
    const [perc, setPerc] = useState<number>(100);
    const [time, setTime]= useState<number>(notification.time);
    const _subamount = 1;

    useEffect(() => {
        if (perc >= 0) {
            const interval = setInterval(() => {
                const newTime = time - _subamount;
                const newPerc = (newTime * perc) / time;
                setPerc(newPerc);
                setTime(newTime);
                if (newPerc <= 0) {
                    dequeue();
                    clearInterval(interval);
                    return;
                }
            }, _subamount);

            return () => clearInterval(interval);
        }
    }, [perc]);

    return (
        <div className="bg-white shadow-lg shadow-purple-200 absolute bottom-10 left-10 rounded-md w-96 py-4 px-6">
            <div className="flex justify-between">
                <span className="text-purple-600 font-semibold text-lg">
                    {notification.title}
                </span>
                <span
                    className="text-purple-600 text-xl cursor-pointer"
                    onClick={() => dequeue()}
                >
                    x
                </span>
            </div>
            <div className="mb-3">
                <p className="text-purple-600">{notification.msg}</p>
            </div>
            <div
                className="border border-purple-500"
                style={{
                    width: `${perc}%`,
                }}
            ></div>
        </div>
    );
};

const ErrorNotification = ({
    dequeue,
    notification,
}: {
    dequeue: () => void;
    notification: INotification;
}) => {
    const [perc, setPerc] = useState<number>(100);
    const [time, setTime] = useState<number>(notification.time);
    const _subamount = 1;

    useEffect(() => {
        if (perc >= 0) {
            const interval = setInterval(() => {
                const newTime = time - _subamount;
                const newPerc = (newTime * perc) / time;
                setPerc(newPerc);
                setTime(newTime);
                if (newPerc <= 0) {
                    dequeue();
                    clearInterval(interval);
                    return;
                }
            }, _subamount);

            return () => clearInterval(interval);
        }
    }, [perc]);

    return (
        <div className="bg-red-500 shadow-lg shadow-red-100 absolute top-10 right-10 rounded-md w-96 py-4 px-6">
            <div className="flex justify-between">
                <span className="text-white font-semibold text-lg">
                    {notification.title}
                </span>
                <span
                    className="text-white text-xl cursor-pointer"
                    onClick={() => dequeue()}
                >
                    x
                </span>
            </div>
            <div className="mb-3">
                <p className="text-white">{notification.msg}</p>
            </div>
            <div
                className="border border-white"
                style={{
                    width: `${perc}%`,
                }}
            ></div>
        </div>
    );
};

// const DebugNotification = () => {
//     const [perc, setPerc] = useState<number>(352);

//     useEffect(() => {
//         if (perc > 0) {
//             const interval = setInterval(() => {
//                 setPerc((prev) => prev - 1);
//             }, 1);

//             return () => clearInterval(interval);
//         }
//     }, [perc]);

//     return (
//         <div className="bg-orange-500 shadow-lg shadow-red-100 absolute top-10 left-10 rounded-md w-96 p-4">
//             {/* Progress time */}
//             <div className="flex justify-between">
//                 <span className="text-white font-semibold text-lg">
//                     Situação
//                 </span>
//                 <span className="text-white text-xl">x</span>
//             </div>
//             <div className="mb-3">
//                 <p className="text-white">Arquivos salvos</p>
//             </div>
//             <div
//                 className="border border-white"
//                 style={{
//                     width: `${perc}px`,
//                 }}
//             ></div>
//         </div>
//     );
// };

const Notifications = () => {
    const { dequeue, currentOne } = useContext(NotificationContext);


    return (
        <>
            {currentOne &&
                (currentOne.level == "info" ? (
                    <InfoNotification
                        dequeue={dequeue}
                        notification={currentOne}
                    />
                ) : currentOne.level == "error" ? (
                    <ErrorNotification
                        dequeue={dequeue}
                        notification={currentOne}
                    />
                ) : null)}
        </>
    );
};

export default Notifications;
