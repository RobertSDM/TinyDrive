import { useState } from "react";

const FormInput = ({
    value,
    setValue,
    isPass = false,
    title,
    inputMaxSize = 20,
    inputMinSize = 8,
}: {
    value: string;
    setValue: (value: string) => void;
    isPass?: boolean;
    title: string;
    inputMaxSize?: number;
    inputMinSize?: number;
}) => {
    const [showPass, setShowPass] = useState<boolean>(false);

    return (
        <div>
            <p>{title}</p>
            <div className="flex items-center gap-x-2 border border-black/50 px-2 py-1">
                <input
                    className="outline-none flex-grow"
                    placeholder={title}
                    value={value}
                    onChange={(event) => {
                        setValue(event.target.value);
                    }}
                    type={isPass && !showPass ? "password" : "text"}
                    maxLength={inputMaxSize}
                    minLength={inputMinSize}
                    required
                />
                {isPass && (
                    <div onClick={() => setShowPass((prev) => !prev)}>
                        {showPass ? "X" : "O"}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FormInput;
