import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthForm from "./components/AuthForm.tsx";
import { useRegisterHook } from "./hooks/authenticationHooks.tsx";
import { useNotifyContext } from "@/context/useContext.tsx";
import { NotifyLevel } from "@/types.ts";

const Register = () => {
    const notify = useNotifyContext();
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const { request: register, isRequesting } = useRegisterHook();
    const [password, setPassword] = useState<string>("");
    const [confirmPass, setConfirmPass] = useState<string>("");

    useEffect(() => {
        document.title = "Register | Tiny Drive";
    }, []);

    return (
        <div className="h-screen w-72 md:w-96 mx-auto items-center justify-center flex space-y-32 flex-col">
            <section className="flex gap-x-1">
                <p className="text-4xl font-bold text-purple-600">Tiny</p>
                <p className="text-4xl font-bold">Register</p>
            </section>
            <AuthForm
                style="w-full space-y-5 flex justify-center flex-col items-center"
                onsubmit={(event) => {
                    event.preventDefault();
                    if (email === "" || username === "") {
                        notify.popup({
                            level: NotifyLevel.ERROR,
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
                            level: NotifyLevel.ERROR,
                            message: "The email is not a valid email",
                        });
                        return;
                    }

                    register({
                        email,
                        password,
                        username,
                    });
                }}
            >
                <AuthForm.Input
                    value={username}
                    setValue={setUsername}
                    title="Nome Usuário"
                    minLength={4}
                />
                <AuthForm.Input
                    value={email}
                    setValue={setEmail}
                    email={true}
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
                <AuthForm.PasswordInput
                    value={confirmPass}
                    setValue={setConfirmPass}
                    title="Confirmar Senha"
                    minLength={8}
                />

                <section className="space-y-10 w-full text-center">
                    <AuthForm.Button
                        disabled={isRequesting}
                        text={isRequesting ? "Loading" : "Register"}
                    />
                </section>
                <div className="flex items-center flex-col">
                    <div className="text-center">
                        <p>Already Signed?</p>
                        <Link
                            to={"/login"}
                            className="text-blue-400 font-semibold"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </AuthForm>
        </div>
    );
};

export default Register;
