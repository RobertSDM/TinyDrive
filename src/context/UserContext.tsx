import { ReactElement, createContext, useRef, useState } from "react";
import { TStoredUser } from "../types/types.js";
type user = { id: string; userName: string; email: string };

type context = {
    isLogged: boolean;
    token: string;
    logUser: (user: user, token: string) => void;
    logoutUser: () => void;
    findUserToken: () => string | null;
    user: TStoredUser;
};

export const UserContext = createContext<context>({} as context);

export const UserProvider = ({ children }: { children: ReactElement }) => {
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const token = useRef<string>("");
    const storedUser = useRef<TStoredUser>({} as TStoredUser);

    function findUserToken() {
        const tokenL = document.cookie.split(";").filter((c) => {
            return c.trim().startsWith("c_token=");
        });
        if (tokenL.length > 0) {
            return tokenL["0"].split("=")[1];
        } else {
            return null;
        }
    }

    function save_token(token: string) {
        const dayToExpire = 1;
        const date = new Date();
        date.setTime(date.getTime() + dayToExpire * 24 * 60 * 60 * 1000);

        document.cookie = `c_token=${token};expires=${date.toUTCString()}`;
    }

    function save_user(user: user) {
        localStorage.setItem("user-info", JSON.stringify(user));
    }

    function exclude_user() {
        localStorage.removeItem("user-info");
    }

    function exclude_token() {
        const dayToExpire = 0;
        const date = new Date();
        date.setTime(dayToExpire * 24 * 60 * 60 * 1000);

        document.cookie = `c_token=; ${date.toUTCString()};`;
    }

    function logUser(
        user: { id: string; userName: string; email: string },
        res_token: string
    ) {
        save_token(res_token);
        save_user(user);
        storedUser.current = JSON.parse(localStorage.getItem("user-info")!);

        token.current = res_token;
        setIsLogged(true);
    }

    function logoutUser() {
        exclude_token();
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
                findUserToken,
                user: storedUser.current,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
