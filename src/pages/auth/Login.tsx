import { useState } from "react";
import FormInput from "../../components/FormInput.tsx";
import { Link } from "react-router-dom";
import { emailPassVerificationServ } from "../../service/authService.ts";
import { useNotificationSystemContext } from "../../hooks/useContext.tsx";
import useLoginFetch from "../../fetcher/auth/useLoginFetch.ts";

const Login = () => {
    const { enqueue } = useNotificationSystemContext();
    const [email, setEmail] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const { login } = useLoginFetch();

    return (
        <div className="h-screen px-4 pt-10 space-y-36">
            <section className="space-y-4">
                <h1 className="text-3xl md:text-7xl font-bold text-purple-900">
                    Já faz parte? <br></br> Então só entrar
                </h1>
                <section className="pl-5">
                    <p className="font-medium text-base md:text-xl">
                        Então você já faz parte do Tiny Drive
                    </p>
                    <p className="font-medium text-base md:text-xl">
                        Só entrar, você lembra da senha, né?
                    </p>
                </section>
            </section>
            <section className="flex justify-center">
                <form
                    className="w-96 space-y-5"
                    onSubmit={(event) => {
                        event.preventDefault();

                        const isValid = emailPassVerificationServ(
                            email,
                            enqueue
                        );
                        if (isValid) {
                            login(email, pass);
                        }
                    }}
                >
                    <FormInput
                        value={email}
                        setValue={setEmail}
                        title="Email"
                    />
                    <FormInput
                        value={pass}
                        setValue={setPass}
                        title="Senha"
                        isPass={true}
                    />
                    <section className="space-y-10">
                        <button
                            type="submit"
                            className="px-4 py-2 w-full bg-purple-500 text-white font-semibold hover:bg-white hover:border hover:border-purple-500 hover:text-purple-500"
                        >
                            Entrar
                        </button>
                        <div className="flex items-center flex-col">
                            <p>Não é registrado?</p>
                            <Link to={"/register"} className="text-blue-400">
                                Registre-se
                            </Link>
                        </div>
                    </section>
                </form>
            </section>
        </div>
    );
};

export default Login;
