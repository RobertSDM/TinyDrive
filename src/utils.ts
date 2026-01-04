import { EmailRegex } from "./constants.ts";

export const cleanFileFolderName = (name: string) => {
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

export const passwordValidation = (
    email: string,
    pass?: string,
    confirmPass?: string
) => {
    if (pass && pass !== confirmPass) {
        return false;
    } else if (!EmailRegex.test(email)) {
        return false;
    }
    return true;
};

export const validateName = (newName: string, name?: string) => {
    if (name && newName === name) {
        return false;
    }

    return true;
};

export const sleep = (duration: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration * 1000);
    });
};
