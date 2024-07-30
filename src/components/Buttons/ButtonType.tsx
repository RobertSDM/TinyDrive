const ButtonType = ({
    isOpen,
    setIsOpen,
    type,
    setType,
}: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    type: "file" | "folder" | null;
    setType: React.Dispatch<React.SetStateAction<"file" | "folder" | null>>;
}) => {
    function changeType(type: "file" | "folder" | null) {
        setType(type);
        setIsOpen(false);
    }

    return (
        <div
            className={`border px-2 text-center rounded-md border-slate-300 w-20 relative cursor-pointer ${
                isOpen && "border-b-transparent rounded-b-none"
            }`}
            onClick={() => setIsOpen((prev) => !prev)}
            onMouseLeave={() => {
                setIsOpen(false);
            }}
        >
            <span>{!type ? "all" : type}</span>
            <div
                onMouseOver={() => {
                    setIsOpen(true);
                }}
                className={`${
                    isOpen ? "flex" : "hidden h-0"
                } flex-col absolute border-slate-300 border top-full z-10 bg-white w-[calc(100%_+_2px)] left-[-1px] rounded-b-md`}
            >
                <span
                    className="hover:bg-purple-50 cursor-pointer"
                    onClick={() => {
                        changeType(null);
                    }}
                >
                    all
                </span>
                <span
                    className="hover:bg-purple-50 cursor-pointer"
                    onClick={() => {
                        changeType("folder");
                    }}
                >
                    folder
                </span>
                <span
                    className="hover:bg-purple-50 cursor-pointer"
                    onClick={() => {
                        changeType("file");
                    }}
                >
                    file
                </span>
            </div>
        </div>
    );
};

export default ButtonType;
