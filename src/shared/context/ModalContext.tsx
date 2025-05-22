import { createContext, ReactNode, useEffect, useState } from "react";

type ModalContext = {
    openModal: (modal: ReactNode, backdropStyle?: string) => void;
    closeModal: () => void;
    isOpen: boolean;
};
export const ModalContext = createContext<ModalContext>({} as ModalContext);

type ModalProviderProps = { children: ReactNode };
export default function ModalProvider({ children }: ModalProviderProps) {
    const [modal, setModal] = useState<ReactNode | null>(null);
    const [backdropStyle, setBackdropStyle] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function openModal(modal: ReactNode, backdropStyle?: string) {
        setIsOpen(true);
        setModal(modal);
        setBackdropStyle(backdropStyle ?? "");
    }

    function closeModal() {
        setIsOpen(false);
        setModal(null);
        setBackdropStyle("");
    }
    useEffect(() => {
        function action(e: KeyboardEvent) {
            if (e.key == "Escape") {
                e.preventDefault();
                e.stopPropagation();
                closeModal();
            }
        }

        document.addEventListener("keydown", action);

        return () => document.removeEventListener("keydown", action)
    }, []);

    return (
        <ModalContext.Provider value={{ openModal, closeModal, isOpen }}>
            {modal && (
                <div
                    className={`flex flex-1 items-center justify-center w-full h-full absolute top-0 left-0 bg-black/10 z-50 ${backdropStyle}`}
                    onClick={closeModal}
                >
                    <div onClick={(e) => e.stopPropagation()}>{modal}</div>
                </div>
            )}
            {children}
        </ModalContext.Provider>
    );
}
