import { AxiosError } from "axios";
import { GetAccountConfig } from "../api/requestConfig.ts";
import { useNotify } from "../context/useContext.tsx";
import { Account, SingleResponse } from "../types/types.ts";
import useRequest from "./useRequest.tsx";
import { NotifyLevel } from "../types/enums.ts";

export default function useGetAccount(userid: string, accessToken: string) {
    const notify = useNotify();

    const request = useRequest<SingleResponse<Account>>(
        GetAccountConfig(userid, accessToken),
        (resp) => resp.data,
        (err) => {
            if (!(err instanceof AxiosError)) return err;
            if (!err.response?.data) {
                return err;
            }

            notify.popup({
                level: NotifyLevel.info,
                message: err.response?.data.error!.message,
            });

            return err;
        }
    );

    return { ...request };
}
