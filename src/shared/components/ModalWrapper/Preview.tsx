import { ItemImagePreviewConfig } from "@/features/drive/api/requestConfig.ts";
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
    const time = 5 * 60 * 1000;

    function addToCache(key: string, value: string) {
        const newCache = Object.assign(new TimedCache(time), cache);
        newCache.add(key, value);
        setCache(newCache);
    }

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
            className="absolute top-0 left-0 flex items-center w-full h-full bg-black/60 z-50 flex-col p-4 gap-y-4"
            hidden={isOpen}
            onClick={close}
        >
            <header
                className=" text-white items-center flex gap-x-2"
                onClick={(e) => e.stopPropagation()}
            >
                <p className="bg-black px-4 py-1">
                    {item.name}
                    {item.extension}
                </p>
                <p className="bg-black px-4 py-1">Download</p>
            </header>
            <ImagePreview item={item} cache={cache} addToCache={addToCache} />
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
    const { data, request } = useRequest<SingleResponse<string>>(
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
        <section className="w-full h-full flex items-center justify-center">
            <img
                onClick={(e) => e.stopPropagation()}
                src={url}
                className="contain aspect-auto w-[500px] max-w-1/2 max-h-1/2"
            />
        </section>
    );
}
