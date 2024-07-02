import { NotificationLevels } from "../../types/index.ts";
import { INotification } from "../../types/types.js";
import { beAPI } from "../../utils/index.ts";

const register = async (
    enqueue: (Notification: INotification) => void,
    email: string,
    password: string,
    user_name: string
) => {
    try {
        const res = await beAPI.post(`/auth/register`, {
            email,
            password,
            user_name,
        });

        if (res.status === 200) {
            enqueue({
                level: NotificationLevels.INFO,
                msg: `"${res.data.name}" deletado com sucesso`,
                title: "Deletado",
                time: 2000,
            });
            return true;
        } else {
            enqueue({
                level: NotificationLevels.ERROR,
                msg: res.data.msg,
                title: "Erro ao registrar",
                time: 2000,
            });
            return false;
        }
    } catch (err) {
        console.log(err);
        enqueue({
            level: NotificationLevels.ERROR,
            msg: "Error to connect to the server",
            title: "Erro ao registrar",
            time: 2000,
        });

        return false;
    }
};

export default register;
