import { FileType } from "@/types.ts";

type DropDown = {
    children: React.ReactNode;
    isOpen: boolean;
    className: string;
};
function DropDown({ children, isOpen, className }: DropDown) {
    if (!isOpen) return null;

    return <div className={className}>{children}</div>;
}

type OptionProps = {
    text: string;
    onclick: () => void;
    className?: string;
};
DropDown.Option = ({ onclick, text, className }: OptionProps) => {
    return (
        <p
            className={`hover:bg-purple-500 p-2 py-1 hover:text-white cursor-pointer w-full mx-auto inline-block text-sm ${className}`}
            onClick={(e) => {
                e.stopPropagation();
                onclick();
            }}
        >
            {text}
        </p>
    );
};

type FileOptionProps = {
    text: string;
    onchange: (list: FileList) => void;
    type: FileType;
    maxFiles?: number;
    className?: string;
};
DropDown.FileOption = ({
    text,
    type,
    onchange,
    maxFiles = 1,
    className,
}: FileOptionProps) => {
    return (
        <div onClick={(e) => e.stopPropagation()}>
            <label
                htmlFor={text}
                className={`hover:bg-purple-500 p-2 py-1 hover:text-white cursor-pointer w-full inline-block text-sm ${className}`}
            >
                {text}
            </label>
            <input
                id={text}
                type="file"
                multiple={type === FileType.FILE}
                minLength={1}
                maxLength={type === FileType.FILE ? maxFiles : 1}
                onClick={(e) => {
                    if (type === FileType.FILE) return;
                    e.currentTarget.webkitdirectory = true;
                }}
                onChange={(e) => {
                    if (!e.target.files || e.target.files.length == 0) return;
                    onchange(e.target.files);
                }}
                hidden
            />
        </div>
    );
};

export default DropDown;
