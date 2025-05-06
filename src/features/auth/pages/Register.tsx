import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInputWrapper/FormInput.tsx";
import { useNotificationSystemContext } from "@/shared/context/useContext.tsx";
import useTitle from "@/shared/hooks/useTitle.tsx";
import { emailPassVerification } from "@/shared/utils/valitation.ts";
import { NotificationLevels } from "@/shared/types/enums.ts";
import useMakeRequest from "@/shared/hooks/useMakeRequest.tsx";
import { registerConfig } from "../api/config.ts";
import { defaultClient } from "@/shared/api/clients.ts";

const Register = () => {
    const { addNotif } = useNotificationSystemContext();
    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const [confirmPass, setConfirmPass] = useState<string>("");
    const { makeRequest, isLoading, error } = useMakeRequest(
        registerConfig,
        defaultClient
    );
    const navigate = useNavigate();
    const setTitle = useTitle();

    useEffect(() => {
        if (error) {
            console.log(error);
        }
    }, [error]);

    useEffect(() => {
        setTitle("Register | Tiny Drive");
    }, []);

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
            <section className="flex justify-center">
                <form
                    className="w-96 space-y-5 flex justify-center flex-col items-center"
                    onSubmit={(event) => {
                        event.preventDefault();

                        const isValid = emailPassVerification(
                            email.trimEnd().toLowerCase(),
                            addNotif,
                            pass,
                            confirmPass
                        );

                        if (isValid) {
                            makeRequest({
                                email,
                                password: pass,
                                username: userName,
                            }).then((error) => {
                                if (!error) {
                                    addNotif({
                                        level: NotificationLevels.INFO,
                                        msg: `Registred with success`,
                                    });
                                    navigate("/login");
                                }
                            });
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

                    <section className="space-y-10 w-full text-center">
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
