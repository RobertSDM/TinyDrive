import { useState } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";

const FormInput = ({
    value,
    setValue,
    isPass = false,
    title,
    inputMaxLength = 20,
    inputMinLength = 8,
}: {
    value: string;
    setValue: (value: string) => void;
    isPass?: boolean;
    title: string;
    inputMaxLength?: number;
    inputMinLength?: number;
}) => {
    const [showPass, setShowPass] = useState<boolean>(false);

    return (
        <div>
            <p>{title}</p>
            <div className="flex items-center gap-x-2 border border-black/50 px-2 py-1">
                <input
                    className="outline-none flex-grow bg-transparent"
                    placeholder={title}
                    value={value}
                    onChange={(event) => {
                        setValue(event.target.value);
                    }}
                    type={isPass && !showPass ? "password" : "text"}
                    maxLength={inputMaxLength}
                    minLength={inputMinLength}
                    required
                />
                {isPass && (
                    <div onClick={() => setShowPass((prev) => !prev)} className="cursor-pointer">
                        {showPass ? <FaRegEyeSlash /> : <FaEye />}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FormInput;
