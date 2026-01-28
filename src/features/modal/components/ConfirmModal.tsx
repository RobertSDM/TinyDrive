import { useEffect, useRef } from "react";

const ConfirmModal = ({
    fn,
    title,
    isOpen,
    close,
}: {
    fn: () => void;
    title: string;
    isOpen: boolean;
    close: () => void;
}) => {
    const confirmRef = useRef<HTMLButtonElement>(null);

    function confirm() {
        close();
        fn();
    }

    useEffect(() => {
        if (!isOpen) return;

        confirmRef.current?.focus();
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            onClick={close}
            className="flex justify-center items-center bg-black/20 absolute top-0 w-full h-screen z-50"
        >
            <div
                className="bg-white border border-slate-200 p-4 rounded-md space-y-5 w-72 h-32 flex flex-col items-center"
                onKeyDown={(e) => {
                    if (e.key === "Enter") confirm();
                    if (e.key === "Escape") close();
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <p className="text-center text-sm w-52 text-slate-700 font-semibold">
                    {title}
                </p>
                <div className="flex justify-end gap-x-4 mt-6">
                    <button
                        ref={confirmRef}
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
};

export default ConfirmModal;
