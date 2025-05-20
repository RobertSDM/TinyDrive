import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuthContext } from "@/shared/context/useContext.tsx";
import useTitle from "@/shared/hooks/useTitle.tsx";
import AuthForm from "../components/FormWrapper/AuthForm.tsx";

const Login = () => {
    const { logInPassword, isLoading } = useAuthContext();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    useTitle("Login | Tiny Drive");

    return (
        <div className="h-screen pt-10 px-10 mx-auto space-y-40">
            <section className="space-y-2">
                <h1 className="text-3xl md:text-5xl font-semibold text-purple-900">
                    Welcome Back
                </h1>
                <p className="text-base md:text-xl">
                    Just login to access your files anytime, anywhere.
                </p>
            </section>
            <section className="flex items-center flex-col">
                <AuthForm
                    style="w-96 space-y-5 flex justify-center flex-col items-center"
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
                            disabled={isLoading}
                            text={isLoading ? "Loading" : "Login"}
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
            </section>
        </div>
    );
};

export default Login;
