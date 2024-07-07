import { useState } from "react";
import FormInput from "../../components/FormInput.tsx";
import { Link, useNavigate } from "react-router-dom";
import {
    useNotificationSystemContext,
    useUserContext,
} from "../../control/hooks/useContext.tsx";
import { loginServ } from "../../service/authService.ts";

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const { enqueue } = useNotificationSystemContext();
    const { logUser } = useUserContext();
    const navigate = useNavigate();

    return (
        <div className="h-screen px-4 pt-10 space-y-36">
            <section className="space-y-4">
                <h1 className="text-7xl font-bold text-purple-900">
                    Já faz parte? <br></br> Então só entrar
                </h1>
                <section className="pl-5">
                    <p className="font-medium text-xl">
                        Então você já faz parte do Tiny Drive
                    </p>
                    <p className="font-medium text-xl">
                        Só entrar, você lembra da senha, né?
                    </p>
                </section>
            </section>
            <section className="flex justify-center">
                <form
                    className="w-96 space-y-5"
                    onSubmit={async (event) => {
                        event.preventDefault();

                        const res = await loginServ(email, pass, enqueue);
                        if (res) {
                            logUser(res.data.user, res.token);
                            navigate("/");
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
