import { useState } from "react";
import FormInput from "../../components/FormInputWrapper/FormInput.tsx";
import { Link } from "react-router-dom";
import { emailPassVerificationServ } from "../../service/authService.ts";
import { useNotificationSystemContext } from "../../hooks/useContext.tsx";
import useLoginFetch from "../../fetcher/auth/useLoginFetch.ts";
import useTitle from "../../hooks/useTitle.tsx";

const Login = () => {
    const { enqueue } = useNotificationSystemContext();
    const [email, setEmail] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const { login } = useLoginFetch();
    const setTitle = useTitle();

    setTitle("Tiny Drive | Login");
    return (
        <div className="h-screen px-4 pt-10 space-y-36">
            <section className="space-y-4">
                <h1 className="text-3xl md:text-7xl font-bold text-purple-900">
                    Already a member? Just log in
                </h1>
                <section className="pl-5">
                    <p className="font-medium text-base md:text-xl">
                        So you're already part of Tiny Drive
                    </p>
                    <p className="font-medium text-base md:text-xl">
                        Just log in, you remember your password, right?
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
                        inputMaxLength={100}
                        inputMinLength={4}
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
                            Login
                        </button>
                        <div className="flex items-center flex-col">
                            <p>Not signed?</p>
                            <Link
                                to={"/register"}
                                className="text-blue-400 font-semibold"
                            >
                                Sign up
                            </Link>
                        </div>
                    </section>
                </form>
            </section>
        </div>
    );
};

export default Login;
