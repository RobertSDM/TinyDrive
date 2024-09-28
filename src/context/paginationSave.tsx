// Context to save the current page pagination

import { createContext, ReactElement, useState } from "react";

type pageCache = {
    [id: string]: {
        loadedPages: number[];
        totalPages: number;
    };
};

type context = {
    pagesCache: pageCache;
    setPagesCache: React.Dispatch<React.SetStateAction<pageCache>>;
};

export const PaginationContext = createContext<context>({} as context);

export const PaginationProvider = ({
    children,
}: {
    children: ReactElement;
}) => {
    const [pagesCache, setPagesCache] = useState<pageCache>({} as pageCache);

    return (
        <PaginationContext.Provider value={{ pagesCache, setPagesCache }}>
            {children}
        </PaginationContext.Provider>
    );
};
