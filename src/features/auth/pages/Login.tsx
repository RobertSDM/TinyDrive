import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuthContext } from "@/shared/context/useContext.tsx";
import useTitle from "@/shared/hooks/useTitle.tsx";
import AuthForm from "../components/FormWrapper/AuthForm.tsx";

const Login = () => {
    const { logInPassword, isLoading, account } = useAuthContext();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
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

                    await logInPassword(email, password);
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
