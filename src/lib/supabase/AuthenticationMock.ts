import { sleep } from "@/utils.ts";
import { AuthResult } from "../../types.ts";
import { AuthClientInterface } from "./SupabaseAuthentication.ts";

export default class MockAuthenticationClient implements AuthClientInterface {
    public async logInPassword(): Promise<AuthResult | null> {
        await sleep(2);
        return new Promise((resolve) => {
            resolve({
                accessToken:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzYWNkNDBhNi1mMzg0LTRlMzQtOGY5NS00NzZhMGRlYzkxYTYifQ.lvOE26ibRYbZ7NW612e1LHQdgNl14GTy91CE4rcBjTc",
                refreshToken: "",
                userid: "3acd40a6-f384-4e34-8f95-476a0dec91a6",
            });
        });
    }

    public async getSession(): Promise<AuthResult> {
        await sleep(2);
        return new Promise((resolve) => {
            resolve({
                accessToken:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzYWNkNDBhNi1mMzg0LTRlMzQtOGY5NS00NzZhMGRlYzkxYTYifQ.lvOE26ibRYbZ7NW612e1LHQdgNl14GTy91CE4rcBjTc",
                refreshToken: "",
                userid: "3acd40a6-f384-4e34-8f95-476a0dec91a6",
            });
        });
    }

    public async logOut(): Promise<void> {
        return;
    }
}
