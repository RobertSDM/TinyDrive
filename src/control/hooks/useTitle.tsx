import { useCallback, useRef } from "react";

const useTitle = () => {
    const title = useRef<string>("");

    const updateTitle = useCallback((txt: string) => {
        title.current = txt;
        document.title = title.current;
    }, []);

    return updateTitle;
};

export default useTitle;
