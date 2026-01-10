import { useState } from "react";
import { useModalContext, useSessionContext } from "@/context/useContext.tsx";
import DropDown from "./DropDown.tsx";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { FileType } from "@/types.ts";
import { useMutation } from "@tanstack/react-query";
import { uploadFile, uploadFolder } from "../requests/fileRequests.ts";

export default function ButtonUpload() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const uploadFileMut = useMutation({
        mutationFn: uploadFile,
    });

    const uploadFolderMut = useMutation({
        mutationFn: uploadFolder,
    });

    const { session } = useSessionContext();
    const { openModal } = useModalContext();

    return (
        <div
            className={`inline relative select-none`}
            onClick={() =>
                isDropdownOpen
                    ? setIsDropdownOpen(false)
                    : setIsDropdownOpen(true)
            }
        >
            <span
                className={
                    "items-center gap-x-2 text-black border hover:bg-purple-500 hover:border-none w-32 min-w-32 max-w-32 hover:text-white flex cursor-pointer justify-center p-2"
                }
            >
                <p>{"+ New"}</p>
                {isDropdownOpen ? <MdExpandMore /> : <MdExpandLess />}
            </span>
            <DropDown
                className="max-w-32 border absolute w-full"
                isOpen={isDropdownOpen}
            >
                <DropDown.FileOption
                    text="Upload File"
                    onchange={(filelist: FileList) => {
                        uploadFileMut.mutate(filelist);
                    }}
                    type={FileType.FILE}
                    maxFiles={10}
                />
                <DropDown.FileOption
                    text="Upload Folder"
                    onchange={(filelist: FileList) => {
                        setIsDropdownOpen(false);
                        uploadFolderMut.mutate(filelist);
                    }}
                    type={FileType.FOLDER}
                />
                <DropDown.Option
                    className="border-t border-slate-300"
                    onclick={() => {
                        openModal("text", {
                            fn: (text) => {
                                uploadFolder({
                                    name: text,
                                    parentid: "",
                                    ownerid: session!.userid,
                                });
                            },
                            title: "Type the name",
                        });
                    }}
                    text="New Folder"
                />
            </DropDown>
        </div>
    );
}
