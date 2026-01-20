import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { breadcrumb } from "../requests/fileRequests.ts";
import { useSessionContext } from "@/context/useContext.tsx";
import { useEffect } from "react";

type BreadcrumbProps = {
    parentid: string;
};
export default function Breadcrumb({ parentid }: BreadcrumbProps) {
    const { session } = useSessionContext();

    const { data, refetch } = useQuery({
        queryKey: ["breadcrumb"],
        queryFn: () => breadcrumb(session!.userid, parentid),
        enabled: false,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (parentid === "") return;

        refetch();
    }, [parentid]);

    if (parentid === "")
        return (
            <Link
                to={"/drive"}
                className="hover:text-purple-500 font-semibold text-slate-400  text-lg"
            >
                /
            </Link>
        );

    return (
        <div className="font-semibold text-slate-400 flex gap-x-1 text-lg ">
            <Link to={"/drive"} className="hover:text-purple-500">
                /
            </Link>
            {data?.map((b, i) => (
                <Link
                    key={b.id}
                    to={`/drive/${b.id}`}
                    className="space-x-1 hover:text-purple-500"
                >
                    <span>{b.filename}</span>
                    <span>{i < breadcrumb.length - 1 ? "/" : ""}</span>
                </Link>
            ))}
        </div>
    );
}
