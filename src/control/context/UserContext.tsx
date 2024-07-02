import { ReactElement, createContext, useState } from "react";
type user = { id: string; userName: string; email: string };

type context = {
    isLogged: boolean;
    logUser: (token: string, user: user) => void;
    logoutUser: () => void;
    findUserToken: () => string | null;
};

export const UserContext = createContext<context>({} as context);

export const UserProvider = ({ children }: { children: ReactElement }) => {
    const [isLogged, setIsLogged] = useState<boolean>(false);

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
        token: string,
        user: {
            id: string;
            userName: string;
            email: string;
        }
    ) {
        save_token(token);
        save_user(user);
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
                logUser,
                logoutUser,
                findUserToken,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
