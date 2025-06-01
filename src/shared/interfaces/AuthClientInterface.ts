import { AuthResult } from "../types/types.ts";

export default interface AuthClientInterface {
    logInPassword: (
        email: string,
        password: string
    ) => Promise<AuthResult | null>;
    getSession: () => Promise<AuthResult>;
    logOut: () => Promise<void>;
}
