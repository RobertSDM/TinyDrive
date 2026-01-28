import { File, UrlResponse } from "@/types.ts";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { preview } from "../requests/fileRequests.ts";
import { useSessionContext } from "@/context/useContext.tsx";
import { useDownloadFile } from "../hooks/fileServices.tsx";
import { MdDownload } from "react-icons/md";
import SimpleButton from "./SimpleButton.tsx";

type PreviewProps = {
    file: File;
    isOpen?: boolean;
    close: () => void;
};
export default function Preview({ file, isOpen, close }: PreviewProps) {
    const { session } = useSessionContext();

    const downloadFileMut = useDownloadFile();

    useEffect(() => {
        document.body.style.overflow = "hidden";
        window.onpopstate = close;

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div
            className="fixed top-0 left-0 flex items-center w-full h-full bg-black/80 z-50 flex-col px-4 py-4 gap-y-4"
            hidden={isOpen}
            onClick={close}
            onScroll={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
            onWheel={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
        >
            <header
                className=" text-white items-center flex  w-full justify-center"
                onClick={close}
            >
                <span
                    className={`bg-black py-1 px-2 whitespace-nowrap text-ellipsis overflow-hidden max-w-96 ${file.extension !== "" ? "rounded-l-sm" : "rounded-sm"}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {file.filename}
                </span>
                {file.extension !== "" && (
                    <section
                        className="bg-black py-1 px-2 rounded-r-sm"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <p>{file.extension}</p>
                    </section>
                )}
                <SimpleButton
                    classname="bg-black ml-2 group"
                    onclick={(
                        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                    ) => {
                        e.stopPropagation();
                        downloadFileMut.mutate([file.id!]);
                    }}
                    icon={
                        <MdDownload
                            size={16}
                            className="text-slate-500 group-hover:text-white"
                        />
                    }
                />
            </header>

            {file.content_type.startsWith("image") ? (
                <ImagePreview fileid={file.id!} userid={session!.id} />
            ) : (
                <p className="font-semibold text-slate-400">Em breve</p>
            )}
        </div>
    );
}

type ImagePreviewProps = {
    fileid: string;
    userid: string;
};
function ImagePreview({ fileid, userid }: ImagePreviewProps) {
    const { data, isFetching } = useQuery<UrlResponse>({
        queryKey: ["imagePreview"],
        queryFn: () => preview(fileid, userid),
    });

    if (isFetching)
        return <p className="font-semibold text-slate-400">carregando...</p>;

    return (
        <section className="flex-1 flex items-center justify-center">
            <img
                onClick={(e) => e.stopPropagation()}
                src={data?.url}
                className="w-full h-auto max-h-[80vh] object-scale-down"
            />
        </section>
    );
}
