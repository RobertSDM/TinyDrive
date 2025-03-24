import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { beAPI } from "../../../utils/enviromentVariables.ts";
import { useNotificationSystemContext } from "../../../context/useContext.tsx";
import { NotificationLevels } from "../../../types/enums.ts";

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
                    });
                } else {
                    enqueue({
                        level: NotificationLevels.ERROR,
                        msg: "Server error",
                    });
                }
            });
    }
    return { isLoading, register };
};

export default useRegisterFetch;
