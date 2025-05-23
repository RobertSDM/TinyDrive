import { EmailRegex } from "../constants/projectConfigVariables.ts";

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
