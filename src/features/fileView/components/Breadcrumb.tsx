import { AuthContext, ParentContext } from "@/context/useContext.tsx";
import { useRequest } from "@/hooks/useRequest.tsx";
import { BreadcrumbConfig } from "../../api/requestConfig.ts";
import { useEffect, useState } from "react";
import { Item, ListItemResponse } from "@/types.ts";
import { Link } from "react-router-dom";

type BreadcrumbProps = {};
export default function Breadcrumb({}: BreadcrumbProps) {
    const { account, session } = AuthContext();
    const { parent } = ParentContext();
    const { request, data } = useRequest<ListItemResponse>(
        BreadcrumbConfig(account!.id, parent.id!, session!.accessToken)
    );
    const [breadcrumb, setBreadcrumb] = useState<Item[]>([]);

    useEffect(() => {
        if (!data) return;

        setBreadcrumb(data.data);
    }, [data]);

    useEffect(() => {
        if (!parent.id) {
            setBreadcrumb([]);
            return;
        }
        request();
    }, [parent]);

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
