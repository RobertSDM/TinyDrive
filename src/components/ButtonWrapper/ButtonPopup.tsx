import { ReactElement, useEffect, useRef, useState } from "react";
import { IoMdMore } from "react-icons/io";

interface IListItems {
    name: string;
    callback: (...args: any) => void;
    modal?: ReactElement;
    
}

export default ({
    className,
    nameList,
}: {
    className: string;
    nameList: IListItems[];
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const nodeId = useRef<string>(
        Math.floor(new Date().getTime() * Math.random()).toString()
    );

    function close() {
        setIsOpen(false);
    }

    function open() {
        setIsOpen(true);
    }

    useEffect(() => {
        if (isOpen) {
            window.addEventListener("click", (e) => {
                if (
                    nodeId.current === (e.target as Node).parentElement!.id ||
                    e.target instanceof HTMLInputElement
                ) {
                    return;
                }
                close();
            });
        } else {
            window.removeEventListener("click", (e) => {
                if (
                    nodeId.current === (e.target as Node).parentElement!.id ||
                    e.target instanceof HTMLInputElement
                ) {
                    return;
                }
                close();
            });
        }
    }, [isOpen]);

    return (
        <div id={nodeId.current} className={`relative ${className}`}>
            <div
                className={`${
                    isOpen ? "" : "hidden"
                } border border-slate-300 rounded-md absolute w-fit h-fit bg-white bottom-full right-3/4`}
            >
                {nameList.map(({ name, callback, modal }) => (
                    <div key={name} id={nodeId.current}>
                        <div>{modal}</div>
                        <button
                            onClick={() => {
                                callback();
                                if (!modal) close();
                            }}
                            className="w-full h-10 hover:bg-purple-200 px-2 flex items-center"
                        >
                            {name}
                        </button>
                    </div>
                ))}
            </div>
            <IoMdMore
                onClick={() => {
                    open();
                }}
                className={`bg-transparent hover:bg-slate-200 cursor-pointer text-slate-700 rounded-full aspect-square min-h-8 min-w-8 p-[0.45rem]`}
            />
        </div>
    );
};
