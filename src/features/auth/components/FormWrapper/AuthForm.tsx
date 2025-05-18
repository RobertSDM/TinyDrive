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
        <div className="w-full">
            <label htmlFor={`form-inp_${title.toLowerCase()}`}>{title}</label>
            <div className="flex items-center gap-x-2 border border-black/50 px-2 py-1 w-full">
                <input
                    id={`form-inp_${title.toLowerCase()}`}
                    className="outline-none flex-grow bg-transparent "
                    placeholder={title}
                    value={value}
                    onChange={(event) => {
                        setValue(event.target.value);
                    }}
                    type={showPass ? "text" : "password"}
                    maxLength={maxLength}
                    minLength={minLength}
                    required
                />
                <div
                    onClick={() => setShowPass((prev) => !prev)}
                    className="cursor-pointer"
                >
                    {showPass ? <FaRegEyeSlash /> : <FaEye />}
                </div>
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
};
AuthForm.Input = ({
    setValue,
    value,
    title,
    maxLength,
    minLength,
    required,
}: InputProps) => {
    return (
        <div className="w-full">
            <label htmlFor={`form-inp_${title.toLowerCase}`}>{title}</label>
            <div className="flex items-center gap-x-2 border border-black/50 px-2 py-1 w-full">
                <input
                    id={`form-inp_${title.toLowerCase}`}
                    className="outline-none flex-grow bg-transparent "
                    placeholder={title}
                    value={value}
                    onChange={(event) => {
                        setValue(event.target.value);
                    }}
                    type={"text"}
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
            className="px-4 py-2 w-full bg-purple-500 text-white font-semibold hover:bg-white hover:border hover:border-purple-500 hover:text-purple-500

                disabled:bg-slate-500 disabled:text-slate-300 disabled:hover:bg-slate-500 disabled:hover:border-slate-500 disabled:hover:text-slate-300"
        >
            {text}
        </button>
    );
};
