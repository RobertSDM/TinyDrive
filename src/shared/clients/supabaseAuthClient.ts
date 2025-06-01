import AuthClientInterface from "@/shared/interfaces/AuthClientInterface.ts";
import { AuthResult } from "@/shared/types/types.ts";
import { createClient } from "@supabase/supabase-js";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js";

export default class SupabaseAuthenticationClient
    implements AuthClientInterface
{
    private suauth: SupabaseAuthClient;

    constructor(url: string, key: string) {
        this.suauth = createClient(url, key).auth;
    }

    public async logInPassword(
        email: string,
        password: string
    ): Promise<AuthResult | null> {
        const resp = await this.suauth.signInWithPassword({
            email,
            password,
        });

        if (!resp.data.user) return null;

        return {
            accessToken: resp.data.session!.access_token,
            refreshToken: resp.data.session!.refresh_token,
            userid: resp.data.user!.id,
        };
    }

    public async getSession(): Promise<AuthResult> {
        const resp = await this.suauth.getSession();
        if (!resp.data.session) {
            throw new Error("no section found");
        }

        return {
            accessToken: resp.data.session!.access_token,
            refreshToken: resp.data.session!.refresh_token,
            userid: resp.data.session!.user!.id,
        };
    }

    public async logOut(): Promise<void> {
        await this.suauth.signOut();
    }
}
