import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default (
    query: string,
    defaultValue: any,
    convertFunc?: (...args: any) => any
) => {
    const [searchParams] = useSearchParams("");

    const handleQueryValue = useCallback(() => {
        if (!searchParams.get(query)) return defaultValue;
        else if (convertFunc) return convertFunc(searchParams.get(query));
        else return searchParams.get(query);
    }, [searchParams]);
    const [qParams, setQParams] = useState(handleQueryValue);

    useEffect(() => {
        setQParams(handleQueryValue);
    }, [searchParams.get(query)]);

    return [qParams];
};
