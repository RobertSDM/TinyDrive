import { NotificationLevels } from "../types/enums.ts";
import { INotification } from "../types/types.js";

const verifyInvalidCharactersInName = (name: string): boolean => {
    return /^(?!.*[\\/:\*\?"<>|])[^\\./\0].*[^ .]$/.test(name);
};

const validateName = (
    name: string,
    newName: string,
    enqueue: (notification: INotification) => void
) => {
    if (newName === name) {
        enqueue({
            level: NotificationLevels.ERROR,
            msg: "The new name is the same as the old one",
            title: "Invalid name",
        });
        return false;
    } else if (newName === "") {
        enqueue({
            level: NotificationLevels.ERROR,
            msg: "The new name can't be blank",
            title: "Invalid name",
        });

        return false;
    }

    if (!verifyInvalidCharactersInName(newName)) {
        enqueue({
            level: NotificationLevels.ERROR,
            msg: 'The name can\'t contain any of the following characters:"/, :, *, ?, ", <, >, |, \\0, ", \\',
            title: "Invalid name",
        });
        return false;
    }

    return true;
};

export { validateName };
