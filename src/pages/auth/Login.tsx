import { useState } from "react";
import FormInput from "../../components/FormInputWrapper/FormInput.tsx";
import { Link } from "react-router-dom";
import { useNotificationSystemContext } from "../../hooks/useContext.tsx";
import useLoginFetch from "../../fetcher/auth/useLoginFetch.ts";
import useTitle from "../../hooks/useTitle.tsx";
import { emailPassVerification } from "../../utils/valitation.ts";

const Login = () => {
    const { addNotif: enqueue } = useNotificationSystemContext();
    const [email, setEmail] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const { login, isLoading } = useLoginFetch();
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
            <section className="flex items-center flex-col">
                <form
                    className="w-96 space-y-5"
                    onSubmit={(event) => {
                        event.preventDefault();

                        setEmail((prev) => prev.trimEnd());

                        const isValid = emailPassVerification(email, enqueue);
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
                    <section className="">
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="px-4 py-2 w-full bg-purple-500 text-white font-semibold hover:bg-white hover:border hover:border-purple-500 hover:text-purple-500
                            
                            disabled:bg-slate-500 disabled:text-slate-300 disabled:hover:bg-slate-500 disabled:hover:border-slate-500 disabled:hover:text-slate-300
                            "
                        >
                            {isLoading ? "Loading..." : "Login"}
                        </button>
                    </section>
                </form>
                <div className="flex items-center flex-col mt-10">
                    <p>Not signed?</p>
                    <Link
                        to={"/register"}
                        className="text-blue-400 font-semibold"
                    >
                        Sign up
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Login;
