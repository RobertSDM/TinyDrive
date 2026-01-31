import { useRef } from "react";

type Cache<T> = {
    [id: string]: {
        data: T;
        updatedAt: number;
    };
};

export function useLeastUsed<T>(capacity: number) {
    const cache = useRef<Cache<T>>({});

    function shift() {
        const cacheCopy = { ...cache };

        let keyToDelete = "";
        let lower = Infinity;

        Object.keys(cacheCopy.current).forEach((key) => {
            let updatedAt = cache.current[key].updatedAt;
            if (updatedAt >= lower) return;

            lower = updatedAt;
            keyToDelete = key;
        });

        delete cache.current[keyToDelete];
    }

    function invalidateCache(id: string) {
        if (!get(id)) return;
        delete cache.current[id];
    }

    function add(id: string, item: T) {
        if (Object.keys(cache.current[id] ?? {}).length + 1 > capacity) shift();

        cache.current = {
            ...cache.current,
            [id]: { data: item, updatedAt: new Date().getTime() },
        };
    }

    function get(id: string): T | undefined {
        return cache.current[id]?.data ?? undefined;
    }

    return { add, get, invalidateCache };
}
