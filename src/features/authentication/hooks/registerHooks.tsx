import { useRequest } from "@/hooks/useRequest.tsx";
import { useNavigate } from "react-router-dom";
import { NotifyContext } from "@/context/useContext.tsx";
import { NotifyLevel } from "@/types.ts";

export default function useRegisterHook() {
    const navigate = useNavigate();
    const notify = NotifyContext();

    const request = useRequest<void>(
        { path: "/auth/register", method: HTTPMethods.POST },
        (resp) => {
            notify.popup({
                level: NotifyLevel.info,
                message: "You are now registred. To login verify your email",
            });
            navigate("/login");

            return resp;
        }
    );

    return { ...request };
}
