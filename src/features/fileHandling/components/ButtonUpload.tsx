import { useState } from "react";
import { useModalContext } from "@/context/useContext.tsx";
import DropDown from "./DropDown.tsx";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { useUploadFile, useUploadFolder } from "../hooks/fileServices.tsx";

type ButtonUploadProps = {
    parentid: string;
};
export default function ButtonUpload({ parentid }: ButtonUploadProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const uploadFileMut = useUploadFile(parentid);
    const uploadFolderMut = useUploadFolder(parentid);

    const { openModal } = useModalContext();

    return (
        <div
            className={`inline w-fit relative select-none `}
            onClick={() =>
                isDropdownOpen
                    ? setIsDropdownOpen(false)
                    : setIsDropdownOpen(true)
            }
        >
            <span
                className={
                    " text-black  bg-purple-200/75 dark:bg-purple-200/75  active:bg-purple-500 w-32 active:text-white cursor-pointer flex items-center gap-x-2  justify-center p-2 rounded-sm"
                }
            >
                <p>{"+ Novo"}</p>
                {isDropdownOpen ? <MdExpandMore /> : <MdExpandLess />}
            </span>
            <DropDown
                className="max-w-32 border absolute w-full bg-white z-40"
                isOpen={isDropdownOpen}
            >
                <DropDown.FileOption
                    text="Enviar arquivo"
                    onchange={(filelist: FileList) => {
                        uploadFileMut.mutate(filelist);
                    }}
                    isDirOption={false}
                    maxFiles={10}
                />
                <DropDown.FileOption
                    text="Enviar pasta"
                    onchange={(filelist: FileList) => {
                        setIsDropdownOpen(false);
                        uploadFileMut.mutate(filelist);
                    }}
                    isDirOption={true}
                />
                <DropDown.Option
                    className="border-t border-slate-300"
                    onclick={() => {
                        openModal("text", {
                            fn: (text) => {
                                uploadFolderMut.mutate({
                                    filename: text,
                                });
                            },
                            title: "Digite o nome",
                        });
                    }}
                    text="Nova pasta"
                />
            </DropDown>
        </div>
    );
}
