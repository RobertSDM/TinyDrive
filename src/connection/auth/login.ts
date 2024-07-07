import { NotificationLevels } from "../../types/enums.ts";
import { INotification } from "../../types/types.js";
import { beAPI } from "../../utils/index.ts";

const login = async (
    enqueue: (Notification: INotification) => void,
    email: string,
    password: string
) => {
    const res = await beAPI.post(
        `/auth/login`,
        {
            email,
            password,
        },
        {
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:4500",
            },
            withCredentials: true,
        }
    );

    if (res.status === 200) {
        enqueue({
            level: NotificationLevels.INFO,
            msg: `logado com sucesso`,
            title: "Login",
        });
        return res.data;
    } else {
        enqueue({
            level: NotificationLevels.ERROR,
            msg: res.data.msg,
            title: "Erro ao logar",
        });
        return false;
    }
};

export default login;
