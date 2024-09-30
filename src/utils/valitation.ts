import { NotificationLevels } from "../types/enums.ts";
import { INotification } from "../types/types.js";
import { EMAIL_REGEX } from "./enviromentVariables.ts";

export const correctName = (name: string) => {
    name = name.replace(/[\/\\\0<>\?"'\*:\']/g, "");

    let whitespaceFound = false;
    let newName = "";
    for (let i of name) {
        if (i !== " ") {
            newName += i;
            whitespaceFound = false;
        } else if (!whitespaceFound) {
            newName += " ";
            whitespaceFound = true;
        }
    }
    return newName;
};

export const emailPassVerification = (
    email: string,
    enqueue: (notification: INotification) => void,
    pass?: string,
    confirmPass?: string
) => {
    if (pass && pass !== confirmPass) {
        enqueue({
            level: NotificationLevels.INFO,
            msg: "The pass and confirm pass don't match",
        });
        return false;
    } else if (!EMAIL_REGEX.test(email)) {
        enqueue({
            level: NotificationLevels.INFO,
            msg: "The email format is invalid",
        });
        return false;
    }
    return true;
};

export const validateName = (
    newName: string,
    enqueue: (notification: INotification) => void,
    name?: string
) => {
    if (name && newName === name) {
        enqueue({
            level: NotificationLevels.ERROR,
            msg: "The new name is the same as the old one",
        });
        return false;
    }

    return true;
};
