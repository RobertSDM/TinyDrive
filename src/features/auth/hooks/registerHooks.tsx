import useRequest from "@/shared/hooks/useRequest.tsx";
import { registerConfig } from "../api/config.ts";

export default function useRegisterHook() {
    const request = useRequest<void>({
        ...registerConfig(),
    });

    return { ...request };
}
