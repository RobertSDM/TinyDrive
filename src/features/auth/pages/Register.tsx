import { useNotify } from "@/shared/context/useContext.tsx";
import useTitle from "@/shared/hooks/useTitle.tsx";
import { NotifyLevel } from "@/shared/types/enums.ts";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/FormWrapper/AuthForm.tsx";
import useRegister from "../hooks/registerHooks.tsx";

const Register = () => {
    const notify = useNotify();
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const { request: register, isLoading } = useRegister();
    const [password, setPassword] = useState<string>("");
    const [confirmPass, setConfirmPass] = useState<string>("");

    const navigate = useNavigate();
    useTitle("Register | Tiny Drive");

    return (
        <div className="h-screen pt-10 px-10 space-y-36">
            <section className="space-y-2 ">
                <h1 className="text-3xl md:text-5xl font-semibold text-purple-900">
                    Register
                </h1>
                <p className="text-base md:text-xl">
                    Sign up today to a simple, secure and always on the go.
                </p>
            </section>
            <section className="flex items-center flex-col">
                <AuthForm
                    style="w-96 space-y-5 flex justify-center flex-col items-center"
                    onsubmit={(event) => {
                        event.preventDefault();

                        register({
                            email,
                            password,
                            username,
                        }).then(() => {
                            notify.popup({
                                level: NotifyLevel.info,
                                message:
                                    "You are now registred. To login verify your email",
                            });
                            navigate("/login");
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
                        title="Email"
                        maxLength={100}
                        minLength={4}
                    />
                    <AuthForm.PasswordInput
                        value={password}
                        setValue={setPassword}
                        title="Senha"
                    />
                    <AuthForm.PasswordInput
                        value={confirmPass}
                        setValue={setConfirmPass}
                        title="Confirmar Senha"
                    />

                    <section className="space-y-10 w-full text-center">
                        <AuthForm.Button
                            disabled={isLoading}
                            text={isLoading ? "Loading" : "Register"}
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
            </section>
        </div>
    );
};

export default Register;
