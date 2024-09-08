// Context to save the current page pagination

import { createContext, ReactElement, useState } from "react";

type IPagination = {
    [id: string]: {
        page: number;
    };
};

type context = {
    savePage: (id: string, page: number) => void;
    getSavedPage: (id: string) => number | undefined;
    pagination: IPagination;
};

export const PaginationContext = createContext<context>({} as context);

export const PaginationProvider = ({
    children,
}: {
    children: ReactElement;
}) => {
    const [pagination, setPagination] = useState<IPagination>({});

    function savePage(id: string, page: number) {
        const obj = {
            ...pagination,
            [id]: { page },
        };
        setPagination({ ...obj });
    }

    function getSavedPage(id: string): number | undefined {
        return pagination[id]?.page;
    }

    return (
        <PaginationContext.Provider
            value={{ savePage, getSavedPage, pagination }}
        >
            {children}
        </PaginationContext.Provider>
    );
};
