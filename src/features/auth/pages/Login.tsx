import {
    useNotificationSystemContext,
    useUserContext,
} from "@/shared/context/useContext.tsx";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { DefaultClient } from "@/shared/api/clients.ts";
import useFetcher from "@/shared/hooks/useRequest.tsx";
import useTitle from "@/shared/hooks/useTitle.tsx";
import { AuthResponse } from "@/shared/types/index.ts";
import { loginConfig } from "../api/config.ts";
import AuthForm from "../components/FormWrapper/AuthForm.tsx";
import { emailPassVerification } from "@/shared/utils/valitation.ts";

const Login = () => {
    const { addNotif } = useNotificationSystemContext();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { request, data, isLoading } = useFetcher<AuthResponse>(
        {
            ...loginConfig(),
            body: { email, password },
        },
        DefaultClient
    );

    const setTitle = useTitle();
    const { userLogin } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!data || !data.success) return;

        userLogin(data.data!, data.token);
        navigate("/drive");
        sessionStorage.removeItem("contCache");
    }, [data]);

    useEffect(() => {
        setTitle("Login | Tiny Drive");
    }, []);

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
                    onsubmit={(event) => {
                        event.preventDefault();

                        setEmail((prev) => prev.trimEnd().toLowerCase());

                        const isValid = emailPassVerification(email, addNotif);
                        if (isValid) {
                            request();
                        }
                    }}
                >
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
                    <section className="space-y-10 w-full">
                        {/* <button
                            disabled={isLoading}
                            type="submit"
                            className="px-4 py-2 w-full bg-purple-500 text-white font-semibold hover:bg-white hover:border hover:border-purple-500 hover:text-purple-500
                            
                            disabled:bg-slate-500 disabled:text-slate-300 disabled:hover:bg-slate-500 disabled:hover:border-slate-500 disabled:hover:text-slate-300
                            "
                        >
                            {isLoading ? "Loading..." : "Login"}
                        </button> */}
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
