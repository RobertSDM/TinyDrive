import MockAuthenticationClient from "../clients/mockAuthenticationClient.ts";
import SupabaseAuthenticationClient from "../clients/supabaseAuthClient.ts";
import { Mode, SupabaseKey, SupabaseUrl } from "../constants/envVariables.ts";
import AuthClientInterface from "../interfaces/AuthClientInterface.ts";
import { ProjectMode } from "../types/enums.ts";

export default class AuthClientSingleton {
    private static instance: AuthClientInterface | null = null;

    public static getInstance(): AuthClientInterface {
        if (!AuthClientSingleton.instance) {
            if (Mode === ProjectMode.PROD) {
                AuthClientSingleton.instance = new SupabaseAuthenticationClient(
                    SupabaseUrl,
                    SupabaseKey
                );
            } else {
                AuthClientSingleton.instance = new MockAuthenticationClient();
            }
        }

        return AuthClientSingleton.instance;
    }
}
