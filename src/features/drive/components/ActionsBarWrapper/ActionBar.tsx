import useFetcher from "@/shared/hooks/useRequest.tsx";
import { Item } from "@/shared/types/index.ts";
import { ItemDeleteConfig } from "../../api/config.ts";
import { useUserContext } from "@/shared/context/useContext.tsx";

type ActionBarProps = {
    item?: Item | null;
};
export default function ActionBar({ item }: ActionBarProps) {
    const { user } = useUserContext();
    const { request: _delete } = useFetcher({
        ...ItemDeleteConfig,
        path: `${ItemDeleteConfig.path}/${user.id}/${item?.id}`,
    });

    return (
        <div
            className={`h-10  px-1 rounded-md my-2 flex items-center ${
                !item ? "bg-white" : "bg-slate-200"
            }`}
        >
            {item && (
                <button
                    className="hover:bg-red-500 px-2 py-1 rounded-md hover:text-white"
                    onClick={() => {
                        if (!confirm("Confirm to delete")) return;

                        _delete();
                    }}
                >
                    Delete
                </button>
            )}
        </div>
    );
}
