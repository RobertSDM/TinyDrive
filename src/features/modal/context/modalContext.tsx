import ConfirmModal from "@/features/modal/components/ConfirmModal.tsx";
import TextModal from "@/features/modal/components/TextModal.tsx";
import { createContext, useState } from "react";

type ModalOption = "text" | "confirm";
type OpenModalConfig = {
    title: string;
    fn: (...args: any[]) => void;
    initialText?: string;
};
type context = {
    openModal: (type: ModalOption, config: OpenModalConfig) => void;
};

export const ModalContext = createContext<context>({} as context);

export function ModalProvider({ children }: { children: React.ReactNode }) {
    const [modal, setModal] = useState<React.ReactNode | null>(null);

    function openModal(type: ModalOption, config: OpenModalConfig) {
        switch (type) {
            case "confirm":
                setModal(
                    <ConfirmModal
                        isOpen={true}
                        close={() => setModal(null)}
                        fn={config.fn}
                        title={config.title}
                    />
                );
                break;
            case "text":
                setModal(
                    <TextModal
                        isOpen={true}
                        close={() => setModal(null)}
                        fn={config.fn}
                        title={config.title}
                        initialText={config.initialText}
                    />
                );
                break;
        }
    }

    return (
        <ModalContext.Provider value={{ openModal }}>
            {modal}
            {children}
        </ModalContext.Provider>
    );
}
