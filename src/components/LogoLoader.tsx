import { useEffect, useMemo, useRef, useState } from "react";

export default function LogoLoader() {
    const [loadingTime, setLoadingTime] = useState(0);
    const loadingStart = useRef(Date.now());
    const phrase = useMemo(() => {
        if (loadingTime >= 10 && loadingTime < 35) {
            return "Sorry for the wait! The server is starting";
        } else if (loadingTime >= 35 && loadingTime < 70) {
            return "I know, it's a bit slow";
        } else if (loadingTime >= 70 && loadingTime < 90) {
            return "The server is still starting";
        } else if (loadingTime >= 90 && loadingTime < 105) {
            return "Almost there";
        } else if (loadingTime >= 115) {
            return "When you least expect it";
        }
    }, [loadingTime]);

    useEffect(() => {
        let timer = setInterval(() => {
            setLoadingTime(
                Math.floor((Date.now() - loadingStart.current) / 1000)
            );
        }, 2 * 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex w-full h-screen justify-center items-center flex-col">
            <img src="icons/tiny-drive-logo.svg" className="animate-bounce" />
            <span className="text-slate-500 font-semibold">{phrase}</span>
        </div>
    );
}
