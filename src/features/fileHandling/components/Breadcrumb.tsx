import { useEffect, useState } from "react";
import { Item } from "@/types.ts";
import { Link } from "react-router-dom";
import { useBreadcrumb } from "../hooks/fileHandlingHooks.tsx";

type BreadcrumbProps = {};
export default function Breadcrumb({}: BreadcrumbProps) {
    const { data } = useBreadcrumb();
    const [breadcrumb, setBreadcrumb] = useState<Item[]>([]);

    useEffect(() => {
        if (!data) return;

        setBreadcrumb(data.data);
    }, [data]);

    return (
        <div className="my-10 font-semibold text-slate-400 flex gap-x-1 text-lg ">
            <Link to={"/drive"} className="hover:text-purple-500">
                /
            </Link>
            {breadcrumb.map((b, i) => (
                <Link
                    key={b.id}
                    to={`/drive/${b.id}`}
                    className="space-x-1 hover:text-purple-500"
                >
                    <span>{b.name}</span>
                    <span>{i < breadcrumb.length - 1 ? "/" : ""}</span>
                </Link>
            ))}
        </div>
    );
}
