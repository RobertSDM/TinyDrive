import { NotificationLevels } from "../types/enums.ts";
import { INotification } from "../types/types.js";
import { EMAIL_REGEX } from "../utils/enviromentVariables.ts";

export const emailPassVerificationServ = (
    email: string,
    enqueue: (notification: INotification) => void,
    pass?: string,
    confirmPass?: string
) => {
    if (pass && pass !== confirmPass) {
        enqueue({
            level: NotificationLevels.INFO,
            msg: "The pass and confirm pass don't match",
            title: "Pass does't match",
        });
        return false;
    } else if (!EMAIL_REGEX.test(email)) {
        enqueue({
            level: NotificationLevels.INFO,
            msg: "The email format is invalid",
            title: "Invalid email",
        });
        return false;
    }
    return true;
};
