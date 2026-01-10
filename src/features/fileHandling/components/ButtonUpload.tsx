import { useState } from "react";
import { useModalContext, useSessionContext } from "@/context/useContext.tsx";
import DropDown from "./DropDown.tsx";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { ItemType } from "@/types.ts";
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
            className={`inline relative`}
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
            <DropDown className="max-w-32 border" isOpen={isDropdownOpen}>
                <DropDown.FileOption
                    text="Upload File"
                    onchange={(filelist: FileList) => {
                        uploadFileMut.mutate(filelist);
                    }}
                    type={ItemType.FILE}
                />
                <DropDown.FileOption
                    text="Upload Folder"
                    onchange={(filelist: FileList) => {
                        uploadFolderMut.mutate(filelist);
                    }}
                    type={ItemType.FOLDER}
                />
                <DropDown.Option
                    className="border-t border-slate-300"
                    onclick={() => {
                        setIsDropdownOpen(false);
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
