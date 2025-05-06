import { ReactElement, createContext, useRef, useState } from "react";
import { User } from "../types/index.ts";
import { TOKEN_NAME } from "../utils/globalVariables.ts";

type context = {
    isLogged: boolean;
    token: string;
    logUser: (user: User, token: string) => void;
    logoutUser: () => void;
    getAuthToken: () => string | null;
    user: User;
};

export const UserContext = createContext<context>({} as context);

export const UserProvider = ({ children }: { children: ReactElement }) => {
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const token = useRef<string>("");
    const storedUser = useRef<User>({} as User);

    function getAuthToken() {
        const tokenCookie = document.cookie.split(";").filter((c) => {
            return c.trim().startsWith(`${TOKEN_NAME}=`);
        });

        if (tokenCookie.length > 0) {
            return tokenCookie[0].split("=")[1];
        } else {
            return null;
        }
    }

    function storeToken(token: string) {
        deleteToken();
        const dayToExpire = 14;
        const date = new Date();
        date.setTime(date.getTime() + dayToExpire * 24 * 60 * 60 * 1000);
        document.cookie = `${TOKEN_NAME}=${token};expires=${date.toUTCString()}`;
    }

    function saveUser(user: User) {
        localStorage.setItem("user-info", JSON.stringify(user));
    }

    function exclude_user() {
        localStorage.removeItem("user-info");
    }

    function deleteToken() {
        const dayToExpire = 0;
        const date = new Date();
        date.setTime(dayToExpire);

        document.cookie = `${TOKEN_NAME}=; ${date.toUTCString()};`;
    }

    function logUser(user: User, res_token: string) {
        storeToken(res_token);
        saveUser(user);
        storedUser.current = JSON.parse(
            localStorage.getItem("user-info") || ""
        );

        token.current = res_token;
        setIsLogged(true);
    }

    function logoutUser() {
        deleteToken();
        exclude_user();
        setIsLogged(false);
    }

    return (
        <UserContext.Provider
            value={{
                isLogged,
                token: token.current,
                logUser,
                logoutUser,
                getAuthToken,
                user: storedUser.current,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
