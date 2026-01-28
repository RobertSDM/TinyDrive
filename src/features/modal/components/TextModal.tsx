import { useNotifyContext } from "@/context/useContext.tsx";
import { NotifyLevel } from "@/types.ts";
import { useEffect, useRef, useState } from "react";

export default function TextModal({
    fn,
    title,
    isOpen,
    close,
    initialText = "",
    nullable = true,
}: {
    fn: (text: string) => void;
    title: string;
    isOpen: boolean;
    close: () => void;
    initialText?: string;
    nullable?: boolean;
}) {
    const [text, setText] = useState<string>(initialText);
    const notify = useNotifyContext();
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!isOpen) return;

        // Focus for better UX
        inputRef.current!.focus();
    }, [isOpen]);

    function confirm() {
        if (!nullable && text === "") {
            notify({
                level: NotifyLevel.ERROR,
                message: "The text can't be null",
                type: "popup",
            });
            return;
        }

        close();
        fn(text);
        setText("");
    }

    if (!isOpen) return null;

    return (
        <div
            onClick={close}
            className="flex justify-center items-center bg-black/20 absolute top-0 w-full h-screen z-50"
        >
            <div
                className={`bg-white p-4 rounded-md space-y-5 w-72 h-44 flex flex-col items-center`}
                onKeyDown={(e) => {
                    if (e.key === "Enter") confirm();
                    if (e.key === "Escape") close();
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-center text-md w-52 text-slate-700 font-semibold">
                    {title}
                </h2>
                <input
                    ref={inputRef}
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="border border-slate-300 px-4 py-2 outline-none"
                />
                <div className="flex justify-end gap-x-4 mt-2">
                    <button
                        onClick={confirm}
                        className="text-sm text-purple-500 rounded-md px-4 py-2 font-semibold bg-purple-200"
                    >
                        Confirmar
                    </button>
                    <button
                        onClick={close}
                        className="text-sm rounded-md px-4 py-2 font-semibold bg-slate-200 text-slate-500"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}
