import { useState } from "react";
import FormInput from "../../components/FormInputWrapper/FormInput.tsx";
import { Link } from "react-router-dom";

import { emailPassVerificationServ } from "../../service/authService.ts";
import { useNotificationSystemContext } from "../../hooks/useContext.tsx";
import useRegisterFetch from "../../fetcher/auth/useRegisterFetch.ts";
import useTitle from "../../hooks/useTitle.tsx";

const Register = () => {
    const { enqueue } = useNotificationSystemContext();
    const { register, isLoading } = useRegisterFetch();
    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const [confirmPass, setConfirmPass] = useState<string>("");
    const setTitle = useTitle();

    setTitle("Tiny Drive | Sign-up");
    return (
        <div className="h-screen px-4 pt-10 space-y-36">
            <section className="space-y-4">
                <h1 className="text-3xl md:text-7xl font-bold text-purple-900">
                    Sign up
                </h1>
                <section className="pl-5">
                    <p className="font-medium text-base md:text-xl">
                        Sign up for the best web app to save files
                    </p>
                    <p className="font-medium text-base md:text-xl">
                        "A simple and fast place to save your information
                    </p>
                </section>
            </section>
            <section className="flex justify-center">
                <form
                    className="w-96 space-y-5"
                    onSubmit={async (event) => {
                        event.preventDefault();

                        const isValid = emailPassVerificationServ(
                            email,
                            enqueue,
                            pass,
                            confirmPass
                        );

                        if (isValid) {
                            register(email, pass, userName);
                        }
                    }}
                >
                    <FormInput
                        value={userName}
                        setValue={setUserName}
                        title="Nome Usuário"
                        inputMinLength={4}
                    />
                    <FormInput
                        value={email}
                        setValue={setEmail}
                        title="Email"
                        inputMaxLength={100}
                        inputMinLength={4}
                    />
                    <FormInput
                        value={pass}
                        setValue={setPass}
                        title="Senha"
                        isPass={true}
                    />
                    <FormInput
                        value={confirmPass}
                        setValue={setConfirmPass}
                        title="Confirmar Senha"
                        isPass={true}
                    />

                    <section className="space-y-10">
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="px-4 py-2 w-full bg-purple-500 text-white font-semibold hover:bg-white hover:border hover:border-purple-500 hover:text-purple-500
                            
                            disabled:bg-slate-500 disabled:text-slate-300 disabled:hover:bg-slate-500 disabled:hover:border-transparent disabled:hover:text-slate-300
                            "
                        >
                            {isLoading ? "Loading..." : "Register"}
                        </button>
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
                    </section>
                </form>
            </section>
        </div>
    );
};

export default Register;
