import login from "../connection/auth/login.ts";
import register from "../connection/auth/register.ts";
import { NotificationLevels } from "../types/enums.ts";
import { INotification } from "../types/types.js";

export const registerServ = async (
    email: string,
    user_name: string,
    pass: string,
    confirmPass: string,
    enqueue: (notification: INotification) => void
) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (pass !== confirmPass) {
        enqueue({
            level: NotificationLevels.INFO,
            msg: "The pass and confirm pass don't match",
            title: "Pass does't match",
        });
        return false;
    } else if (!emailRegex.test(email)) {
        enqueue({
            level: NotificationLevels.INFO,
            msg: "The email format is invalid",
            title: "Invalid email",
        });
        return false;
    } else {
        const res = await register(enqueue, email, pass, user_name);

        return !!res;
    }
};

export const loginServ = async (
    email: string,
    pass: string,
    enqueue: (notification: INotification) => void
) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        enqueue({
            level: NotificationLevels.INFO,
            msg: "The email format is invalid",
            title: "Invalid email",
        });
        return false;
    } else {
        const res = await login(enqueue, email, pass);

        if (res) {
            return res;
        }
        return false;
    }
};
