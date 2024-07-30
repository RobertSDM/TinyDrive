import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    useNotificationSystemContext,
    useUserContext,
} from "../../hooks/useContext.tsx";
import { BACKEND_URL, beAPI } from "../../utils/index.ts";
import { NotificationLevels } from "../../types/enums.ts";

type responseLoginAPI = {
    data: {
        user: {
            id: string;
            userName: string;
            email: string;
        };
    };
    token: string;
};

const useLoginFetch = () => {
    const { enqueue } = useNotificationSystemContext();
    const data = useRef<responseLoginAPI>({} as responseLoginAPI);
    const { logUser } = useUserContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    function login(email: string, password: string) {
        setIsLoading(true);
        beAPI
            .post(
                `/auth/login`,
                {
                    email,
                    password,
                },
                {
                    headers: {
                        "Access-Control-Allow-Origin": BACKEND_URL,
                    },
                    withCredentials: true,
                }
            )
            .then((res) => {
                setIsLoading(false);
                if (res.status === 200) {
                    enqueue({
                        level: NotificationLevels.INFO,
                        msg: `logged with success`,
                        title: "Login",
                    });
                    data.current = res.data;
                }
                
                logUser(data.current.data.user, data.current.token);
                navigate("/");
                sessionStorage.removeItem("contCache");
            })
            .catch((err) => {
                if (err.response) {
                    enqueue({
                        level: NotificationLevels.ERROR,
                        msg: err.response.data.msg,
                        title: "Register error",
                    });
                }
                setIsLoading(false);
            });
    }

    return { isLoading, data, login };
};

export default useLoginFetch;
