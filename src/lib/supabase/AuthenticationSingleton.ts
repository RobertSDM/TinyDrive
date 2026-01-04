import {
    AuthClientInterface,
    SupabaseAuthenticationClient,
} from "@/lib/supabase/SupabaseAuthentication.ts";
import { Mode, SupabaseKey, SupabaseURL } from "../../constants.ts";
import { ProjectMode } from "@/types.ts";
import MockAuthenticationClient from "@/lib/supabase/AuthenticationMock.ts";

export default class AuthClientSingleton {
    private static instance: AuthClientInterface | null = null;

    public static getInstance(): AuthClientInterface {
        if (!AuthClientSingleton.instance) {
            if (Mode === ProjectMode.PROD) {
                AuthClientSingleton.instance = new SupabaseAuthenticationClient(
                    SupabaseURL,
                    SupabaseKey
                );
            } else {
                AuthClientSingleton.instance = new MockAuthenticationClient();
            }
        }

        return AuthClientSingleton.instance;
    }
}
