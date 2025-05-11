import { createContext, ReactElement, useState } from "react";

type ModalContext = {
    openModal: (modal: ReactElement, backdropStyle?: string) => void;
    closeModal: () => void;
    isOpen: boolean;
};
export const ModalContext = createContext<ModalContext>({} as ModalContext);

type ModalProviderProps = { children: ReactElement };
export default function ModalProvider({ children }: ModalProviderProps) {
    const [modal, setModal] = useState<ReactElement | null>(null);
    const [backdropStyle, setBackdropStyle] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(true);

    function openModal(modal: ReactElement, backdropStyle?: string) {
        setModal(modal);
        setBackdropStyle(backdropStyle ?? "");
    }

    function closeModal() {
        setIsOpen(false);
        setModal(null);
        setBackdropStyle("");
    }

    return (
        <ModalContext.Provider value={{ openModal, closeModal, isOpen }}>
            {children}
            {modal && (
                <div
                    className={`flex flex-1 items-center justify-center w-full h-full absolute top-0 left-0 bg-black/10 z-50 ${backdropStyle}`}
                    onClick={closeModal}
                >
                    <div onClick={(e) => e.stopPropagation()}>{modal}</div>
                </div>
            )}
        </ModalContext.Provider>
    );
}
