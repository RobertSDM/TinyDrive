import { createContext, ReactElement } from "react";

type DropDown = {
    children: ReactElement[];
    isOpen: boolean;
};

const DropDownContext = createContext<Object>({});

function DropDown({ children, isOpen }: DropDown) {
    return (
        <div
            className={`absolute bg-white w-full border border-black/30 border-t-0 rounded-b-md overflow-hidden`}
            hidden={!isOpen}
        >
            <DropDownContext.Provider value={{ isOpen }}>
                {children}
            </DropDownContext.Provider>
        </div>
    );
}

type OptionProps = {
    text: string;
    onclick: () => void;
};
DropDown.Option = ({ onclick, text }: OptionProps) => {
    return (
        <p
            onClick={onclick}
            className="hover:bg-purple-500 p-2 py-1 hover:text-white cursor-pointer w-full mx-auto inline-block text-sm"
        >
            {text}
        </p>
    );
};

export enum FileOptionType {
    FILE,
    FOLDER,
}
type FileOptionProps = {
    text: string;
    onchange: (list: FileList) => void;
    type: FileOptionType;
};

DropDown.FileOption = ({ text, type, onchange }: FileOptionProps) => {
    return (
        <>
            <label
                htmlFor={text}
                className="hover:bg-purple-500 p-2 py-1 hover:text-white cursor-pointer w-full inline-block text-sm"
            >
                {text}
            </label>
            <input
                id={text}
                type="file"
                multiple={type === FileOptionType.FILE}
                minLength={1}
                maxLength={type === FileOptionType.FILE ? 10 : 1}
                onClick={(e) => {
                    if (type === FileOptionType.FILE) return;

                    e.currentTarget.webkitdirectory = true;
                }}
                onChange={(e) => {
                    if (!e.target.files || e.target.files.length == 0) return;

                    onchange(e.target.files);
                }}
                hidden
            />
        </>
    );
};

export default DropDown;
