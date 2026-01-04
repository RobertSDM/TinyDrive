import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext, NotifyContext } from "@/context/useContext.tsx";
import useTitle from "@/hooks/useTitle.tsx";
import AuthForm from "./components/AuthForm.tsx";
import { NotifyLevel } from "@/types.ts";

const Login = () => {
    const { logInPassword, isLoading, account } = AuthContext();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const notify = NotifyContext();
    const navigate = useNavigate();

    useTitle("Login | Tiny Drive");

    return (
        <div className="h-screen w-72 md:w-96 mx-auto items-center justify-center flex space-y-32 flex-col">
            <section className="flex gap-x-1">
                <p className="text-4xl font-bold text-purple-600">Tiny</p>
                <p className="text-4xl font-bold">Login</p>
            </section>
            <AuthForm
                style="w-full space-y-5 flex justify-center flex-col items-center"
                onsubmit={async (event) => {
                    event.preventDefault();

                    if (email === "") {
                        notify.popup({
                            level: NotifyLevel.error,
                            message: "Cannot send blank inputs",
                        });
                        return;
                    }

                    if (
                        !RegExp(
                            "^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$"
                        ).test(email)
                    ) {
                        notify.popup({
                            level: NotifyLevel.error,
                            message: "The email is not a valid email",
                        });
                        return;
                    }

                    const success = await logInPassword(email, password);
                    if (!success) {
                        notify.popup({
                            level: NotifyLevel.error,
                            message: "Email or password are wrong",
                        });
                        return;
                    }
                    navigate("/drive");
                }}
            >
                <AuthForm.Input
                    value={email}
                    setValue={(email: string) => {
                        setEmail(email.trimEnd().toLowerCase());
                    }}
                    title="Email"
                    maxLength={100}
                    minLength={4}
                />
                <AuthForm.PasswordInput
                    value={password}
                    setValue={setPassword}
                    title="Senha"
                    minLength={8}
                />
                <section className="space-y-10 w-full">
                    <AuthForm.Button
                        disabled={isLoading && !!account}
                        text={isLoading && !!account ? "Loading" : "Login"}
                    />
                </section>
                <div className="flex items-center flex-col">
                    <p>Not signed?</p>
                    <Link
                        to={"/register"}
                        className="text-blue-400 font-semibold"
                    >
                        Sign up
                    </Link>
                </div>
            </AuthForm>
        </div>
    );
};

export default Login;
