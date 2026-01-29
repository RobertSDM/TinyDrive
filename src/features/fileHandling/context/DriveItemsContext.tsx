import { File } from "@/types.ts";
import { createContext, useReducer } from "react";

type actionTypes = "add" | "del" | "update" | "clear";

type context = {
    files: File[];
    update: React.Dispatch<{
        type: actionTypes;
        file: File;
    }>;
};
export const DriveFilesContext = createContext<context>({} as context);

export function DriveFilesProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [files, update] = useReducer(filesReducer, [] as File[]);

    return (
        <DriveFilesContext.Provider value={{ files, update }}>
            {children}
        </DriveFilesContext.Provider>
    );
}

function filesReducer(
    state: File[],
    action: { type: string; file: File }
): File[] {
    switch (action.type) {
        case "add":
            return [...state, action.file];
        case "del": {
            let tmp = [...state];
            tmp = tmp.filter((file) => file.id !== action.file.id);
            return tmp;
        }
        case "update": {
            let tmp = [...state];

            let index = tmp.findIndex((file) => file.id === action.file.id);
            tmp[index] = action.file;

            return tmp;
        }
        case "clear": {
            return [];
        }
    }
    return state;
}
