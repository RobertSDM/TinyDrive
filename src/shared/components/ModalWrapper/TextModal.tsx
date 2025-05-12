import { useEffect, useRef, useState } from "react";

const TextModal = ({
    callback,
    isOpen,
    close,
    title = "Enter a text",
}: {
    callback: (text: string) => void;
    isOpen: boolean;
    close: () => void;
    title?: string;
}) => {
    const [text, setText] = useState<string>("");
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        inputRef.current!.focus();
        inputRef.current!.select();
    }, [isOpen]);

    function confirm() {
        close();
        callback(text);
    }

    function cancel() {
        close();
    }

    return (
        <div
            className={`w-full h-full fixed top-0 left-0 bg-transparent`}
            hidden={!isOpen}
        >
            <div
                className={`absolute z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-slate-200 py-2 px-4 rounded-md space-y-5 w-fit h-fit flex flex-col items-center`}
                onKeyDown={(e) => {
                    if (e.key === "Enter") confirm();
                    if (e.key === "Escape") cancel();
                }}
            >
                <p className="text-center text-md w-52 text-slate-700 font-semibold">
                    {title}
                </p>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder={title}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="border border-slate-300 px-4 py-2 outline-none"
                />
                <div className="flex justify-end gap-x-4 mt-2">
                    <button
                        onClick={confirm}
                        className="text-sm text-purple-500 rounded-md px-4 py-2 font-semibold bg-purple-50"
                    >
                        Confirm
                    </button>
                    <button
                        onClick={cancel}
                        className="text-sm rounded-md px-4 py-2 font-semibold bg-slate-50 text-slate-400"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TextModal;
