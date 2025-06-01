import useRequest from "@/shared/hooks/useRequest.tsx";
import { RegisterConfig } from "../api/config.ts";
import { useNavigate } from "react-router-dom";
import { useNotify } from "@/shared/context/useContext.tsx";
import { NotifyLevel } from "@/shared/types/enums.ts";

export default function useRegisterHook() {
    const navigate = useNavigate();
    const notify = useNotify();

    const request = useRequest<void>(RegisterConfig(), (resp) => {
        notify.popup({
            level: NotifyLevel.info,
            message: "You are now registred. To login verify your email",
        });
        navigate("/login");

        return resp;
    });

    return { ...request };
}
