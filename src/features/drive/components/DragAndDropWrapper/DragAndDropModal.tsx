import { useUploadItem } from "../../hooks/uploadHooks.tsx";

type DragOverModalProps = {
    close: () => void;
    isOpen: boolean;
};
export default function DragAndDropModal({
    close,
    isOpen,
}: DragOverModalProps) {
    const { request: uploadItem } = useUploadItem();

    return (
        <div
            className={`fixed flex bg-purple-400/50 w-full h-full top-0 left-0 items-center justify-center z-50`}
            onDragEnter={(e) => e.stopPropagation()}
            onDragLeave={(e) => {
                e.stopPropagation();
                close();
            }}
            onDragOver={(e) => {
                e.preventDefault();
            }}
            onDrop={async (e) => {
                e.preventDefault();
                close();
                const filelist = e.dataTransfer.files;
                uploadItem(filelist);
            }}
            hidden={!isOpen}
        >
            <p className="font-semibold text-purple-900">
                Drop the file to save
            </p>
        </div>
    );
}
