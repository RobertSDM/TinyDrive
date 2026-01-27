import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthForm from "./components/AuthForm.tsx";
import { useNotifyContext } from "@/context/useContext.tsx";
import { NotifyLevel } from "@/types.ts";
import { useRegister } from "./hooks/authenticationHooks.tsx";

const Register = () => {
    const notify = useNotifyContext();

    const registerMut = useRegister();

    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPass, setConfirmPass] = useState<string>("");

    useEffect(() => {
        document.title = "Tiny Drive | Register";
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
                        notify({
                            level: NotifyLevel.ERROR,
                            message:
                                "Todos os campos precisam estar preenchidos",
                            type: "popup",
                        });
                        return;
                    }

                    registerMut.mutate({
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
                        disabled={registerMut.isPending}
                        text={"Registrar"}
                    />
                </section>
                <div className="flex items-center flex-col">
                    <div className="text-center">
                        <p>Já está registrado?</p>
                        <Link
                            to={"/login"}
                            className="text-purple-500 font-medium"
                        >
                            Entrar
                        </Link>
                    </div>
                </div>
            </AuthForm>
        </div>
    );
};

export default Register;
