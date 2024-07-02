import { NotificationLevels } from "../../types/index.ts";
import { INotification } from "../../types/types.js";
import { beAPI } from "../../utils/index.ts";

const login = async (
    enqueue: (Notification: INotification) => void,
    email: string,
    password: string
) => {
    const res = await beAPI.post(`/auth/login`, {
        email,
        password,
    });

    if (res.status === 200) {
        enqueue({
            level: NotificationLevels.INFO,
            msg: `logado com sucesso`,
            title: "Login",
            time: 2000,
        });
        return res.data.data;
    } else {
        enqueue({
            level: NotificationLevels.ERROR,
            msg: res.data.msg,
            title: "Erro ao logar",
            time: 2000,
        });
        return false;
    }
};

export default login;
