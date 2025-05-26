import {
    ItemDownloadConfig,
    ItemImagePreviewConfig,
} from "@/features/drive/api/requestConfig.ts";
import { useAuthContext } from "@/shared/context/useContext.tsx";
import TimedCache from "@/shared/core/TimedCache.ts";
import useRequest from "@/shared/hooks/useRequest.tsx";
import { Item, SingleResponse } from "@/shared/types/types.ts";
import { useEffect, useState } from "react";

type PreviewProps = {
    item: Item;
    isOpen?: boolean;
    close: () => void;
};
export default function Preview({ item, isOpen, close }: PreviewProps) {
    const [cache, setCache] = useState<TimedCache | null>(null);
    const { account, session } = useAuthContext();
    const time = 55 * 60 * 1000;

    function addToCache(key: string, value: string) {
        const newCache = Object.assign(new TimedCache(time), cache);
        newCache.add(key, value);
        setCache(newCache);
    }

    const { request: download } = useRequest<SingleResponse<string>>(
        ItemDownloadConfig(account!.id, item?.id! ?? "", session!.accessToken),
        (resp) => {
            const $a = document.createElement("a");
            $a.download = "";
            $a.href = resp.data.data;

            $a.click();
            $a.remove();

            return resp.data;
        }
    );

    useEffect(() => {
        document.body.style.overflow = "hidden";
        window.onpopstate = close;

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    useEffect(() => {
        const previewCache = sessionStorage.getItem("preview-cache");

        if (previewCache) {
            const timedCache: TimedCache = TimedCache.from(
                JSON.parse(previewCache)
            );
            setCache(timedCache);
        } else {
            setCache(new TimedCache(time));
        }
    }, []);

    useEffect(() => {
        if (!cache) return;

        return () => sessionStorage.setItem("preview-cache", cache.serialize());
    }, [cache]);

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
                    className=" bg-black py-1 pl-4 whitespace-nowrap text-ellipsis overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {item.name}
                </p>
                <section
                    className="bg-black py-1 pr-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    <p>{item.extension}</p>
                </section>
                <button
                    className="bg-black px-4 ml-4 py-1"
                    onClick={(e) => {
                        e.stopPropagation();
                        download();
                    }}
                >
                    Download
                </button>
            </header>

            {item.content_type.startsWith("image") ? (
                <ImagePreview
                    item={item}
                    cache={cache}
                    addToCache={addToCache}
                />
            ) : (
                <p className="font-semibold text-slate-400">Soon</p>
            )}
        </div>
    );
}

type ImagePreviewProps = {
    item: Item;
    cache: TimedCache | null;
    addToCache: (key: string, value: string) => void;
};
function ImagePreview({ item, cache, addToCache }: ImagePreviewProps) {
    const { account, session } = useAuthContext();
    const { data, request, isLoading } = useRequest<SingleResponse<string>>(
        ItemImagePreviewConfig(account!.id, item.id!, session!.accessToken)
    );
    const [url, setUrl] = useState<string>("");

    useEffect(() => {
        if (!data || !cache) return;
        addToCache(item.id!, data.data);
        setUrl(data.data);
    }, [data]);

    useEffect(() => {
        if (!cache) return;

        if (cache.has(item.id!)) {
            setUrl(cache.get(item.id!)!);
            return;
        }
        request();
    }, [cache]);

    return (
        <section className="flex-1 flex items-center justify-center">
            {isLoading ? (
                <p className="font-semibold text-slate-400">Loading...</p>
            ) : (
                <img
                    key={url}
                    onClick={(e) => e.stopPropagation()}
                    src={url}
                    className="w-full h-auto max-h-[80vh] object-scale-down"
                />
            )}
        </section>
    );
}
