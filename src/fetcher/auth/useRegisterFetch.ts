import { useState } from "react";
import { useNotificationSystemContext } from "../../hooks/useContext.tsx";
import { NotificationLevels } from "../../types/enums.ts";
import { beAPI } from "../../utils/index.ts";
import { useNavigate } from "react-router-dom";

const useRegisterFetch = () => {
    const { enqueue } = useNotificationSystemContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    function register(email: string, password: string, user_name: string) {
        try {
            setIsLoading(true);
            beAPI
                .post(`/auth/register`, {
                    email,
                    password,
                    user_name,
                })
                .then((res) => {
                    if (res.status === 200) {
                        enqueue({
                            level: NotificationLevels.INFO,
                            msg: `Registred with success`,
                            title: "Register",
                        });
                        navigate("/login");
                    } else {
                        enqueue({
                            level: NotificationLevels.ERROR,
                            msg: res.data.msg,
                            title: "Register error",
                        });
                    }
                });
        } catch (err) {
            console.log(err);
            enqueue({
                level: NotificationLevels.ERROR,
                msg: "Error to connect to the server",
                title: "Register error",
            });
            setIsLoading(false);
        }
    }
    return { isLoading, register };
};

export default useRegisterFetch;
