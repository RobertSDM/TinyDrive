import { ReactElement, createContext, useState } from "react";

type ContextValue = {
    title: string;
    updateTitle: (title: string, document: Document) => void;
};

export const TitleContext = createContext({} as ContextValue);

type Props = {
    children: ReactElement;
};

export const TitleProvider = ({ children }: Props) => {
    const [title, setTitle] = useState("");

    const updateTitle = (title: string, document: Document) => {
        setTitle(title);
        document.title = title;
    };

    return (
        <TitleContext.Provider value={{ title, updateTitle }}>
            {children}
        </TitleContext.Provider>
    );
};
