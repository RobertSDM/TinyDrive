import { useNotifyContext } from "@/context/useContext.tsx";
import { NotifyLevel } from "@/types.ts";
import { useUploadFile } from "../hooks/fileServices.tsx";

type DragAndDrop = {
    close: () => void;
    isOpen: boolean;
    parentid: string;
};
export default function DragAndDrop({ close, isOpen, parentid }: DragAndDrop) {
    const { notify } = useNotifyContext();

    const uploadFileMut = useUploadFile(parentid);

    if (!isOpen) return null;

    return (
        <div
            className={`absolute flex bg-purple-400/50 w-full h-full top-0 left-0 items-center justify-center z-50`}
            onDragEnter={(e) => e.stopPropagation()}
            onDragLeave={(e) => {
                e.stopPropagation();
                close();
            }}
            onDragOver={(e) => {
                e.preventDefault();
            }}
            onDrop={(e) => {
                e.preventDefault();
                close();

                const filelist = e.dataTransfer.files;
                if (Array.from(filelist).some((f) => f.type === "")) {
                    notify({
                        level: NotifyLevel.ERROR,
                        message: "Drag and Drop não suporta pastas",
                        type: "popup",
                    });
                    return;
                }

                uploadFileMut.mutate(filelist);
            }}
        >
            <p className="font-semibold text-purple-900">
                Drop the file to save
            </p>
        </div>
    );
}
