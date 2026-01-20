import { useState } from "react";
import { useModalContext, useSessionContext } from "@/context/useContext.tsx";
import DropDown from "./DropDown.tsx";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { uploadFile, uploadFolder } from "../requests/fileRequests.ts";
import { FilenameRequest } from "@/types.ts";

type ButtonUploadProps = {
    parentid: string;
};
export default function ButtonUpload({ parentid }: ButtonUploadProps) {
    const { session } = useSessionContext();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const uploadFileMut = useMutation({
        mutationFn: (body: FileList) =>
            uploadFile(session!.userid, parentid, body),
    });

    const uploadFolderMut = useMutation({
        mutationFn: (body: FilenameRequest) =>
            uploadFolder(session!.userid, body),
    });

    const { openModal } = useModalContext();

    return (
        <div
            className={`inline w-fit relative select-none`}
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
                className="max-w-32 border absolute w-full bg-white z-50"
                isOpen={isDropdownOpen}
            >
                <DropDown.FileOption
                    text="Upload File"
                    onchange={(filelist: FileList) => {
                        uploadFileMut.mutate(filelist);
                    }}
                    isDirOption={false}
                    maxFiles={10}
                />
                <DropDown.FileOption
                    text="Upload Folder"
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
                            title: "Type the name",
                        });
                    }}
                    text="New Folder"
                />
            </DropDown>
        </div>
    );
}
