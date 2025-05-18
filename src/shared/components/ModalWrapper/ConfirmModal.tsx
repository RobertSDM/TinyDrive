import { useEffect, useRef } from "react";

const ConfirmModal = ({
    callback,
    isOpen,
    setIsOpen,
    text = "This action cannot be undone.",
    title = "Are you sure you want to delete this item?",
}: {
    callback: () => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    title?: string;
    text?: string;
}) => {
    const btnDelete = useRef<HTMLButtonElement>(null);

    function confirm() {
        setIsOpen(false);
        callback();
    }

    function cancel() {
        setIsOpen(false);
    }

    useEffect(() => {
        if (isOpen) {
            btnDelete.current?.focus();
        }
    }, [isOpen]);

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
                className={`absolute z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-slate-200 p-2 rounded-md space-y-5 w-[300px] h-[170px] flex flex-col items-center`}
                onKeyDown={(e) => {
                    if (e.key === "Enter") confirm();
                    if (e.key === "Escape") cancel();
                }}
            >
                <div className="space-y-2">
                    <p className="text-center text-md w-52 text-slate-700 font-semibold">
                        {title}
                    </p>
                    <p className="text-center text-sm font-medium text-slate-700">
                        {text}
                    </p>
                </div>
                <div className="flex justify-end gap-x-4 mt-6">
                    <button
                        ref={btnDelete}
                        onClick={confirm}
                        className="text-sm text-red-500 rounded-md px-4 py-2 font-semibold bg-red-50"
                    >
                        Delete
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

export default ConfirmModal;
