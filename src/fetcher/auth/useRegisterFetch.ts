import { useState } from "react";
import { useNotificationSystemContext } from "../../hooks/useContext.tsx";
import { NotificationLevels } from "../../types/enums.ts";
import { beAPI } from "../../utils/enviromentVariables.ts";
import { useNavigate } from "react-router-dom";

const useRegisterFetch = () => {
    const { addNotif: enqueue } = useNotificationSystemContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    function register(email: string, password: string, user_name: string) {
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
                }
            })
            .catch((err) => {
                setIsLoading(false);
                if (err.response) {
                    enqueue({
                        level: NotificationLevels.ERROR,
                        msg: err.response.data.msg,
                        title: "Register error",
                    });
                } else {
                    enqueue({
                        level: NotificationLevels.ERROR,
                        msg: "Server error",
                        title: "Register error",
                    });
                }
            });
    }
    return { isLoading, register };
};

export default useRegisterFetch;
