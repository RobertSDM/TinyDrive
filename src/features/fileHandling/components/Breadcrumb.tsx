import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { breadcrumb } from "../requests/fileRequests.ts";
import { useAccountContext } from "@/context/useContext.tsx";
import { useEffect, useState } from "react";
import { useLeastUsed } from "../hooks/leastUsedCache.tsx";
import { BreadcrumbResponse } from "@/types.ts";

type BreadcrumbProps = {
    parentid: string;
};
export default function Breadcrumb({ parentid }: BreadcrumbProps) {
    const { account } = useAccountContext();
    const { add, get } = useLeastUsed<BreadcrumbResponse[]>(5);
    const [breadcrumbState, setBreadcrumbState] =
        useState<BreadcrumbResponse[]>();

    const { data, refetch, isFetching } = useQuery({
        queryKey: ["breadcrumb", parentid],
        queryFn: () => breadcrumb(account!.id, parentid),
        enabled: false,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (isFetching) return;

        setBreadcrumbState(data!);
        add(parentid, data!);
    }, [isFetching]);

    useEffect(() => {
        if (parentid === "") return;

        const cache = get(parentid);

        if (!cache) {
            refetch();
            return;
        }

        setBreadcrumbState(cache);
    }, [parentid]);

    return (
        <div className="font-semibold text-slate-400 flex gap-x-1 text-lg ">
            <Link to={"/drive"} className="hover:text-purple-500">
                /
            </Link>
            {parentid !== "" &&
                !isFetching &&
                breadcrumbState?.map((b, i) => (
                    <Link
                        key={b.id}
                        to={`/drive/${b.id}`}
                        className="space-x-1 hover:text-purple-500"
                    >
                        <span>{b.filename}</span>
                        <span>{i < breadcrumbState.length - 1 ? "/" : ""}</span>
                    </Link>
                ))}
        </div>
    );
}
