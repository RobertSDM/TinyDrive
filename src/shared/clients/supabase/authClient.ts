import { supabaseKey, supabaseUrl } from "@/shared/utils/globalVariables.ts";
import { AuthTokenResponsePassword, createClient } from "@supabase/supabase-js";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js";

class AuthClient {
    private suauth: SupabaseAuthClient;
    constructor(url: string, key: string) {
        this.suauth = createClient(url, key).auth;
    }

    public async logIn(
        email: string,
        password: string
    ): Promise<AuthTokenResponsePassword> {
        return await this.suauth.signInWithPassword({
            email,
            password,
        });
    }

    public async getSession() {
        return await this.suauth.getSession();
    }

    public async getUser() {
        return await this.suauth.getUser();
    }

    public async logOut() {
        return await this.suauth.signOut();
    }
}

export default new AuthClient(supabaseUrl, supabaseKey);
