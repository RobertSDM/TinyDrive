import { useCallback } from "react";

const useTitle = () => {
    return useCallback((txt: string) => {
        document.title = txt;
    }, []);
};

export default useTitle;
