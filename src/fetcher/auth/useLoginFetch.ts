import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotificationSystemContext, useUserContext } from "../../hooks/useContext.tsx";
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
        try {
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
                            msg: `logado com sucesso`,
                            title: "Login",
                        });
                        data.current = res.data;
                    } else {
                        enqueue({
                            level: NotificationLevels.ERROR,
                            msg: res.data.msg,
                            title: "Login",
                        });
                    }

                    logUser(data.current.data.user, data.current.token);
                    navigate("/");
                    sessionStorage.removeItem("contCache")
                });
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    }

    return { isLoading, data, login };
};

export default useLoginFetch;
