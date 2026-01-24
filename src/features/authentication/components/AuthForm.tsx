import { createContext, ReactElement, useState } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";

const FormContext = createContext<Object>({});

type AuthFormProps = {
    children: ReactElement[];
    onsubmit: (event: any) => void;
    style?: string;
};
export default function AuthForm({ children, style, onsubmit }: AuthFormProps) {
    return (
        <FormContext.Provider value={{}}>
            <form className={`${style}`} onSubmit={onsubmit}>
                {children}
            </form>
        </FormContext.Provider>
    );
}

type PasswordInputProps = {
    title: string;
    value: string;
    setValue: (value: string) => void;
    maxLength?: number;
    minLength?: number;
};
AuthForm.PasswordInput = ({
    setValue,
    value,
    title,
    maxLength,
    minLength,
}: PasswordInputProps) => {
    const [showPass, setShowPass] = useState<boolean>(false);

    return (
        <div className="w-full flex flex-col">
            <label
                htmlFor={`form-inp_${title.toLowerCase()}`}
                className="text-slate-800 font-semibold"
            >
                {title}
            </label>
            <div className="flex items-center p-2 bg-slate-100 gap-x-2 rounded-sm">
                <input
                    id={`form-inp_${title.toLowerCase()}`}
                    className="outline-none bg-transparent w-full"
                    value={value}
                    onChange={(event) => {
                        setValue(event.target.value);
                    }}
                    type={showPass ? "text" : "password"}
                    maxLength={maxLength}
                    minLength={minLength}
                    required
                />
                <span
                    onClick={() => setShowPass((prev) => !prev)}
                    className="cursor-pointer"
                >
                    {showPass ? <FaRegEyeSlash /> : <FaEye />}
                </span>
            </div>
        </div>
    );
};

type InputProps = {
    title: string;
    value: string;
    setValue: (value: string) => void;
    maxLength?: number;
    minLength?: number;
    required?: boolean;
    email?: boolean;
};

AuthForm.Input = ({
    setValue,
    value,
    title,
    maxLength,
    minLength,
    required,
    email,
}: InputProps) => {
    return (
        <div className="w-full">
            <label
                htmlFor={`form-inp_${title.toLowerCase}`}
                className="text-slate-800 font-semibold"
            >
                {title}
            </label>
            <div className="flex items-center gap-x-2 bg-slate-100 p-2 w-full rounded-sm">
                <input
                    id={`form-inp_${title.toLowerCase}`}
                    className="outline-none flex-grow bg-transparent "
                    value={value}
                    onChange={(event) => {
                        setValue(event.target.value);
                    }}
                    type={email ? "email" : "text"}
                    maxLength={maxLength}
                    minLength={minLength}
                    required={required}
                />
            </div>
        </div>
    );
};

type ButtonProps = {
    disabled?: boolean;
    text: string;
};
AuthForm.Button = ({ disabled, text }: ButtonProps) => {
    return (
        <button
            disabled={disabled}
            type="submit"
            className="px-4 py-2 w-full bg-purple-500 text-white font-semibold hover:bg-purple-700

            disabled:bg-slate-500 disabled:text-white"
        >
            {text}
        </button>
    );
};
