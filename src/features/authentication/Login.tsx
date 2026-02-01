import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useNotifyContext } from "@/context/useContext.tsx";
import AuthForm from "./components/AuthForm.tsx";
import { NotifyLevel } from "@/types.ts";
import { useLogin } from "./hooks/authenticationHooks.tsx";

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const notify = useNotifyContext();

    const loginMut = useLogin();

    useEffect(() => {
        document.title = "Tiny Drive | Login";
    }, []);

    return (
        <div className="h-screen w-72 md:w-96 mx-auto md:items-center md:justify-center flex space-y-32 mt-10 md:mt-0 flex-col overflow-hidden">
            <section className="flex gap-x-1">
                <p className="text-4xl font-bold text-purple-600">Tiny</p>
                <p className="text-4xl font-bold">Login</p>
            </section>
            <AuthForm
                style="w-full space-y-5 flex justify-center flex-col items-center"
                onsubmit={(e) => {
                    e.preventDefault();

                    if (!!localStorage.getItem("access_")) {
                        notify({
                            level: NotifyLevel.ERROR,
                            message: "Você já está logado",
                            type: "popup",
                        });
                        return;
                    }

                    if (email === "") {
                        notify({
                            level: NotifyLevel.ERROR,
                            message: "Email não pode estar em branco",
                            type: "popup",
                        });
                        return;
                    }

                    loginMut.mutate({
                        email,
                        password,
                    });
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
                        disabled={loginMut.isPending}
                        text={"Entrar"}
                    />
                </section>
                <div className="flex items-center flex-col">
                    <p>Não está registrado?</p>
                    <Link
                        to={"/register"}
                        className="text-purple-500 font-medium"
                    >
                        Registrar
                    </Link>
                </div>
            </AuthForm>
        </div>
    );
};

export default Login;
