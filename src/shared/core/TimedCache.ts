class TimedCacheItem {
    public date: number;

    constructor(public val: string, public key: string) {
        this.date = Date.now();
    }
}

export default class TimedCache {
    private cache: {
        [key: string]: TimedCacheItem;
    };

    constructor(private cacheDuration: number) {
        this.cache = {};
    }

    public static from(obj: TimedCache): TimedCache {
        const timedCache = new TimedCache(obj.cacheDuration);
        timedCache.cache = obj.cache;

        return timedCache;
    }

    public serialize(): string {
        return JSON.stringify({
            ...this,
        });
    }

    public get(key: string): string | null {
        if (this.has(key)) {
            if (Date.now() - this.cache[key].date > this.cacheDuration) {
                delete this.cache[key];
                return null;
            }
            return this.cache[key].val;
        }
        return null;
    }

    public has(key: string): boolean {
        const haskey = this.cache[key] !== undefined;

        if (haskey && Date.now() - this.cache[key].date > this.cacheDuration) {
            delete this.cache[key];

            return false;
        }

        return haskey;
    }

    public add(key: string, value: string): void {
        if (this.cache[key] !== undefined) return;

        const item = new TimedCacheItem(value, key);
        this.cache[key] = item;
    }
}
