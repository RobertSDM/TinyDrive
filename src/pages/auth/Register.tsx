import { useState } from "react";
import FormInput from "../../components/FormInput.tsx";
import { Link } from "react-router-dom";

import { emailPassVerificationServ } from "../../service/authService.ts";
import { useNotificationSystemContext } from "../../hooks/useContext.tsx";
import useRegisterFetch from "../../fetcher/auth/useRegisterFetch.ts";

const Register = () => {
    const { enqueue } = useNotificationSystemContext();
    const { register } = useRegisterFetch();
    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const [confirmPass, setConfirmPass] = useState<string>("");

    return (
        <div className="h-screen px-4 pt-10 space-y-36">
            <section className="space-y-4">
                <h1 className="text-3xl md:text-7xl font-bold text-purple-900">
                    Registre-se
                </h1>
                <section className="pl-5">
                    <p className="font-medium text-base md:text-xl">
                        Se registre no melhor web app para salvar arquivos
                    </p>
                    <p className="font-medium text-base md:text-xl">
                        Um local simples rápido para salvar suas informações
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
                            type="submit"
                            className="px-4 py-2 w-full bg-purple-500 text-white font-semibold hover:bg-white hover:border hover:border-purple-500 hover:text-purple-500"
                        >
                            Registrar
                        </button>
                        <div className="flex items-center flex-col">
                            <div>
                                <p>Já é registrado?</p>
                                <Link
                                    to={"/login"}
                                    className="text-blue-400 font-semibold"
                                >
                                    Entrar
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
