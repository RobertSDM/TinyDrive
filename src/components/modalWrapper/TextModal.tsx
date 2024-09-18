import { LegacyRef, useEffect, useRef, useState } from "react";

const TextModal = ({
    callback,
    isOpen,
    setIsOpen,
    title = "Type the text",
    text,
}: {
    callback: (text: string) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    title?: string;
    text: string;
}) => {

    const [modalText, setModalText] = useState<string>(text);
    const inputRef: LegacyRef<HTMLInputElement> = useRef(null);

    useEffect(() => {
        inputRef.current!.focus();
        inputRef.current!.select();
    }, [isOpen]);

    function confirm() {
        setIsOpen(false);
        callback(modalText);
    }

    function cancel() {
        setIsOpen(false);
        setModalText(text);
    }

    return (
        <div
            className={`w-full h-full fixed top-0 left-0 bg-transparent ${
                isOpen ? "" : "hidden"
            }`}
            onClick={(e) => {
                if (e.target === e.currentTarget) cancel();
            }}
        >
            <div
                className={`absolute z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-slate-200 p-2 rounded-md space-y-5 w-[18.7rem] h-[10.6rem] flex flex-col items-center`}
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
                    placeholder="New name"
                    value={modalText}
                    onChange={(e) => setModalText(e.target.value)}
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
