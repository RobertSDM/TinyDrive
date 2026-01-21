import { File, UrlResponse } from "@/types.ts";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { preview } from "../requests/fileRequests.ts";
import { useSessionContext } from "@/context/useContext.tsx";
import { useDownloadFile } from "../hooks/fileServices.tsx";

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
                <p
                    className=" bg-black py-1 pl-4 whitespace-nowrap text-ellipsis overflow-hidden max-w-96"
                    onClick={(e) => e.stopPropagation()}
                >
                    {file.filename}
                </p>
                <section
                    className="bg-black py-1 pr-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    <p>{file.extension}</p>
                </section>
                <button
                    className="bg-black px-4 ml-4 py-1"
                    onClick={(e) => {
                        e.stopPropagation();
                        downloadFileMut.mutate([file.id!]);
                    }}
                >
                    Download
                </button>
            </header>

            {file.content_type.startsWith("image") ? (
                <ImagePreview fileid={file.id!} userid={session!.userid} />
            ) : (
                <p className="font-semibold text-slate-400">Soon</p>
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
        return <p className="font-semibold text-slate-400">Loading...</p>;

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
