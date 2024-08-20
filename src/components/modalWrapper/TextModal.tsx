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
    if (!isOpen) return;

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
            className="w-full h-full absolute top-0 left-0 bg-transparent"
            onClick={(e) => {
                if (e.target === e.currentTarget) cancel();
            }}
        >
            <div
                className={`absolute z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-md shadow-purple-200 p-2 rounded-md space-y-2`}
                onKeyDown={(e) => {
                    if (e.key === "Enter") confirm();
                    if (e.key === "Escape") cancel();
                }}
            >
                <p className="text-center text-sm">{title}</p>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="New name"
                    value={modalText}
                    onChange={(e) => setModalText(e.target.value)}
                    className="border px-4 py-2"
                />
                <div className="flex justify-end gap-x-4 mt-2">
                    <button
                        onClick={confirm}
                        className="text-sm text-purple-500 rounded-full px-4 py-2 font-semibold hover:bg-purple-200"
                    >
                        Confirm
                    </button>
                    <button
                        onClick={cancel}
                        className="text-sm rounded-full px-4 py-2 font-semibold hover:bg-slate-200"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TextModal;
