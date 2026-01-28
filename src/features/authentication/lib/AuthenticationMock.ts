import { sleep } from "@/utils/utils.ts";
import { AuthResult } from "../../../types.ts";
import { AuthenticationClientInterface } from "./SupabaseAuthentication.ts";

export default class MockAuthenticationClient
    implements AuthenticationClientInterface
{
    public async logIn(): // email: string,
    // password: string
    Promise<AuthResult | null> {
        await sleep(2);
        return new Promise((resolve) => {
            resolve({
                accessToken:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsInN1YiI6IjdkYzMzNGNjLWMxMDMtNGJkNC1iZGY0LWRmYzJhNzZmMmYyZCIsImlhdCI6MTc2ODc1NTY2MH0.uKjqUt8gm-C6J-g-BI-BdEAV_M-TaGe5UEbnt0GqMIQ",
                refreshToken: "",
                userid: "7dc334cc-c103-4bd4-bdf4-dfc2a76f2f2d",
            });
        });
    }

    public async getSession(): Promise<AuthResult> {
        return new Promise(async (resolve) => {
            await sleep(2);
            resolve({
                accessToken:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsInN1YiI6IjdkYzMzNGNjLWMxMDMtNGJkNC1iZGY0LWRmYzJhNzZmMmYyZCIsImlhdCI6MTc2ODc1NTY2MH0.uKjqUt8gm-C6J-g-BI-BdEAV_M-TaGe5UEbnt0GqMIQ",
                refreshToken: "",
                userid: "7dc334cc-c103-4bd4-bdf4-dfc2a76f2f2d",
            });
        });
    }

    public async logOut(): Promise<void> {
        return;
    }
}
