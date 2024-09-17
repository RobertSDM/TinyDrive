import { useState } from "react";
import { MdEdit } from "react-icons/md";
import TextModal from "../modalWrapper/TextModal.tsx";

const EditButton = ({
    onclick,
    text,
    className = "",
}: {
    onclick: (text: string) => any;
    text: string;
    className?: string;
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <TextModal
                title="Edit name"
                text={text}
                setIsOpen={setIsModalOpen}
                isOpen={isModalOpen}
                callback={onclick}
            />
            <button
                className={`active:scale-95 ${className}`}
                onClick={() => {
                    setIsModalOpen(true);
                }}
            >
                <MdEdit
                    className={` bg-white border  border-slate-500 hover:bg-slate-500 hover:text-white rounded-full aspect-square min-h-8 min-w-8 p-[0.45rem]`}
                />
            </button>
        </>
    );
};

export default EditButton;
