type SimpleButtonProps = {
    onclick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    icon: React.ReactNode;
    classname?: string;
};
export default ({ onclick, icon, classname }: SimpleButtonProps) => {
    return (
        <button
            className={`hover:text-white p-2 rounded-sm ${classname}`}
            onClick={onclick}
        >
            {icon}
        </button>
    );
};
