import MockAuthenticationClient from "../clients/mockAuthenticationClient.ts";
import SupabaseAuthenticationClient from "../clients/supabaseAuthClient.ts";
import { Mode, SupabaseKey, SupabaseUrl } from "../constants/envVariables.ts";
import AuthClientInterface from "../interfaces/AuthClientInterface.ts";
import { ProjectMode } from "../types/enums.ts";

export default function getAuthClientInstance(): AuthClientInterface {
    if (Mode === ProjectMode.PROD) {
        return new SupabaseAuthenticationClient(SupabaseUrl, SupabaseKey);
    } else {
        return new MockAuthenticationClient();
    }
}
